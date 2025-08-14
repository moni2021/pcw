
import { Chatbot } from '@/components/chatbot';
import { Header } from '@/components/header';

export default function ChatPage() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <Header />
      <main className="flex-1 overflow-hidden p-4 md:p-6">
        <Chatbot />
      </main>
    </div>
  );
}
