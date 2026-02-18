'use client';

import { useEffect, useState } from 'react';

interface UnansweredQuestion {
  id: string;
  question: string;
  contactType: 'line' | 'email' | 'phone';
  contactValue: string;
  timestamp: number;
  status: 'pending' | 'in_progress' | 'completed';
}

interface KnowledgeEntry {
  id: string;
  question: string;
  answer: string;
  keywords: string[];
  timestamp: number;
}

interface InquiryResponse {
  id: string;
  staffAnswer: string;
  aiReply: string;
  timestamp: number;
}

const statusLabels = {
  pending: { label: '未対応', bg: 'bg-red-100', text: 'text-red-800' },
  in_progress: { label: '対応中', bg: 'bg-yellow-100', text: 'text-yellow-800' },
  completed: { label: '完了', bg: 'bg-green-100', text: 'text-green-800' }
};

const contactTypeLabels = {
  line: { label: 'LINE', icon: '💬' },
  email: { label: 'Email', icon: '✉️' },
  phone: { label: '電話', icon: '📞' }
};

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<UnansweredQuestion[]>([]);
  const [responses, setResponses] = useState<Record<string, InquiryResponse>>({});
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [staffAnswers, setStaffAnswers] = useState<Record<string, string>>({});
  const [aiReplies, setAiReplies] = useState<Record<string, string>>({});

  // データ読み込み
  const loadData = () => {
    try {
      const questions: UnansweredQuestion[] = JSON.parse(localStorage.getItem('enpitsu_unanswered_questions') || '[]');
      const savedResponses: Record<string, InquiryResponse> = JSON.parse(localStorage.getItem('enpitsu_inquiry_responses') || '{}');
      
      // 新しいものから順にソート
      questions.sort((a, b) => b.timestamp - a.timestamp);
      
      setInquiries(questions);
      setResponses(savedResponses);
    } catch (error) {
      console.error('データ読み込みエラー:', error);
      setInquiries([]);
      setResponses({});
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ステータス更新
  const updateStatus = (inquiryId: string, newStatus: UnansweredQuestion['status']) => {
    try {
      const questions: UnansweredQuestion[] = JSON.parse(localStorage.getItem('enpitsu_unanswered_questions') || '[]');
      const updatedQuestions = questions.map(q => 
        q.id === inquiryId ? { ...q, status: newStatus } : q
      );
      localStorage.setItem('enpitsu_unanswered_questions', JSON.stringify(updatedQuestions));
      setInquiries(updatedQuestions.sort((a, b) => b.timestamp - a.timestamp));
    } catch (error) {
      console.error('ステータス更新エラー:', error);
    }
  };

  // AI返信文生成（モック）
  const generateAiReply = (staffAnswer: string) => {
    const templates = [
      `お忙しい中お問い合わせいただき、ありがとうございます。\n\n${staffAnswer}\n\n何かご不明な点がございましたら、お気軽にお声かけください。\n\nえんぴつはうす スタッフ一同`,
      `いつもありがとうございます！\n\n${staffAnswer}\n\n今後ともえんぴつはうすをどうぞよろしくお願いいたします✨`,
      `お問い合わせありがとうございます。\n\n${staffAnswer}\n\nご不明な点などございましたら、お気軽にご連絡くださいませ。\n\nえんぴつはうす カスタマーサポート`
    ];
    
    return templates[Math.floor(Math.random() * templates.length)];
  };

  // 回答処理
  const handleAnswer = (inquiryId: string) => {
    const staffAnswer = staffAnswers[inquiryId]?.trim();
    if (!staffAnswer) return;

    const aiReply = generateAiReply(staffAnswer);
    const response: InquiryResponse = {
      id: inquiryId,
      staffAnswer,
      aiReply,
      timestamp: Date.now()
    };

    try {
      const savedResponses = { ...responses, [inquiryId]: response };
      localStorage.setItem('enpitsu_inquiry_responses', JSON.stringify(savedResponses));
      setResponses(savedResponses);
      setAiReplies(prev => ({ ...prev, [inquiryId]: aiReply }));
      updateStatus(inquiryId, 'in_progress');
    } catch (error) {
      console.error('回答保存エラー:', error);
    }
  };

  // 送信承認
  const handleApprove = (inquiryId: string) => {
    updateStatus(inquiryId, 'completed');
    // 実際の送信処理はモックなので省略
    alert('返信を送信しました（モック）');
  };

  // ナレッジに追加
  const addToKnowledge = (inquiry: UnansweredQuestion) => {
    const response = responses[inquiry.id];
    if (!response) return;

    try {
      const knowledgeBase: KnowledgeEntry[] = JSON.parse(localStorage.getItem('enpitsu_knowledge_base') || '[]');
      
      // 簡単なキーワード抽出（単語を分割）
      const keywords = inquiry.question.split(/[、。\s\?？！!]/).filter(word => word.length > 1);
      
      const newEntry: KnowledgeEntry = {
        id: `kb-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        question: inquiry.question,
        answer: response.staffAnswer,
        keywords: keywords,
        timestamp: Date.now()
      };
      
      knowledgeBase.push(newEntry);
      localStorage.setItem('enpitsu_knowledge_base', JSON.stringify(knowledgeBase));
      
      alert('ナレッジベースに追加しました！');
    } catch (error) {
      console.error('ナレッジ追加エラー:', error);
      alert('ナレッジベースへの追加に失敗しました');
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      year: 'numeric',
      month: 'numeric', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const pendingCount = inquiries.filter(q => q.status === 'pending').length;
  const inProgressCount = inquiries.filter(q => q.status === 'in_progress').length;
  const completedCount = inquiries.filter(q => q.status === 'completed').length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--color-text)]">問い合わせ管理</h1>
        <p className="text-sm text-[var(--color-text-secondary)] mt-1">
          チャットボットで回答できなかった問い合わせの管理
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-secondary)]">未対応</p>
              <p className="text-2xl font-bold text-red-600">{pendingCount}</p>
            </div>
            <div className="text-2xl">🔄</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-secondary)]">対応中</p>
              <p className="text-2xl font-bold text-yellow-600">{inProgressCount}</p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[var(--color-border)] p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[var(--color-text-secondary)]">完了</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <div className="text-2xl">✅</div>
          </div>
        </div>
      </div>

      {/* 問い合わせリスト */}
      <div className="space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-lg border border-[var(--color-border)] p-8 text-center">
            <div className="text-4xl mb-3">🤖</div>
            <h3 className="text-lg font-medium text-[var(--color-text)] mb-2">
              問い合わせはありません
            </h3>
            <p className="text-[var(--color-text-secondary)]">
              チャットボットで回答できない質問があると、ここに表示されます
            </p>
          </div>
        ) : (
          inquiries.map((inquiry) => {
            const response = responses[inquiry.id];
            const isExpanded = expandedId === inquiry.id;
            const status = statusLabels[inquiry.status];
            const contactType = contactTypeLabels[inquiry.contactType];

            return (
              <div
                key={inquiry.id}
                className="bg-white rounded-lg border border-[var(--color-border)] overflow-hidden"
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bg} ${status.text}`}>
                        {status.label}
                      </span>
                      <span className="text-xs text-[var(--color-text-secondary)]">
                        {formatDate(inquiry.timestamp)}
                      </span>
                    </div>
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
                      className="text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 text-sm"
                    >
                      {isExpanded ? '▲ 閉じる' : '▼ 詳細'}
                    </button>
                  </div>

                  <div className="mb-3">
                    <h3 className="font-medium text-[var(--color-text)] mb-1">問い合わせ内容</h3>
                    <p className="text-[var(--color-text)] bg-[var(--color-surface)] rounded-lg p-3">
                      {inquiry.question}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                    <span>{contactType.icon}</span>
                    <span>{contactType.label}:</span>
                    <span className="font-medium">{inquiry.contactValue}</span>
                  </div>

                  {isExpanded && (
                    <div className="mt-4 border-t border-[var(--color-border)] pt-4">
                      {inquiry.status === 'pending' && (
                        <div className="space-y-3">
                          <div>
                            <label className="block text-sm font-medium text-[var(--color-text)] mb-2">
                              回答内容を入力
                            </label>
                            <textarea
                              value={staffAnswers[inquiry.id] || ''}
                              onChange={(e) => setStaffAnswers(prev => ({
                                ...prev,
                                [inquiry.id]: e.target.value
                              }))}
                              className="w-full rounded-lg border border-[var(--color-border)] p-3 text-sm focus:border-[var(--color-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20"
                              rows={4}
                              placeholder="お客様への回答を入力してください..."
                            />
                          </div>
                          <button
                            onClick={() => handleAnswer(inquiry.id)}
                            disabled={!staffAnswers[inquiry.id]?.trim()}
                            className="bg-[var(--color-primary)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            AI返信文生成
                          </button>
                        </div>
                      )}

                      {(inquiry.status === 'in_progress' || inquiry.status === 'completed') && response && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">スタッフ回答</h4>
                            <p className="bg-[var(--color-surface)] rounded-lg p-3 text-sm">
                              {response.staffAnswer}
                            </p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-[var(--color-text)] mb-2">AI生成返信文</h4>
                            <div className="bg-blue-50 rounded-lg p-3 text-sm">
                              {response.aiReply.split('\n').map((line, i) => (
                                <div key={i}>{line || <br />}</div>
                              ))}
                            </div>
                          </div>

                          {inquiry.status === 'in_progress' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove(inquiry.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700"
                              >
                                承認して送信
                              </button>
                              <button
                                onClick={() => addToKnowledge(inquiry)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700"
                              >
                                ナレッジに追加
                              </button>
                            </div>
                          )}

                          {inquiry.status === 'completed' && (
                            <div className="flex items-center gap-2 text-green-600 text-sm">
                              <span>✓</span>
                              <span>送信済み（{formatDate(response.timestamp)}）</span>
                              <button
                                onClick={() => addToKnowledge(inquiry)}
                                className="ml-auto bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                              >
                                ナレッジに追加
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}