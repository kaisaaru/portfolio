"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { persona } from "@/data/persona";
import { speakText } from "@/lib/vrmController";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: persona.speechStyle.greetings[Math.floor(Math.random() * persona.speechStyle.greetings.length)] }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);
  const silenceTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "ja-JP"; // Set STT to Japanese

      recognitionRef.current.onresult = (event: any) => {
        let currentTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          currentTranscript += event.results[i][0].transcript;
        }

        setInput(currentTranscript);

        // Reset silence timer
        if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
        silenceTimerRef.current = setTimeout(() => {
           // Send message after 2s of silence
           if (currentTranscript.trim()) {
             stopListening();
             const msg = currentTranscript; // Capture the current transcript to send
             setInput(""); 
             sendMessage(msg);
           }
        }, 2000);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        stopListening();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
    
    return () => {
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      setInput("");
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        // Handle case where recognition is already started
      }
    } else {
      alert("Browser Anda tidak mendukung Voice Recognition.");
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const detectEmotion = (text: string) => {
    const lower = text.toLowerCase();
    // Japanese + Indonesian keywords
    if (lower.includes("maaf") || lower.includes("sedih") || lower.includes("gomen") || lower.includes("kanashi") || lower.includes("sumimasen")) return "sad";
    if (lower.includes("marah") || lower.includes("jangan") || lower.includes("baka") || lower.includes("dame") || lower.includes("yamete") || lower.includes("okotte")) return "angry";
    if (lower.includes("haha") || lower.includes("wkwk") || lower.includes("!") || lower.includes("senang") || lower.includes("keren") || lower.includes("sugoi") || lower.includes("yatta") || lower.includes("ureshii") || lower.includes("ehe") || lower.includes("fufu")) return "happy";
    return "relaxed";
  };

  const sendMessage = async (textToSend?: string) => {
    const text = typeof textToSend === 'string' ? textToSend : input;
    if (!text.trim() || loading) return;

    if (silenceTimerRef.current) clearTimeout(silenceTimerRef.current);
    if (isListening) stopListening();

    const userMessage = text.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMessage }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal mendapatkan respons");
      }
      let rawReply = data.reply;
      let emotion = "neutral";
      
      // Extract emotion tag like [HAPPY] if present
      const match = rawReply.match(/^\[(HAPPY|SAD|ANGRY|NEUTRAL)\]/i);
      if (match) {
        emotion = match[1].toLowerCase();
        // Remove the tag from the text displayed to the user
        rawReply = rawReply.replace(/^\[.*?\]\s*/i, "").trim();
      } else {
        // Fallback just in case AI doesn't send tag
        emotion = detectEmotion(rawReply);
      }

      setMessages((prev) => [...prev, { role: "ai", text: rawReply }]);
      
      // Handle VRM Speech and Emotion
      speakText(rawReply, emotion);
      
    } catch (error: any) {
      const errorMsg = "Maaf, terjadi kesalahan. Coba lagi nanti ya! 🙏";
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: errorMsg },
      ]);
      speakText(errorMsg, "sad");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      <style jsx>{`
        .ai-fab {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          font-size: 24px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          animation: fabPulse 2s infinite;
        }

        .ai-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 28px rgba(99, 102, 241, 0.6);
        }

        .ai-fab.open {
          animation: none;
          transform: rotate(0deg);
        }

        @keyframes fabPulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(99, 102, 241, 0.4); }
          50% { box-shadow: 0 4px 30px rgba(99, 102, 241, 0.7); }
        }

        .chat-container {
          position: fixed;
          bottom: 92px;
          right: 24px;
          width: 370px;
          max-height: 500px;
          border-radius: 20px;
          overflow: hidden;
          z-index: 1000;
          display: flex;
          flex-direction: column;
          background: var(--surface);
          border: 1px solid var(--border-color);
          box-shadow: 0 12px 40px rgba(0, 0, 0, 0.25);
          animation: chatSlideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes chatSlideIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .chat-header {
          padding: 16px 20px;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .chat-header-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }

        .chat-header-info h3 {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
        }

        .chat-header-info p {
          margin: 0;
          font-size: 12px;
          opacity: 0.85;
        }

        .chat-close {
          margin-left: auto;
          background: rgba(255, 255, 255, 0.15);
          border: none;
          color: white;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          transition: background 0.2s;
        }

        .chat-close:hover {
          background: rgba(255, 255, 255, 0.3);
        }

        .chat-messages {
          flex: 1;
          padding: 16px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 12px;
          min-height: 250px;
          max-height: 340px;
          background: var(--background);
        }

        .chat-messages::-webkit-scrollbar {
          width: 4px;
        }

        .chat-messages::-webkit-scrollbar-thumb {
          background: var(--border-color);
          border-radius: 2px;
        }

        .msg-row {
          display: flex;
          gap: 8px;
          align-items: flex-end;
        }

        .msg-row.user {
          flex-direction: row-reverse;
        }

        .msg-bubble {
          max-width: 80%;
          padding: 10px 14px;
          border-radius: 16px;
          font-size: 14px;
          line-height: 1.5;
          word-wrap: break-word;
        }

        .msg-bubble.ai {
          background: var(--surface);
          color: var(--foreground);
          border-bottom-left-radius: 4px;
          border: 1px solid var(--border-color);
        }

        .msg-bubble.user {
          background: linear-gradient(135deg, var(--primary), var(--primary-dark));
          color: white;
          border-bottom-right-radius: 4px;
        }

        .typing-indicator {
          display: flex;
          gap: 4px;
          padding: 10px 14px;
          background: var(--surface);
          border-radius: 16px;
          border-bottom-left-radius: 4px;
          border: 1px solid var(--border-color);
          width: fit-content;
        }

        .typing-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--muted);
          animation: typingBounce 1.4s infinite ease-in-out;
        }

        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }

        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .chat-input-area {
          padding: 12px 16px;
          border-top: 1px solid var(--border-color);
          display: flex;
          gap: 8px;
          align-items: center;
          background: var(--surface);
        }

        .chat-input {
          flex: 1;
          padding: 10px 14px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--background);
          color: var(--foreground);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s;
          font-family: inherit;
        }

        .chat-input:focus {
          border-color: var(--primary);
        }

        .chat-input::placeholder {
          color: var(--muted);
        }

        .chat-send {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: none;
          background: linear-gradient(135deg, var(--primary), var(--secondary));
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-send:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 2px 12px rgba(99, 102, 241, 0.4);
        }

        .chat-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .chat-mic {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          background: var(--surface);
          color: var(--foreground);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
          flex-shrink: 0;
        }

        .chat-mic.listening {
          background: #ef4444; /* Red color for recording */
          color: white;
          border-color: #ef4444;
          animation: pulseMic 1.5s infinite;
        }

        @keyframes pulseMic {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        @media (max-width: 480px) {
          .chat-container {
            width: calc(100vw - 32px);
            right: 16px;
            bottom: 88px;
            max-height: 70vh;
          }
        }
      `}</style>

      {/* Floating Action Button */}
      <button
        className={`ai-fab ${open ? "open" : ""}`}
        onClick={() => setOpen(!open)}
        aria-label="Toggle AI Chat"
        id="ai-chat-toggle"
      >
        {open ? "✕" : "✨"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-container" id="ai-chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">✨</div>
            <div className="chat-header-info">
              <h3>{persona.name}</h3>
              <p>{persona.tagline}</p>
            </div>
            <button className="chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`msg-row ${m.role}`}>
                <div className={`msg-bubble ${m.role}`}>{m.text}</div>
              </div>
            ))}
            {loading && (
              <div className="msg-row ai">
                <div className="typing-indicator">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chat-input-area">
            <input
              ref={inputRef}
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ketik pesan..."
              disabled={loading}
              id="ai-chat-input"
            />
            <button
              className={`chat-mic ${isListening ? "listening" : ""}`}
              onClick={toggleListening}
              disabled={loading}
              aria-label="Toggle voice input"
              title={isListening ? "Stop listening" : "Mulai bicara"}
            >
              {isListening ? (
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                   <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                 </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                  <line x1="12" y1="19" x2="12" y2="23" />
                  <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
              )}
            </button>
            <button
              className="chat-send"
              onClick={() => sendMessage()}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              id="ai-chat-send"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}