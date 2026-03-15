import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Loader2, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

type Language = "en" | "si" | "ta";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

const i18n: Record<Language, {
  greeting: string;
  suggestions: string[];
  placeholder: string;
}> = {
  en: {
    greeting: "Ayubowan! 🙏 I'm the Heritage Guide, your virtual companion for exploring Sri Lanka. Ask me anything about travel, culture, food, or local tips!",
    suggestions: [
      "What's the best time to visit Sri Lanka?",
      "How much is a visa?",
      "What should I wear at temples?",
      "Tell me about Ceylon Tea",
    ],
    placeholder: "Ask about Sri Lanka...",
  },
  si: {
    greeting: "ආයුබෝවන්! 🙏 මම Heritage Guide, ශ්‍රී ලංකාව ගවේෂණය කිරීමට ඔබේ අථත්‍ය සහකරු. සංචාරය, සංස්කෘතිය, ආහාර හෝ දේශීය ඉඟි ගැන ඕනෑම දෙයක් අසන්න!",
    suggestions: [
      "ශ්‍රී ලංකාවට යාමට හොඳම කාලය කවදාද?",
      "වීසා ගාස්තුව කීයද?",
      "පන්සලට ඇඳගෙන යාමට හොඳ ඇඳුම් මොනවාද?",
      "සිලෝන් තේ ගැන කියන්න",
    ],
    placeholder: "ශ්‍රී ලංකාව ගැන අසන්න...",
  },
  ta: {
    greeting: "ஆயுபோவன்! 🙏 நான் Heritage Guide, இலங்கையை ஆராய உங்கள் மெய்நிகர் தோழன். பயண, கலாச்சார, உணவு அல்லது உள்ளூர் குறிப்புகள் பற்றி எதையும் கேளுங்கள்!",
    suggestions: [
      "இலங்கை பயணிக்க சிறந்த நேரம் எது?",
      "விசா கட்டணம் எவ்வளவு?",
      "கோயில்களுக்கு என்ன உடை அணிய வேண்டும்?",
      "சிலோன் தேயிலை பற்றி சொல்லுங்கள்",
    ],
    placeholder: "இலங்கை பற்றி கேளுங்கள்...",
  },
};

const langLabels: { key: Language; flag: string; label: string }[] = [
  { key: "en", flag: "🇬🇧", label: "English" },
  { key: "si", flag: "🇱🇰", label: "සිංහල" },
  { key: "ta", flag: "🇱🇰", label: "தமிழ்" },
];

async function streamChat({
  messages,
  language,
  onDelta,
  onDone,
  onError,
}: {
  messages: { role: string; content: string }[];
  language: Language;
  onDelta: (text: string) => void;
  onDone: () => void;
  onError: (err: string) => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages, language }),
  });

  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    onError(data.error || `Error ${resp.status}`);
    return;
  }

  if (!resp.body) {
    onError("No response stream");
    return;
  }

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = buffer.indexOf("\n")) !== -1) {
      let line = buffer.slice(0, newlineIndex);
      buffer = buffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;

      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") break;

      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content;
        if (content) onDelta(content);
      } catch {
        buffer = line + "\n" + buffer;
        break;
      }
    }
  }
  onDone();
}

export const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [language, setLanguage] = useState<Language>("en");
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: i18n.en.greeting },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const assistantContentRef = useRef("");

  const handleLanguageChange = (lang: Language) => {
    if (lang === language) return;
    setLanguage(lang);
    // Reset conversation with new greeting
    setMessages([{ id: "welcome", role: "assistant", content: i18n[lang].greeting }]);
    setInput("");
  };

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

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);
    assistantContentRef.current = "";

    const chatHistory = updatedMessages
      .filter((m) => m.id !== "welcome")
      .map((m) => ({ role: m.role, content: m.content }));

    try {
      await streamChat({
        messages: chatHistory,
        language,
        onDelta: (chunk) => {
          assistantContentRef.current += chunk;
          const content = assistantContentRef.current;
          setMessages((prev) => {
            const last = prev[prev.length - 1];
            if (last?.role === "assistant" && last.id !== "welcome") {
              return prev.map((m, i) =>
                i === prev.length - 1 ? { ...m, content } : m
              );
            }
            return [
              ...prev,
              { id: (Date.now() + 1).toString(), role: "assistant", content },
            ];
          });
        },
        onDone: () => setIsLoading(false),
        onError: (err) => {
          toast.error(err);
          setIsLoading(false);
        },
      });
    } catch (e) {
      console.error(e);
      toast.error("Failed to connect to the guide. Please try again.");
      setIsLoading(false);
    }
  };

  const currentI18n = i18n[language];

  return (
    <>
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
            <div className="bg-gradient-ocean p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-ceylon-gold/20 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-ceylon-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-primary-foreground">
                      Heritage Guide
                    </h3>
                    <p className="text-xs text-primary-foreground/70">
                      AI-Powered Sri Lanka Expert
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
                >
                  <X className="w-5 h-5 text-primary-foreground" />
                </button>
              </div>

              {/* Language Selector */}
              <div className="flex gap-1.5 mt-3">
                {langLabels.map((l) => (
                  <button
                    key={l.key}
                    onClick={() => handleLanguageChange(l.key)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium transition-all duration-200",
                      language === l.key
                        ? "bg-ceylon-gold text-secondary-foreground shadow-sm"
                        : "bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20"
                    )}
                  >
                    {l.flag} {l.label}
                  </button>
                ))}
              </div>
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
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                      message.role === "assistant"
                        ? "bg-ceylon-ocean/10"
                        : "bg-ceylon-gold/10"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <Bot className="w-4 h-4 text-ceylon-ocean" />
                    ) : (
                      <User className="w-4 h-4 text-ceylon-gold" />
                    )}
                  </div>
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                      message.role === "assistant"
                        ? "bg-muted text-foreground rounded-tl-none"
                        : "bg-ceylon-ocean text-primary-foreground rounded-tr-none"
                    )}
                  >
                    {message.role === "assistant" ? (
                      <div className="prose prose-sm max-w-none dark:prose-invert prose-p:my-1 prose-ul:my-1 prose-li:my-0.5 prose-headings:my-2">
                        <ReactMarkdown>{message.content}</ReactMarkdown>
                      </div>
                    ) : (
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={language}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="px-4 pb-2"
                >
                  <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {currentI18n.suggestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="text-xs px-3 py-1.5 rounded-full bg-muted text-muted-foreground hover:bg-ceylon-gold/10 hover:text-ceylon-gold transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
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
                  placeholder={currentI18n.placeholder}
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
