"use client";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "Halo! 👋 Saya AI assistant Kai. Tanya apa saja tentang portfolio ini!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
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

      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (error: any) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Maaf, terjadi kesalahan. Coba lagi nanti ya! 🙏" },
      ]);
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
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat Window */}
      {open && (
        <div className="chat-container" id="ai-chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-avatar">🤖</div>
            <div className="chat-header-info">
              <h3>Kai&apos;s AI Assistant</h3>
              <p>Online • Siap membantu</p>
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
              className="chat-send"
              onClick={sendMessage}
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