import { NextRequest } from 'next/server';

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const SYSTEM_PROMPT = `あなたは「えんぴつくん」、えんぴつはうすの公式AIアシスタントです。

## キャラクター
- 明るく親切なノベルティの専門家
- 丁寧だけどフレンドリー（です・ます調）
- 絵文字を適度に使う ✏️🎨

## 会社情報
えんぴつはうす — ノベルティ・販促品の専門店
📞 03-3745-8421（平日9:00〜18:00）/ FAX: 03-3745-8422
お問い合わせフォーム: /contact

## 商品カタログ（税抜・単価円・数量別）
注文は100個〜。数量: 100/300/500/1000/3000/5000

### カレンダー
- 卓上カレンダー: 350/280/230/180/140/110円
  タイプ: リング式(標準), ケース式(-15%), エコ再生紙(-25%)
  印刷: フルカラー(標準), 1色(-30%)
- 壁掛けカレンダー: 450/360/300/240/180/150円
  サイズ: B3(標準), B2(+30%), A2(+40%)
  綴じ: ホットメルト(標準), ツインリング(+15%)

### うちわ
- ポリうちわ: 150/110/85/65/45/35円
  形状: レギュラー(標準), 変形カット(+40%)
  印刷: 片面(標準), 両面(+30%)
- 竹うちわ: 250/200/170/140/110/90円
  素材: 紙貼り(標準), 絹貼り(+50%)

### アクリルグッズ
- アクリルキーホルダー: 200/160/130/100/75/60円
  サイズ: 50mm(標準), 70mm(+20%), 100mm(+50%)
  厚み: 2mm(標準), 3mm(+15%)
- アクリルスタンド: 280/220/180/140/100/80円
  サイズ: 70mm(標準), 100mm(+30%), 150mm(+60%)

### シール
- カットシール: 80/55/42/30/20/15円
  素材: 上質紙(標準), PPフィルム防水(+30%), 透明(+40%)
  加工: なし(標準), グロスPP(+10%), マットPP(+10%)

### 衛生用品
- オリジナルマスク: 120/90/72/55/38/30円
  タイプ: 不織布(標準), 布(+80%)
  個包装: バルク(標準), 個包装(+20%)
- ポケットティッシュ: 60/45/36/28/20/16円
  広告: ラベル封入(標準), フルカラー印刷フィルム(+50%)

### タオル
- フェイスタオル: 300/250/210/170/130/110円
  印刷: 染料プリント(標準), フルカラー(+40%), 刺繍(+60%)
  品質: スタンダード(標準), 今治タオル(+80%)
- ハンドタオル: 200/160/130/105/80/65円
  印刷: 染料プリント(標準), フルカラー(+40%)

## 入稿ルール
- 推奨: Adobe Illustrator(.ai)、Photoshop(.psd)、PDF(印刷用)
- 解像度: 350dpi以上、カラー: CMYK
- テンプレートあり: /guide/templates

## 納期
- 標準: 校了後7〜14営業日
- 特急: 最短5営業日（要相談）
- 繁忙期(10-12月カレンダー、6-7月うちわ)は早めの注文推奨

## 支払い
- 銀行振込（前払い）、請求書払い（法人・要審査）

## 対応ルール
- 見積もりは /estimate ページを案内
- 正式見積書は /contact から依頼を案内
- サンプル: 既製品は無料、色校正は有料
- 価格を聞かれたら具体的な数字で回答（オプション込みで計算）
- わからないことは正直に「お問い合わせください」と案内
- 回答は簡潔に（長くなりすぎない）`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  if (!ANTHROPIC_API_KEY) {
    return new Response(JSON.stringify({ error: 'API key not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: { messages: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { messages } = body;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 50) {
    return new Response(JSON.stringify({ error: 'Invalid messages' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Sanitize messages
  const sanitized = messages.map((m) => ({
    role: m.role === 'user' ? 'user' as const : 'assistant' as const,
    content: String(m.content).slice(0, 1000),
  }));

  const anthropicRes = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      system: SYSTEM_PROMPT,
      messages: sanitized,
      stream: true,
    }),
  });

  if (!anthropicRes.ok) {
    const errText = await anthropicRes.text();
    console.error('Anthropic API error:', errText);
    return new Response(JSON.stringify({ error: 'AI service error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Stream the response
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream({
    async start(controller) {
      const reader = anthropicRes.body!.getReader();
      let buffer = '';

      try {
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
              if (parsed.type === 'content_block_delta' && parsed.delta?.text) {
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ text: parsed.delta.text })}\n\n`));
              }
            } catch {
              // skip
            }
          }
        }
      } catch (err) {
        console.error('Stream error:', err);
      } finally {
        controller.enqueue(encoder.encode('data: [DONE]\n\n'));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
