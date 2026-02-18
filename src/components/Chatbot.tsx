'use client';

import { useState, useRef, useEffect, useCallback, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { quickQuestions, faqData, findAnswer } from '@/lib/chatbot-data';

interface Message {
  id: string;
  role: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatApiMessage {
  role: 'user' | 'assistant';
  content: string;
}

const WELCOME_MESSAGE =
  'こんにちは！えんぴつはうすへようこそ 🎨\nノベルティ・販促品についてご質問があればお気軽にどうぞ！\n\n下のボタンからよくある質問を選ぶか、自由にメッセージを入力してください。';

const MAX_MESSAGES_PER_SESSION = 50;
const SESSION_KEY = 'enpitsu-chat-history';

let messageCounter = 0;
function generateId(prefix: string): string {
  return `${prefix}-${Date.now()}-${++messageCounter}`;
}

function loadHistory(): ChatApiMessage[] {
  try {
    const saved = sessionStorage.getItem(SESSION_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function saveHistory(history: ChatApiMessage[]) {
  try {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(history));
  } catch {
    // ignore
  }
}

async function fetchAIResponse(
  history: ChatApiMessage[],
  onChunk: (text: string) => void,
): Promise<string | null> {
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });

    if (!res.ok) return null;

    const reader = res.body?.getReader();
    if (!reader) return null;

    const decoder = new TextDecoder();
    let full = '';
    let buffer = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6);
        if (data === '[DONE]') continue;
        try {
          const parsed = JSON.parse(data);
          if (parsed.text) {
            full += parsed.text;
            onChunk(full);
          }
        } catch {
          // skip
        }
      }
    }

    return full || null;
  } catch {
    return null;
  }
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', role: 'bot', text: WELCOME_MESSAGE, timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showQuickQuestions, setShowQuickQuestions] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [aiAvailable, setAiAvailable] = useState<boolean | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<ChatApiMessage[]>([]);

  // Load history on mount
  useEffect(() => {
    historyRef.current = loadHistory();
    setMessageCount(historyRef.current.filter((m) => m.role === 'user').length);
  }, []);

  // Check AI availability once
  useEffect(() => {
    if (aiAvailable !== null) return;
    fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [] }) })
      .then((r) => setAiAvailable(r.status !== 404))
      .catch(() => setAiAvailable(false));
  }, [aiAvailable]);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const addBotReplyFallback = useCallback((text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: generateId('bot'), role: 'bot', text, timestamp: new Date() },
      ]);
      setIsTyping(false);
    }, 500 + Math.random() * 400);
  }, []);

  const sendToAI = useCallback(async (userText: string) => {
    if (messageCount >= MAX_MESSAGES_PER_SESSION) {
      addBotReplyFallback(
        'セッションのメッセージ上限に達しました 🙇\n\n詳しくは [お問い合わせフォーム](/contact) よりご連絡ください。\n📞 03-3745-8421（平日9:00〜18:00）',
      );
      return;
    }

    historyRef.current.push({ role: 'user', content: userText });
    saveHistory(historyRef.current);
    setMessageCount((c) => c + 1);

    const botMsgId = generateId('bot');
    setIsTyping(true);

    const result = await fetchAIResponse(historyRef.current, (streamedText) => {
      setIsTyping(false);
      setIsStreaming(true);
      setMessages((prev) => {
        const existing = prev.find((m) => m.id === botMsgId);
        if (existing) {
          return prev.map((m) => (m.id === botMsgId ? { ...m, text: streamedText } : m));
        }
        return [...prev, { id: botMsgId, role: 'bot' as const, text: streamedText, timestamp: new Date() }];
      });
    });

    setIsTyping(false);
    setIsStreaming(false);

    if (result) {
      historyRef.current.push({ role: 'assistant', content: result });
      saveHistory(historyRef.current);
    } else {
      // Fallback to rule-based
      const match = findAnswer(userText);
      const fallbackText = match
        ? match.answer
        : 'すみません、ただいまAIアシスタントに接続できません 🙇\n\n[お問い合わせフォーム](/contact) よりお気軽にご連絡ください。\n📞 03-3745-8421（平日9:00〜18:00）';

      setMessages((prev) => {
        const existing = prev.find((m) => m.id === botMsgId);
        if (existing) {
          return prev.map((m) => (m.id === botMsgId ? { ...m, text: fallbackText } : m));
        }
        return [...prev, { id: botMsgId, role: 'bot' as const, text: fallbackText, timestamp: new Date() }];
      });

      // Remove the user message from history since AI didn't process it
      historyRef.current.pop();
      saveHistory(historyRef.current);
    }
  }, [messageCount, addBotReplyFallback]);

  const quickQuestionFaqMap: Record<string, number> = {
    delivery: 0,
    estimate: 1,
    data: 2,
    lot: 3,
    products: 4,
    payment: 5,
    sample: 6,
    contact: 7,
  };

  const handleQuickQuestion = useCallback(
    (id: string) => {
      const faqIndex = quickQuestionFaqMap[id];
      if (faqIndex === undefined || !faqData[faqIndex]) return;

      const faq = faqData[faqIndex];
      const q = quickQuestions.find((qq) => qq.id === id);
      const questionText = q?.label ?? faq.question;

      setMessages((prev) => [
        ...prev,
        { id: generateId('user'), role: 'user', text: questionText, timestamp: new Date() },
      ]);
      setShowQuickQuestions(false);

      if (aiAvailable) {
        sendToAI(questionText);
      } else {
        addBotReplyFallback(faq.answer);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addBotReplyFallback, sendToAI, aiAvailable],
  );

  const handleSend = useCallback(() => {
    const trimmed = input.trim();
    if (!trimmed || isStreaming) return;

    setMessages((prev) => [
      ...prev,
      { id: generateId('user'), role: 'user', text: trimmed, timestamp: new Date() },
    ]);
    setInput('');
    setShowQuickQuestions(false);

    if (aiAvailable) {
      sendToAI(trimmed);
    } else {
      // Fallback to rule-based
      const match = findAnswer(trimmed);
      if (match) {
        addBotReplyFallback(match.answer);
      } else {
        addBotReplyFallback(
          'すみません、ご質問の内容を特定できませんでした 🙇\n\n詳しくは [お問い合わせフォーム](/contact) よりお気軽にご連絡ください。\n\n📞 お電話でもお気軽にどうぞ：**03-3745-8421**（平日9:00〜18:00）',
        );
      }
    }
  }, [input, isStreaming, aiAvailable, sendToAI, addBotReplyFallback]);

  const handleInputKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
        e.preventDefault();
        handleSend();
      }
    },
    [handleSend],
  );

  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, i) => {
      const parts: React.ReactNode[] = [];
      let remaining = line;
      let keyIdx = 0;

      while (remaining.length > 0) {
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
        const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/);

        const boldIdx = boldMatch?.index ?? Infinity;
        const linkIdx = linkMatch?.index ?? Infinity;

        if (boldIdx === Infinity && linkIdx === Infinity) {
          parts.push(remaining);
          break;
        }

        if (boldIdx <= linkIdx && boldMatch) {
          if (boldIdx > 0) parts.push(remaining.slice(0, boldIdx));
          parts.push(<strong key={`b${keyIdx++}`}>{boldMatch[1]}</strong>);
          remaining = remaining.slice(boldIdx + boldMatch[0].length);
        } else if (linkMatch) {
          if (linkIdx > 0) parts.push(remaining.slice(0, linkIdx));
          parts.push(
            <a
              key={`a${keyIdx++}`}
              href={linkMatch[2]}
              className="text-primary underline hover:text-primary-dark"
            >
              {linkMatch[1]}
            </a>,
          );
          remaining = remaining.slice(linkIdx + linkMatch[0].length);
        }
      }

      return (
        <span key={i}>
          {i > 0 && <br />}
          {parts}
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
          isOpen ? 'bg-text rotate-90' : 'bg-primary hover:bg-primary-dark'
        }`}
        aria-label={isOpen ? 'チャットを閉じる' : 'チャットを開く'}
        aria-expanded={isOpen}
        aria-controls="chatbot-window"
      >
        {isOpen ? (
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="white" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z" />
            <circle cx="8" cy="10" r="1" />
            <circle cx="12" cy="10" r="1" />
            <circle cx="16" cy="10" r="1" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        ref={chatWindowRef}
        id="chatbot-window"
        role="dialog"
        aria-label="チャットボット"
        aria-hidden={!isOpen}
        className={`fixed bottom-24 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-2xl transition-all duration-300 max-sm:inset-0 max-sm:bottom-0 max-sm:right-0 max-sm:rounded-none ${
          isOpen
            ? 'h-[520px] w-[380px] scale-100 opacity-100 max-sm:h-full max-sm:w-full'
            : 'pointer-events-none h-0 w-0 scale-90 opacity-0'
        }`}
      >
        {/* Header */}
        <div className="flex items-center gap-3 bg-primary px-4 py-3 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-lg" aria-hidden="true">
            ✏️
          </div>
          <div className="flex-1">
            <div className="text-sm font-bold">えんぴつくん {aiAvailable ? '🤖' : ''}</div>
            <div className="text-xs opacity-80">ノベルティのご相談はこちら</div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="hidden rounded-lg p-1 hover:bg-white/20 max-sm:block"
            aria-label="閉じる"
          >
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto px-4 py-3 space-y-3"
          role="log"
          aria-label="メッセージ履歴"
          aria-live="polite"
          aria-relevant="additions"
        >
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
            <div className="flex justify-start animate-[fadeSlideIn_0.3s_ease-out]" aria-label="入力中">
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
        {showQuickQuestions && (
          <div className="border-t border-border px-4 py-3">
            <div className="mb-2 text-xs font-medium text-text-secondary">よくある質問</div>
            <div className="flex flex-wrap gap-1.5" role="group" aria-label="よくある質問">
              {quickQuestions.map((q) => (
                <button
                  key={q.id}
                  onClick={() => handleQuickQuestion(q.id)}
                  className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-text transition-all hover:border-primary hover:bg-primary/5 hover:text-primary active:scale-95"
                >
                  <span aria-hidden="true">{q.icon}</span> {q.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="border-t border-border px-3 py-2.5">
          <div className="flex gap-2">
            <label htmlFor="chatbot-input" className="sr-only">
              メッセージを入力
            </label>
            <input
              id="chatbot-input"
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={isStreaming ? '応答中...' : 'メッセージを入力...'}
              className="flex-1 rounded-xl border border-border bg-surface px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              autoComplete="off"
              disabled={isStreaming}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isStreaming}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-all hover:bg-primary-dark disabled:opacity-40 disabled:hover:bg-primary active:scale-95"
              aria-label="送信"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" aria-hidden="true">
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
