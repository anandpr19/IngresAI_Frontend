import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Mic, 
  MicOff, 
  Copy, 
  Save, 
  Bot, 
  User, 
  Languages,
  X,
  Sparkles
} from "lucide-react";

interface DemoChatProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoChat = ({ isOpen, onClose }: DemoChatProps) => {
  const [isHindi, setIsHindi] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [message, setMessage] = useState("");

  const sampleMessages = [
    {
      type: "user" as const,
      content: isHindi ? "दिल्ली में भूजल स्तर कैसा है?" : "What's the groundwater level in Delhi?",
      timestamp: "2 min ago"
    },
    {
      type: "bot" as const,
      content: isHindi 
        ? "दिल्ली में भूजल स्तर चिंताजनक है। पिछले 10 वर्षों में औसतन 2.3 मीटर प्रति वर्ष की दर से गिरावट हो रही है। वर्तमान में यह 15-25 मीटर गहराई पर है।"
        : "Delhi's groundwater level is concerning. It's declining at an average rate of 2.3 meters per year over the past 10 years. Currently, it ranges between 15-25 meters depth in most areas.",
      timestamp: "2 min ago",
      data: {
        currentLevel: "18.5m",
        yearlyDecline: "-2.3m",
        status: "Critical"
      }
    }
  ];

  const handleToggleListening = () => {
    setIsListening(!isListening);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock response - in real app would send to backend
      setMessage("");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-navy-dark/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl h-[90vh] bg-card shadow-ocean border-border/20 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border/20 bg-muted/30">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-deep-sea to-teal-accent flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-inter text-card-foreground">
                INGRES AI Demo
              </h3>
              <p className="text-sm text-muted-foreground">
                Try groundwater intelligence in action
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsHindi(!isHindi)}
              className="flex items-center space-x-2"
            >
              <Languages className="w-4 h-4" />
              <span>{isHindi ? "हिंदी" : "English"}</span>
            </Button>
            
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Left Panel - Explainer */}
          <div className="w-1/3 p-6 border-r border-border/20 bg-muted/20">
            <h4 className="text-lg font-bold font-inter text-card-foreground mb-4">
              {isHindi ? "क्या करके देखें" : "Try These Queries"}
            </h4>
            
            <div className="space-y-3">
              {(isHindi ? [
                "राजस्थान में कितना पानी बचा है?",
                "गर्मियों में पंजाब का क्या हाल होगा?",
                "मेरे जिले में नलकूप कहाँ लगाना चाहिए?",
                "पिछले 5 साल में कहाँ सबसे ज्यादा गिरावट हुई?",
                "बारिश के बाद भूजल कितना बढ़ता है?"
              ] : [
                "How much water is left in Rajasthan?",
                "What will happen to Punjab in summer?",
                "Where should I drill a borewell in my district?",
                "Which areas had maximum decline in 5 years?",
                "How much does groundwater recharge after monsoon?"
              ]).map((query, index) => (
                <div
                  key={index}
                  className="p-3 bg-accent/20 rounded-lg border border-accent/30 cursor-pointer hover:bg-accent/30 transition-colors"
                  onClick={() => setMessage(query)}
                >
                  <p className="text-sm text-card-foreground">{query}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-teal-accent/10 rounded-lg border border-teal-accent/30">
              <h5 className="font-semibold text-teal-accent mb-2">
                {isHindi ? "खासियत" : "Features"}
              </h5>
              <ul className="text-sm text-card-foreground space-y-1">
                <li>• {isHindi ? "आवाज़ से पूछें" : "Voice input supported"}</li>
                <li>• {isHindi ? "तुरंत जवाब" : "Instant responses"}</li>
                <li>• {isHindi ? "डेटा डाउनलोड" : "Export data"}</li>
              </ul>
            </div>
          </div>

          {/* Right Panel - Chat */}
          <div className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {sampleMessages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`flex space-x-3 max-w-2xl ${
                      msg.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                    }`}
                  >
                    {/* Avatar */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        msg.type === 'user' 
                          ? 'bg-deep-sea' 
                          : 'bg-gradient-to-br from-teal-accent to-deep-sea'
                      }`}
                    >
                      {msg.type === 'user' ? (
                        <User className="w-4 h-4 text-white" />
                      ) : (
                        <Bot className="w-4 h-4 text-white" />
                      )}
                    </div>

                    {/* Message */}
                    <div
                      className={`rounded-2xl p-4 ${
                        msg.type === 'user'
                          ? 'bg-deep-sea text-white'
                          : 'bg-muted border border-border/20'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.content}</p>
                      
                      {msg.type === 'bot' && msg.data && (
                        <div className="mt-4 grid grid-cols-3 gap-3">
                          <div className="bg-background/50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-deep-sea">{msg.data.currentLevel}</div>
                            <div className="text-xs text-muted-foreground">Current Level</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-destructive">{msg.data.yearlyDecline}</div>
                            <div className="text-xs text-muted-foreground">Annual Change</div>
                          </div>
                          <div className="bg-background/50 rounded-lg p-3 text-center">
                            <div className="text-lg font-bold text-teal-accent">{msg.data.status}</div>
                            <div className="text-xs text-muted-foreground">Status</div>
                          </div>
                        </div>
                      )}
                      
                      {msg.type === 'bot' && (
                        <div className="flex items-center space-x-2 mt-3">
                          <Button variant="ghost" size="sm">
                            <Copy className="w-3 h-3 mr-1" />
                            Copy
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Save className="w-3 h-3 mr-1" />
                            Save
                          </Button>
                        </div>
                      )}
                      
                      <p className="text-xs text-muted-foreground mt-2">{msg.timestamp}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-6 border-t border-border/20 bg-muted/20">
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleListening}
                  className={`${isListening ? 'bg-destructive text-destructive-foreground' : ''}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isHindi ? "अपना सवाल यहाँ लिखें..." : "Ask about groundwater..."}
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                />
                
                <Button onClick={handleSendMessage} className="bg-deep-sea hover:bg-deep-sea/90">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <p className="text-xs text-muted-foreground">
                  {isHindi ? "यह केवल डेमो है। वास्तविक डेटा के लिए डैशबोर्ड देखें।" : "This is a demo. Visit dashboard for real-time data."}
                </p>
                
                <Button variant="outline" size="sm">
                  <Save className="w-3 h-3 mr-2" />
                  Save Demo to Space
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};