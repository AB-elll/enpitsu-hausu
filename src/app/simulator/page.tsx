'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  productTemplates,
  fontOptions,
  bgColorOptions,
  textColorOptions,
  type ProductTemplate,
} from '@/lib/simulator-data';

// ============================================================
// メタは layout or generateMetadata で出す（use client なので直接 export 不可）
// ============================================================

/* ─── ヘルパー: Canvas に商品シェイプのクリップパスを描く ─── */
function drawShapeClip(
  ctx: CanvasRenderingContext2D,
  shape: ProductTemplate['shape'],
  w: number,
  h: number,
) {
  ctx.beginPath();
  switch (shape) {
    case 'circle': {
      const r = Math.min(w, h) / 2;
      ctx.arc(w / 2, h / 2, r, 0, Math.PI * 2);
      break;
    }
    case 'fan': {
      // うちわ: 上部が丸、下部に柄
      const cx = w / 2;
      const r = w * 0.45;
      const top = h * 0.05;
      ctx.arc(cx, top + r, r, 0, Math.PI * 2);
      // 柄
      ctx.moveTo(cx - 15, top + r * 2);
      ctx.lineTo(cx + 15, top + r * 2);
      ctx.lineTo(cx + 10, h);
      ctx.lineTo(cx - 10, h);
      ctx.closePath();
      break;
    }
    case 'keychain': {
      // キーホルダー: 穴付き角丸ボディ
      // 本体のみ描画（穴は別途描画）
      const radius = 16;
      const holeR = 10;
      const holeY = 18;
      const bodyTop = holeY + holeR + 4;

      // 本体の角丸矩形
      ctx.moveTo(radius, bodyTop);
      ctx.lineTo(w - radius, bodyTop);
      ctx.arcTo(w, bodyTop, w, bodyTop + radius, radius);
      ctx.lineTo(w, h - radius);
      ctx.arcTo(w, h, w - radius, h, radius);
      ctx.lineTo(radius, h);
      ctx.arcTo(0, h, 0, h - radius, radius);
      ctx.lineTo(0, bodyTop + radius);
      ctx.arcTo(0, bodyTop, radius, bodyTop, radius);
      ctx.closePath();

      // 穴リング（上部）- 反時計回りでeven-oddクリップ用
      ctx.moveTo(w / 2 + holeR + 6, holeY);
      ctx.arc(w / 2, holeY, holeR + 6, 0, Math.PI * 2);
      // 穴の中（反時計回り）
      ctx.moveTo(w / 2 + holeR, holeY);
      ctx.arc(w / 2, holeY, holeR, 0, Math.PI * 2, true);
      break;
    }
    case 'rounded-rect': {
      const r = 20;
      ctx.moveTo(r, 0);
      ctx.lineTo(w - r, 0);
      ctx.arcTo(w, 0, w, r, r);
      ctx.lineTo(w, h - r);
      ctx.arcTo(w, h, w - r, h, r);
      ctx.lineTo(r, h);
      ctx.arcTo(0, h, 0, h - r, r);
      ctx.lineTo(0, r);
      ctx.arcTo(0, 0, r, 0, r);
      ctx.closePath();
      break;
    }
    default:
      ctx.rect(0, 0, w, h);
  }
}

