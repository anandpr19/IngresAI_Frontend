import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  Mic,
  MicOff,
  Send,
  Search,
  Save,
  Copy,
  BarChart3,
  Clock,
  Globe,
  Plus,
  Filter
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  metadata?: {
    source?: string;
    year?: number;
    region?: string;
  };
  visuals?: Array<{
    type: 'chart' | 'table' | 'map';
    data: any;
  }>;
}

interface Chat {
  id: string;
  title: string;
  lastModified: Date;
  messageCount: number;
}

const mockChats: Chat[] = [
  {
    id: '1',
    title: 'Rajasthan Groundwater 2023',
    lastModified: new Date('2025-09-15'),
    messageCount: 12
  },
  {
    id: '2',
    title: 'Maharashtra Drought Analysis',
    lastModified: new Date('2025-09-10'),
    messageCount: 8
  },
  {
    id: '3',
    title: 'Karnataka Water Table Trends',
    lastModified: new Date('2025-09-05'),
    messageCount: 15
  }
];

const mockMessages: Message[] = [
  {
    id: '1',
    type: 'user',
    content: 'What is the current groundwater status in Rajasthan for 2023?',
    timestamp: new Date('2025-09-15T10:00:00')
  },
  {
    id: '2',
    type: 'bot',
    content: 'Based on the 2023 groundwater assessment data, Rajasthan shows mixed conditions across districts. Overall, 58% of assessment units fall in the "Safe" category, 23% are in "Semi-critical" stage, 12% are "Critical", and 7% are "Over-exploited". The western districts show better groundwater availability compared to eastern regions.',
    timestamp: new Date('2025-09-15T10:00:30'),
    metadata: {
      source: 'CGWB Annual Report 2023',
      year: 2023,
      region: 'Rajasthan'
    },
    visuals: [
      {
        type: 'chart',
        data: {
          categories: ['Safe', 'Semi-critical', 'Critical', 'Over-exploited'],
          values: [58, 23, 12, 7]
        }
      }
    ]
  }
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedChat, setSelectedChat] = useState<string>('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const location = useLocation();

  // Handle quick query from dashboard
  useEffect(() => {
    if (location.state?.quickQuery) {
      setCurrentMessage(location.state.quickQuery);
      // Clear the state to prevent reloading on refresh
      window.history.replaceState(null, '');
    }
  }, [location.state]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!currentMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: currentMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'I understand you\'re asking about groundwater data. This is a mock response demonstrating the chat interface. In the production version, this would connect to the INGRES AI backend to provide real insights about groundwater conditions, trends, and forecasts.',
        timestamp: new Date(),
        metadata: {
          source: 'INGRES AI Analysis',
          year: 2025
        }
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleToggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Voice input activated",
        description: "Speak your question now..."
      });
    } else {
      toast({
        title: "Voice input stopped",
        description: "Processing your speech..."
      });
    }
  };

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied to clipboard",
      description: "Message copied successfully."
    });
  };

  const handleSaveToSpace = (messageId: string) => {
    toast({
      title: "Saved to Space",
      description: "Message saved to your workspace."
    });
  };

  const filteredChats = mockChats.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-full">
      {/* Chat History Sidebar */}
      <div className="w-80 border-r border-border bg-card flex flex-col">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Chat History</h2>
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex-1 overflow-auto p-2 space-y-2">
          {filteredChats.map((chat) => (
            <motion.div
              key={chat.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card 
                className={`cursor-pointer transition-colors ${
                  selectedChat === chat.id ? 'bg-accent' : 'hover:bg-accent/50'
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-medium text-sm leading-tight">{chat.title}</h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{chat.messageCount} messages</span>
                      <span>{chat.lastModified.toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-semibold">
                {mockChats.find(c => c.id === selectedChat)?.title || 'New Chat'}
              </h1>
              <p className="text-sm text-muted-foreground">
                Ask questions about groundwater data in natural language
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Globe className="h-4 w-4 mr-2" />
                {currentLanguage === 'en' ? 'English' : 'हिंदी'}
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${message.type === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                  <Card className={`${
                    message.type === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card'
                  }`}>
                    <CardContent className="p-4">
                      <p className="text-sm leading-relaxed">{message.content}</p>
                      
                      {message.metadata && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex flex-wrap gap-2">
                            {message.metadata.source && (
                              <Badge variant="secondary" className="text-xs">
                                {message.metadata.source}
                              </Badge>
                            )}
                            {message.metadata.year && (
                              <Badge variant="outline" className="text-xs">
                                {message.metadata.year}
                              </Badge>
                            )}
                            {message.metadata.region && (
                              <Badge variant="outline" className="text-xs">
                                {message.metadata.region}
                              </Badge>
                            )}
                          </div>
                        </div>
                      )}

                      {message.visuals && message.visuals.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                            <BarChart3 className="h-3 w-3" />
                            <span>Visual data available</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                  
                  <div className="flex items-center justify-between mt-2 px-2">
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{message.timestamp.toLocaleTimeString()}</span>
                    </div>
                    
                    {message.type === 'bot' && (
                      <div className="flex items-center space-x-1">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => handleCopyMessage(message.content)}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6"
                          onClick={() => handleSaveToSpace(message.id)}
                        >
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <Card className="bg-card">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-sm text-muted-foreground">INGRES AI is thinking...</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card">
          <div className="flex items-center space-x-3">
            <Button
              size="icon"
              variant={isListening ? "default" : "outline"}
              onClick={handleToggleListening}
              className={isListening ? "animate-pulse" : ""}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
            
            <div className="flex-1">
              <Input
                placeholder="Ask about groundwater data..."
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={isLoading}
              />
            </div>
            
            <Button 
              onClick={handleSendMessage}
              disabled={!currentMessage.trim() || isLoading}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}