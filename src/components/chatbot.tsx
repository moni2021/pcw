
"use client";

import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Bot, User, Send, Loader2, XCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { serviceAdvisor, type ChatMessage } from '@/ai/flows/service-advisor-flow';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';


export function Chatbot() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

    // Automatically scroll to the bottom when new messages are added
    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);
    
    // Set initial greeting message
    useEffect(() => {
        setMessages([
            { role: 'model', content: "Hello! I'm your Maruti Suzuki service advisor. How can I help you today? You can ask me about service costs, parts, or maintenance schedules." }
        ]);
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const result = await serviceAdvisor({
                history: messages,
                message: input,
            });
            
            const modelMessage: ChatMessage = { role: 'model', content: result.response };
            setMessages(prev => [...prev, modelMessage]);

        } catch (error) {
            console.error("Error calling service advisor flow:", error);
            const errorMessage: ChatMessage = { role: 'model', content: "Sorry, I'm having trouble connecting to my knowledge base right now. Please try again in a moment."};
            setMessages(prev => [...prev, errorMessage]);
            toast({
                variant: 'destructive',
                title: 'Oh no! Something went wrong.',
                description: 'There was a problem with your request.',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClearChat = () => {
        setMessages([
             { role: 'model', content: "Hello! I'm your Maruti Suzuki service advisor. How can I help you today? You can ask me about service costs, parts, or maintenance schedules." }
        ]);
        setInput('');
        setIsLoading(false);
    }

    return (
        <Card className="w-full h-full flex flex-col shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Avatar>
                        <AvatarImage src="https://placehold.co/100x100.png" alt="Chatbot" data-ai-hint="robot" />
                        <AvatarFallback>AI</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-lg font-semibold">Service Advisor</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                    </div>
                </div>
                 <Button variant="ghost" size="icon" onClick={handleClearChat}>
                    <XCircle className="h-5 w-5" />
                    <span className="sr-only">Clear Chat</span>
                </Button>
            </CardHeader>
            <CardContent className="flex-1 overflow-hidden p-0">
                <ScrollArea className="h-full" ref={scrollAreaRef}>
                    <div className="p-6 space-y-6">
                        <AnimatePresence>
                            {messages.map((message, index) => (
                                <motion.div
                                    key={index}
                                    className={cn(
                                        "flex gap-3 text-sm",
                                        message.role === 'user' ? 'justify-end' : 'justify-start'
                                    )}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {message.role === 'model' && (
                                        <Avatar className="w-8 h-8 border">
                                            <AvatarFallback><Bot size={18} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl whitespace-pre-wrap",
                                            message.role === 'user'
                                                ? 'bg-primary text-primary-foreground rounded-br-none'
                                                : 'bg-muted rounded-bl-none'
                                        )}
                                    >
                                        {message.content}
                                    </div>
                                    {message.role === 'user' && (
                                        <Avatar className="w-8 h-8 border">
                                            <AvatarFallback><User size={18} /></AvatarFallback>
                                        </Avatar>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                        {isLoading && (
                            <motion.div 
                                className="flex justify-start gap-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.3 }}
                            >
                                <Avatar className="w-8 h-8 border">
                                    <AvatarFallback><Bot size={18} /></AvatarFallback>
                                </Avatar>
                                <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2.5 rounded-2xl bg-muted flex items-center">
                                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
            <CardFooter className="p-4 border-t">
                <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
                    <Input
                        id="message"
                        placeholder="Type your message..."
                        className="flex-1"
                        autoComplete="off"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                        <Send className="h-4 w-4" />
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </CardFooter>
        </Card>
    );
}
