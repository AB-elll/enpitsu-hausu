'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { quickQuestions, faqData, findAnswer } from '@/lib/chatbot-data';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

const WELCOME_MESSAGE =
  'こんにちは！えんぴつはうすへようこそ 🎨\nノベルティ・販促品についてご質問があればお気軽にどうぞ！\n\n下のボタンからよくある質問を選ぶか、自由にメッセージを入力してください。';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'bot', text: WELCOME_MESSAGE, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const addBotReply = useCallback((text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `bot-${Date.now()}`, role: 'bot', text, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  }, []);

  const handleQuickQuestion = useCallback(
    (id: string) => {
      const entry = faqData.find((e) => e.keywords.some((k) => id.includes(k))) ??
        faqData.find((_, i) => quickQuestions[i]?.id === id);
      
      // Map quick question IDs to FAQ entries
      const indexMap: Record<string, number> = {
        delivery: 0, estimate: 1, data: 2, lot: 3,
        products: 4, payment: 5, sample: 6, contact: 7,
      };
      const faq = entry ?? faqData[indexMap[id] ?? 0];
      if (!faq) return;

      const q = quickQuestions.find((qq) => qq.id === id);
      setMessages((prev) => [
        ...prev,
        { id: `user-${Date.now()}`, role: 'user', text: q?.label ?? faq.question, timestamp: new Date() },
      ]);
      addBotReply(faq.answer);
    },
    [addBotReply],
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, role: 'user', text: trimmed, timestamp: new Date() },
    ]);
    setInput('');

    const match = findAnswer(trimmed);
    if (match) {
      addBotReply(match.answer);
    } else {
      addBotReply(
        'すみません、ご質問の内容を特定できませんでした 🙇\n\n詳しくは [お問い合わせフォーム](/contact) よりお気軽にご連絡ください。\n\n📞 お電話でもお気軽にどうぞ：**03-3745-8421**（平日9:00〜18:00）',
      );
    }
  }, [input, addBotReply]);

  const renderMarkdown = (text: string) => {
    // Simple markdown: bold, links, line breaks
    return text.split('\n').map((line, i) => {
      const parts = line
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary underline hover:text-primary-dark">$1</a>');
      return (
        <span key={i}>
          {i > 0 && <br />}
          <span dangerouslySetInnerHTML={{ __html: parts }} />
        </span>
      );
    });
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? 'bg-text rotate-90'
            : 'bg-primary hover:bg-primary-dark'
        }`}
        aria-label={isOpen ? 'チャットを閉じる' : 'チャットを開く'}
      >
        {isOpen ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z" />
            <circle cx="8" cy="10" r="1" />
            <circle cx="12" cy="10" r="1" />
            <circle cx="16" cy="10" r="1" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-300 max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none ${
          isOpen
            ? 'h-[520px] w-[380px] scale-100 opacity-100 max-sm:h-full max-sm:w-full'
            : 'pointer-events-none h-0 w-0 scale-90 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg">
            ✏️
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">えんぴつはうす</div>
            <div className="text-xs opacity-80">ノベルティのご相談はこちら</div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hidden rounded-lg p-1 hover:bg-white/20 max-sm:block"
            aria-label="閉じる"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-[fadeSlideIn_0.3s_ease-out]`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'rounded-br-sm bg-primary text-white'
                    : 'rounded-bl-sm bg-surface text-text'
                }`}
              >
                {renderMarkdown(msg.text)}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start animate-[fadeSlideIn_0.3s_ease-out]">
              <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-surface px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-text-secondary [animation-delay:300ms]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="border-t border-border px-4 py-3">
            <div className="mb-2 text-xs font-medium text-text-secondary">よくある質問</div>
            <div className="flex flex-wrap gap-1.5">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuickQuestion(q.id)}
                  className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  {q.icon} {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border px-3 py-2.5">
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.nativeEvent.isComposing && handleSend()}
              placeholder="メッセージを入力..."
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-dark disabled:opacity-40 disabled:hover:bg-primary active:scale-95"
              aria-label="送信"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