/* ─── 共通描画ロジック ─── */
function renderCanvas(
  ctx: CanvasRenderingContext2D,
  product: ProductTemplate,
  bgColor: string,
  uploadedImage: HTMLImageElement | null,
  imgPos: { x: number; y: number },
  imgScale: number,
  text: string,
  textColor: string,
  fontSize: number,
  fontFamily: string,
) {
  const w = product.width;
  const h = product.height;

  ctx.clearRect(0, 0, w, h);

  // クリップパス
  ctx.save();
  drawShapeClip(ctx, product.shape, w, h);
  if (product.shape === 'keychain') {
    ctx.clip('evenodd');
  } else {
    ctx.clip();
  }

  // 背景
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, w, h);

  // アップロード画像
  if (uploadedImage) {
    const area = product.imageArea;
    const areaW = w * area.width;
    const areaH = h * area.height;
    const areaX = w * area.x;
    const areaY = h * area.y;

    const imgW = uploadedImage.naturalWidth;
    const imgH = uploadedImage.naturalHeight;
    const fitScale = Math.min(areaW / imgW, areaH / imgH) * imgScale;
    const drawW = imgW * fitScale;
    const drawH = imgH * fitScale;
    const drawX = areaX + (areaW - drawW) / 2 + imgPos.x;
    const drawY = areaY + (areaH - drawH) / 2 + imgPos.y;

    ctx.drawImage(uploadedImage, drawX, drawY, drawW, drawH);
  }

  // テキスト（空文字はスキップ）
  const trimmed = text.trim();
  if (trimmed) {
    const area = product.textArea;
    const tx = w * (area.x + area.width / 2);
    const ty = h * (area.y + area.height / 2);
    const maxWidth = w * area.width;

    // フォントサイズをテキストエリアの高さに制限
    const maxFontSize = h * area.height * 0.8;
    const clampedSize = Math.min(fontSize, maxFontSize);

    ctx.fillStyle = textColor;
    ctx.font = `bold ${clampedSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lines = trimmed.split('\n');
    const lineH = clampedSize * 1.4;
    const startY = ty - ((lines.length - 1) * lineH) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, tx, startY + i * lineH, maxWidth);
    });
  }

  ctx.restore();

  // 枠線（シェイプ）
  ctx.save();
  ctx.strokeStyle = '#D1D5DB';
  ctx.lineWidth = 2;
  drawShapeClip(ctx, product.shape, w, h);
  ctx.stroke();
  ctx.restore();
}

/* ─── メインコンポーネント ─── */
export default function SimulatorPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductTemplate>(productTemplates[0]);
  const [bgColor, setBgColor] = useState(productTemplates[0].defaultBgColor);
  const [text, setText] = useState('サンプルテキスト');
  const [fontFamily, setFontFamily] = useState(fontOptions[0].family);
  const [textColor, setTextColor] = useState('#1F2937');
  const [fontSize, setFontSize] = useState(28);
  const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
  const [imgPos, setImgPos] = useState({ x: 0, y: 0 });
  const [imgScale, setImgScale] = useState(1);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [tab, setTab] = useState<'product' | 'text' | 'image' | 'bg'>('product');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // キャンバスのスケール（レスポンシブ用）
  const [canvasScale, setCanvasScale] = useState(1);

  // レスポンシブスケール計算
  useEffect(() => {
    function updateScale() {
      if (!containerRef.current) return;
      const containerW = containerRef.current.clientWidth - 32; // padding
      const maxH = window.innerHeight * 0.6;
      const scaleW = containerW / selectedProduct.width;
      const scaleH = maxH / selectedProduct.height;
      setCanvasScale(Math.min(scaleW, scaleH, 1.5));
    }
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [selectedProduct]);

  // 商品切替時にリセット
  function handleProductChange(p: ProductTemplate) {
    setSelectedProduct(p);
    setBgColor(p.defaultBgColor);
    setUploadedImage(null);
    setImgPos({ x: 0, y: 0 });
    setImgScale(1);
  }

  // Canvas 描画（requestAnimationFrame でバッチ）
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = selectedProduct.width;
    canvas.height = selectedProduct.height;

    renderCanvas(ctx, selectedProduct, bgColor, uploadedImage, imgPos, imgScale, text, textColor, fontSize, fontFamily);
  }, [selectedProduct, bgColor, text, fontFamily, textColor, fontSize, uploadedImage, imgPos, imgScale]);

  useEffect(() => {
    draw();
  }, [draw]);

  // 画像アップロード
  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new Image();
      img.onload = () => {
        setUploadedImage(img);
        setImgPos({ x: 0, y: 0 });
        setImgScale(1);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  }

  // ポインターイベントで統一（mouse + touch を一本化）
  function getPointerPos(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / canvasScale,
      y: (e.clientY - rect.top) / canvasScale,
    };
  }

  function handlePointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!uploadedImage) return;
    e.preventDefault();
    (e.target as HTMLCanvasElement).setPointerCapture(e.pointerId);
    const pos = getPointerPos(e);
    setDragging(true);
    setDragStart({ x: pos.x - imgPos.x, y: pos.y - imgPos.y });
  }

  function handlePointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!dragging) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    const newPos = { x: pos.x - dragStart.x, y: pos.y - dragStart.y };

    // requestAnimationFrame でスロットル
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      setImgPos(newPos);
    });
  }

  function handlePointerUp() {
    setDragging(false);
  }

  // PNG ダウンロード（2x 高解像度）
  function handleDownload() {
    const scale = 2;
    const tmpCanvas = document.createElement('canvas');
    tmpCanvas.width = selectedProduct.width * scale;
    tmpCanvas.height = selectedProduct.height * scale;
    const ctx = tmpCanvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(scale, scale);

    renderCanvas(ctx, selectedProduct, bgColor, uploadedImage, imgPos, imgScale, text, textColor, fontSize, fontFamily);

    const link = document.createElement('a');
    link.download = `${selectedProduct.id}-design.png`;
    link.href = tmpCanvas.toDataURL('image/png');
    link.click();
  }

  // カテゴリでグルーピング
  const grouped = productTemplates.reduce<Record<string, ProductTemplate[]>>((acc, p) => {
    (acc[p.category] ??= []).push(p);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-bg">
      {/* ヘッダー */}
      <section className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold font-[family-name:var(--font-heading)] text-text">
            🎨 デザインシミュレーター
          </h1>
          <p className="mt-2 text-text-secondary text-sm sm:text-base">
            商品を選んで、テキストや画像を配置。仕上がりイメージをその場で確認できます。
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ─── 左: プレビュー ─── */}
          <div className="flex-1 min-w-0">
            <div
              ref={containerRef}
              className="bg-white rounded-xl shadow-sm border border-border p-4 sm:p-6"
            >
              {/* 商品名 */}
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ backgroundColor: selectedProduct.categoryColor }}
                  aria-hidden="true"
                />
                <span className="font-semibold text-text text-sm sm:text-base">
                  {selectedProduct.name}
                </span>
                <span className="text-xs text-text-secondary ml-auto">
                  {selectedProduct.width}×{selectedProduct.height}px
                </span>
              </div>

              {/* Canvas */}
              <div className="flex justify-center overflow-hidden">
                <canvas
                  ref={canvasRef}
                  role="img"
                  aria-label={`${selectedProduct.name}のデザインプレビュー`}
                  className="cursor-move"
                  style={{
                    width: selectedProduct.width * canvasScale,
                    height: selectedProduct.height * canvasScale,
                    touchAction: 'none',
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />
              </div>

              {uploadedImage && (
                <p className="text-xs text-text-secondary text-center mt-2">
                  💡 キャンバスをドラッグして画像を移動できます
                </p>
              )}

              {/* ダウンロード */}
              <button
                onClick={handleDownload}
                className="mt-4 w-full py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary-dark transition-colors shadow-sm"
              >
                📥 デザインをダウンロード（PNG）
              </button>
            </div>
          </div>

          {/* ─── 右: コントロールパネル ─── */}
          <div className="lg:w-[360px] flex-shrink-0">
            {/* タブ */}
            <div className="flex rounded-lg bg-surface border border-border overflow-hidden mb-4" role="tablist" aria-label="デザイン設定">
              {([
                ['product', '🏷️ 商品'],
                ['text', '✏️ テキスト'],
                ['image', '🖼️ 画像'],
                ['bg', '🎨 背景'],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={tab === key}
                  aria-controls={`panel-${key}`}
                  onClick={() => setTab(key)}
                  className={`flex-1 py-2.5 text-xs sm:text-sm font-medium transition-colors ${
                    tab === key
                      ? 'bg-white text-primary shadow-sm'
                      : 'text-text-secondary hover:text-text'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-border p-4 sm:p-5">
              {/* 商品選択 */}
              {tab === 'product' && (
                <div id="panel-product" role="tabpanel" className="space-y-4">
                  <h3 className="font-semibold text-text">商品を選択</h3>
                  {Object.entries(grouped).map(([cat, items]) => (
                    <div key={cat}>
                      <p className="text-xs font-medium text-text-secondary mb-2 flex items-center gap-1.5">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: items[0].categoryColor }}
                          aria-hidden="true"
                        />
                        {cat}
                      </p>
                      <div className="grid grid-cols-1 gap-2">
                        {items.map((p) => (
                          <button
                            key={p.id}
                            onClick={() => handleProductChange(p)}
                            aria-pressed={selectedProduct.id === p.id}
                            className={`text-left p-3 rounded-lg border transition-all text-sm ${
                              selectedProduct.id === p.id
                                ? 'border-primary bg-blue-50 text-primary'
                                : 'border-border hover:border-primary/40 text-text'
                            }`}
                          >
                            <span className="font-medium">{p.name}</span>
                            <span className="block text-xs text-text-secondary mt-0.5">
                              {p.description}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* テキスト編集 */}
              {tab === 'text' && (
                <div id="panel-text" role="tabpanel" className="space-y-4">
                  <h3 className="font-semibold text-text">テキスト設定</h3>

                  <div>
                    <label htmlFor="sim-text" className="block text-xs font-medium text-text-secondary mb-1">テキスト</label>
                    <textarea
                      id="sim-text"
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={3}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                      placeholder="テキストを入力..."
                    />
                  </div>

                  <div>
                    <label htmlFor="sim-font" className="block text-xs font-medium text-text-secondary mb-1">フォント</label>
                    <select
                      id="sim-font"
                      value={fontFamily}
                      onChange={(e) => setFontFamily(e.target.value)}
                      className="w-full border border-border rounded-lg px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    >
                      {fontOptions.map((f) => (
                        <option key={f.id} value={f.family}>
                          {f.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="sim-fontsize" className="block text-xs font-medium text-text-secondary mb-1">
                      文字サイズ: {fontSize}px
                    </label>
                    <input
                      id="sim-fontsize"
                      type="range"
                      min={12}
                      max={72}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1">文字色</label>
                    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="文字色">
                      {textColorOptions.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => setTextColor(c.value)}
                          role="radio"
                          aria-checked={textColor === c.value}
                          aria-label={c.name}
                          className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${
                            textColor === c.value ? 'border-primary scale-110' : 'border-border'
                          }`}
                          style={{ backgroundColor: c.value }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 画像アップロード */}
              {tab === 'image' && (
                <div id="panel-image" role="tabpanel" className="space-y-4">
                  <h3 className="font-semibold text-text">画像設定</h3>

                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-border rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors">
                    <span className="text-3xl mb-2" aria-hidden="true">📁</span>
                    <span className="text-sm text-text-secondary">
                      クリックして画像を選択
                    </span>
                    <span className="text-xs text-text-secondary mt-1">
                      JPG / PNG / SVG
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      aria-label="画像ファイルを選択"
                    />
                  </label>

                  {uploadedImage && (
                    <>
                      <div>
                        <label htmlFor="sim-imgscale" className="block text-xs font-medium text-text-secondary mb-1">
                          画像サイズ: {Math.round(imgScale * 100)}%
                        </label>
                        <input
                          id="sim-imgscale"
                          type="range"
                          min={0.2}
                          max={3}
                          step={0.05}
                          value={imgScale}
                          onChange={(e) => setImgScale(Number(e.target.value))}
                          className="w-full accent-primary"
                        />
                      </div>

                      <button
                        onClick={() => {
                          setUploadedImage(null);
                          setImgPos({ x: 0, y: 0 });
                          setImgScale(1);
                        }}
                        className="w-full py-2 rounded-lg border border-danger text-danger text-sm hover:bg-red-50 transition-colors"
                      >
                        🗑️ 画像を削除
                      </button>
                    </>
                  )}
                </div>
              )}

              {/* 背景色 */}
              {tab === 'bg' && (
                <div id="panel-bg" role="tabpanel" className="space-y-4">
                  <h3 className="font-semibold text-text">背景色</h3>
                  <div className="grid grid-cols-4 gap-3" role="radiogroup" aria-label="背景色">
                    {bgColorOptions.map((c) => (
                      <button
                        key={c.value}
                        onClick={() => setBgColor(c.value)}
                        role="radio"
                        aria-checked={bgColor === c.value}
                        aria-label={c.name}
                        className={`aspect-square rounded-lg border-2 transition-transform hover:scale-105 ${
                          bgColor === c.value ? 'border-primary scale-105 ring-2 ring-primary/20' : 'border-border'
                        }`}
                        style={{ backgroundColor: c.value }}
                      />
                    ))}
                  </div>

                  <div>
                    <label htmlFor="sim-custom-color" className="block text-xs font-medium text-text-secondary mb-1">
                      カスタムカラー
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-10 h-10 rounded-lg border border-border cursor-pointer"
                        aria-label="カラーピッカー"
                      />
                      <input
                        id="sim-custom-color"
                        type="text"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="flex-1 border border-border rounded-lg px-3 py-2 text-sm font-mono focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ヒント */}
            <div className="mt-4 bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-xs text-primary font-medium">💡 ヒント</p>
              <p className="text-xs text-text-secondary mt-1">
                このシミュレーターはイメージ確認用です。実際の印刷データは入稿時に調整いたします。
                ダウンロードした画像をお見積もり時に添付いただくとスムーズです。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
