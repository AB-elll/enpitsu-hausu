'use client';

import { useState, useRef, useEffect, useCallback, type KeyboardEvent as ReactKeyboardEvent } from 'react';
import { quickQuestions, faqData } from '@/lib/chatbot-data';

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

const WELCOME_MESSAGE_AI =
  'こんにちは！えんぴつはうすへようこそ 🎨\nノベルティ・販促品についてご質問があればお気軽にどうぞ！\n\n下のボタンからよくある質問を選ぶか、自由にメッセージを入力してください。';

const WELCOME_MESSAGE_MOCK =
  'こんにちは！えんぴつくんです🎨 ノベルティのことならなんでも聞いてね！\n\n下のボタンからよくある質問を選ぶか、自由にメッセージを入力してくださいね✨';

interface MockResponse {
  keywords: string[];
  reply: string;
}

const MOCK_RESPONSES: MockResponse[] = [
  {
    keywords: ['商品', 'カレンダー', 'うちわ', 'アクリル', 'グッズ', 'ノベルティ', '販促', 'タオル', 'ボールペン', 'クリアファイル', 'バッグ', 'マグカップ'],
    reply: 'カレンダーやうちわ、アクリルグッズなど豊富に取り揃えてます！📅 詳しくは[商品ページ](/enpitsu-hausu/products)をチェックしてみてくださいね✨',
  },
  {
    keywords: ['価格', '値段', '見積', 'いくら', '料金', '費用', 'コスト'],
    reply: 'お見積もりは無料です！💰 [自動見積もりページ](/enpitsu-hausu/estimate)で簡単に確認できますよ✨ お気軽にお試しくださいね！',
  },
  {
    keywords: ['納期', 'いつ届く', '届く', '日数', '急ぎ', '特急', '発送'],
    reply: '標準納期は商品によって異なりますが、お急ぎの場合は特急対応もできます！🚀 [納期カレンダー](/enpitsu-hausu/delivery)で確認してみてくださいね',
  },
  {
    keywords: ['入稿', 'データ', 'イラレ', 'フォトショ', 'illustrator', 'photoshop', 'ai', 'psd', 'テンプレ', 'デザイン'],
    reply: '入稿データはIllustrator(.ai)かPhotoshop(.psd)が推奨です！🎨 詳しくは[デザインガイド](/enpitsu-hausu/design-guide)をご覧ください',
  },
  {
    keywords: ['問い合わせ', '連絡', '電話', 'メール', '相談'],
    reply: 'お問い合わせは[こちらのフォーム](/enpitsu-hausu/contact)からどうぞ！✉️\n📞 お電話でもお気軽に：**03-3745-8421**（平日9:00〜18:00）',
  },
  {
    keywords: ['ありがとう', 'サンキュー', '助かる', '感謝'],
    reply: 'どういたしまして！😊 他にも気になることがあれば、なんでも聞いてくださいね✨',
  },
];

const MOCK_DEFAULT_REPLIES = [
  'えんぴつくんはまだお勉強中です！📚 近日中にもっと賢くなるので楽しみにしててくださいね！お急ぎの場合は[お問い合わせフォーム](/enpitsu-hausu/contact)からどうぞ✉️',
  'うーん、ちょっと難しい質問ですね🤔 [お問い合わせフォーム](/enpitsu-hausu/contact)で詳しくご相談いただけると嬉しいです！',
  'その件はえんぴつくんにはまだ難しいです…📝 でも[お問い合わせ](/enpitsu-hausu/contact)いただければスタッフが丁寧にお答えしますよ！✨',
];

function getMockResponse(userText: string): string {
  const lower = userText.toLowerCase();
  for (const resp of MOCK_RESPONSES) {
    if (resp.keywords.some((kw) => lower.includes(kw))) {
      return resp.reply;
    }
  }
  return MOCK_DEFAULT_REPLIES[Math.floor(Math.random() * MOCK_DEFAULT_REPLIES.length)];
}

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
  const [messages, setMessages] = useState<Message[]>([]);
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
      .then((r) => {
        setAiAvailable(r.status !== 404);
        setMessages([{ id: 'welcome', role: 'bot', text: r.status !== 404 ? WELCOME_MESSAGE_AI : WELCOME_MESSAGE_MOCK, timestamp: new Date() }]);
      })
      .catch(() => {
        setAiAvailable(false);
        setMessages([{ id: 'welcome', role: 'bot', text: WELCOME_MESSAGE_MOCK, timestamp: new Date() }]);
      });
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
    }, 1000 + Math.random() * 1000);
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
      const fallbackText = getMockResponse(userText);

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
      addBotReplyFallback(getMockResponse(trimmed));
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
        className={`fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen ? 'bg-text rotate-90' : 'bg-white border-2 border-primary'
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
          <img src={`${process.env.NEXT_PUBLIC_BASE_PATH || '/enpitsu-hausu'}/enpitsukun.png`} alt="えんぴつくん" width={40} height={40} className="rounded-full" />
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
