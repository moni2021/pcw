
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, MessageSquare, Send, X, User, Loader2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScrollArea } from './ui/scroll-area';
import { chatWithAdvisor } from '@/ai/flows/service-advisor-flow';
import { useToast } from '@/hooks/use-toast';

interface Message {
    role: 'user' | 'model';
    content: string;
}

export function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    useEffect(() => {
        if (isOpen && scrollAreaRef.current) {
            setTimeout(() => {
                scrollAreaRef.current?.scrollTo({ top: scrollAreaRef.current.scrollHeight, behavior: 'smooth' });
            }, 100);
        }
    }, [messages, isOpen]);
    
    useEffect(() => {
        if (isOpen) {
            setMessages([{ role: 'model', content: "Hello! I'm your Maruti service advisor. How can I help you today?" }]);
        } else {
            setMessages([]);
            setInput('');
        }
    }, [isOpen]);

    const handleSend = async () => {
        if (input.trim() === '') return;
        
        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(msg => ({ role: msg.role, content: msg.content }));
            const result = await chatWithAdvisor({ history, message: input });
            
            const modelMessage: Message = { role: 'model', content: result.response };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("Chatbot error:", error);
            const errorMessage: Message = { role: 'model', content: "I'm sorry, but I'm having trouble connecting right now. Please try again later." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-24 right-4 sm:right-6 md:right-8 z-50"
                    >
                        <Card className="w-[calc(100vw-2rem)] sm:w-96 shadow-2xl">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <CardTitle className="flex items-center gap-2 text-lg">
                                    <Bot /> Service Advisor
                                </CardTitle>
                                <div>
                                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent className="p-0">
                                <ScrollArea className="h-96 w-full p-4" ref={scrollAreaRef}>
                                    <div className="space-y-4">
                                        {messages.map((message, index) => (
                                            <div key={index} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
                                                {message.role === 'model' && <Bot className="h-6 w-6 shrink-0 text-primary" />}
                                                <div className={`rounded-lg px-3 py-2 text-sm ${message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                                                    <p>{message.content}</p>
                                                </div>
                                                {message.role === 'user' && <User className="h-6 w-6 shrink-0" />}
                                            </div>
                                        ))}
                                         {isLoading && (
                                            <div className="flex items-start gap-3">
                                                <Bot className="h-6 w-6 shrink-0 text-primary" />
                                                <div className="rounded-lg px-3 py-2 text-sm bg-muted">
                                                    <Loader2 className="h-5 w-5 animate-spin" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <CardFooter className="p-4 border-t">
                                <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex w-full items-center space-x-2">
                                    <Input
                                        id="message"
                                        placeholder="Type your message..."
                                        className="flex-1"
                                        autoComplete="off"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        disabled={isLoading}
                                    />
                                    <Button type="submit" size="icon" disabled={isLoading || input.trim() === ''}>
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </form>
                            </CardFooter>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                className="fixed bottom-4 right-4 sm:right-6 md:right-8 z-50 h-16 w-16 rounded-full shadow-lg"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? <X className="h-8 w-8" /> : <MessageSquare className="h-8 w-8" />}
                <span className="sr-only">Toggle Chat</span>
            </Button>
        </>
    );
}
