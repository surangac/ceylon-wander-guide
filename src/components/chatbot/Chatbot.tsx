import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const suggestedQuestions = [
  "What's the best time to visit Sri Lanka?",
  "How much is a visa?",
  "What should I wear at temples?",
  "Tell me about Ceylon Tea",
];

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Ayubowan! 🙏 I'm the Serendipity Guide, your virtual companion for exploring Sri Lanka. Ask me anything about travel, culture, food, or local tips!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (message?: string) => {
    const text = message || input.trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI response (replace with actual API call)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "what's the best time to visit sri lanka?": "The best time to visit Sri Lanka depends on which coast you're exploring! 🌴\n\n**West & South Coast (including Galle, Mirissa):** December to April\n**East Coast (Trincomalee, Arugam Bay):** May to September\n**Hill Country (Ella, Kandy):** January to April\n**Cultural Triangle (Sigiriya, Anuradhapura):** Year-round, but February to April is ideal\n\nThe shoulder seasons offer fewer crowds and great deals!",
        "how much is a visa?": "Sri Lanka offers an Electronic Travel Authorization (ETA) for most nationalities! 💳\n\n**Tourist Visa (30 days):** ~$50 USD\n**Transit Visa:** ~$25 USD\n**Business Visa:** ~$65 USD\n\nYou can apply online at www.eta.gov.lk. Processing usually takes 24-48 hours. The visa can be extended for up to 90 days at the Department of Immigration in Colombo.",
        "what should i wear at temples?": "Temple etiquette in Sri Lanka is very important! 🙏\n\n**Dress Code:**\n• Cover shoulders and knees (both men and women)\n• Remove shoes and hats before entering\n• Wear white for extra respect (especially at important temples like Temple of the Tooth)\n\n**Tips:**\n• Never pose with your back to Buddha statues\n• Don't point feet toward Buddha images\n• Some temples provide sarongs to borrow if needed",
        "tell me about ceylon tea": "Ceylon Tea is Sri Lanka's liquid gold! ☕\n\n**History:** Introduced by the British in 1867 after a coffee blight destroyed plantations.\n\n**Regions & Flavors:**\n• **Nuwara Eliya:** Light, delicate, floral\n• **Dimbula:** Medium-bodied, crisp\n• **Uva:** Bold, unique wind-affected flavor\n• **Kandy:** Full-bodied, strong\n\n**Fun Fact:** Sri Lanka is the 4th largest tea producer globally, exporting to over 145 countries!\n\n**Must-Do:** Visit a tea factory in the Hill Country for tastings and tours.",
      };

      const lowerText = text.toLowerCase();
      let response = responses[lowerText] || 
        "That's a wonderful question about Sri Lanka! 🌴 While I don't have the specific answer right now, I'd recommend checking local tourism resources or feel free to ask me about destinations, visa requirements, temple etiquette, or Ceylon tea!";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full",
          "bg-ceylon-gold shadow-glow-gold",
          "flex items-center justify-center",
          "hover:scale-110 transition-transform duration-300",
          isOpen && "hidden"
        )}
      >
        <MessageCircle className="w-6 h-6 text-secondary-foreground" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[calc(100%-3rem)] max-w-md h-[600px] max-h-[80vh] bg-card rounded-2xl shadow-large border border-border overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-ocean p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-ceylon-gold/20 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-ceylon-gold" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-primary-foreground">
                    Serendipity Guide
                  </h3>
                  <p className="text-xs text-primary-foreground/70">Your Sri Lanka Expert</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
              >
                <X className="w-5 h-5 text-primary-foreground" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "flex gap-3",
                    message.role === "user" && "flex-row-reverse"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                    message.role === "assistant" ? "bg-ceylon-ocean/10" : "bg-ceylon-gold/10"
                  )}>
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-ceylon-ocean" />
                    ) : (
                      <User className="w-4 h-4 text-ceylon-gold" />
                    )}
                  </div>
                  <div className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    message.role === "assistant"
                      ? "bg-muted text-foreground rounded-tl-none"
                      : "bg-ceylon-ocean text-primary-foreground rounded-tr-none"
                  )}>
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-ceylon-ocean/10 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-ceylon-ocean" />
                  </div>
                  <div className="bg-muted rounded-2xl rounded-tl-none px-4 py-3">
                    <Loader2 className="w-5 h-5 animate-spin text-ceylon-ocean" />
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-ceylon-gold/10 hover:text-ceylon-gold transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Sri Lanka..."
                  disabled={isLoading}
                  className="flex-1 px-4 py-2 rounded-xl bg-muted border-0 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ceylon-ocean"
                />
                <Button
                  type="submit"
                  variant="gold"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
