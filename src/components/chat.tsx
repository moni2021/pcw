
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, Send, X, User } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp, Timestamp } from 'firebase/firestore';
import { AnimatePresence, motion } from 'framer-motion';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Timestamp;
}

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [nickname, setNickname] = useState('');
  const [isSettingNickname, setIsSettingNickname] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('chatNickname');
    if (storedNickname) {
      setNickname(storedNickname);
      setIsSettingNickname(false);
    }
  }, []);

  useEffect(() => {
    if (!isOpen || isSettingNickname || !db) return;

    const q = query(collection(db, 'messages'), orderBy('timestamp', 'asc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message);
      });
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [isOpen, isSettingNickname]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSetNickname = () => {
    if (nickname.trim()) {
        localStorage.setItem('chatNickname', nickname.trim());
        setIsSettingNickname(false);
    }
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !db) return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      sender: nickname,
      timestamp: serverTimestamp(),
    });

    setNewMessage('');
  };
  
  const getInitials = (name: string) => {
    if (!name) return '??';
    const names = name.split(' ');
    if (names.length > 1) {
        return (names[0][0] || '') + (names[names.length - 1][0] || '');
    }
    return name.substring(0, 2);
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed bottom-24 left-5 z-50"
          >
            <Card className="w-80 h-[28rem] flex flex-col shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Community Chat</CardTitle>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                 {isSettingNickname ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                        <User className="h-12 w-12 text-muted-foreground" />
                        <p className="text-center text-sm text-muted-foreground">Please set a nickname to join the chat.</p>
                        <Input 
                            placeholder="Enter your nickname"
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSetNickname()}
                        />
                        <Button onClick={handleSetNickname}>Join Chat</Button>
                    </div>
                 ) : (
                    messages.map((msg) => (
                    <div key={msg.id} className="flex items-start gap-3">
                        <Avatar>
                           <AvatarFallback>{getInitials(msg.sender)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                            <p className="font-semibold text-sm">{msg.sender}</p>
                            <div className="bg-muted p-2 rounded-lg text-sm">
                                {msg.text}
                            </div>
                        </div>
                    </div>
                    ))
                 )}
                <div ref={messagesEndRef} />
              </CardContent>
              <CardFooter>
                 <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={isSettingNickname}
                  />
                  <Button type="submit" size="icon" disabled={isSettingNickname}>
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-5 left-5 z-50 rounded-full h-14 w-14 shadow-lg"
        size="icon"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </>
  );
}
