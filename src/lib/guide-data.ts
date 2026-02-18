// ガイドコンテンツデータ

export interface StepInfo {
  number: number;
  title: string;
  description: string;
  icon: string;
  details: string[];
}

export const submissionSteps: StepInfo[] = [
  {
    number: 1,
    title: 'データ準備',
    description: 'デザインデータを作成・整理します',
    icon: '📐',
    details: [
      '対応形式（AI / PSD / PDF / PNG）でデータを作成',
      'テンプレートを使うと安心・確実',
      '解像度は300〜350dpi（実寸）を推奨',
      'カラーモードはCMYKを推奨（RGBも対応可）',
    ],
  },
  {
    number: 2,
    title: 'データ確認',
    description: '入稿前にセルフチェックを行います',
    icon: '✅',
    details: [
      '塗り足し（3mm以上）の確認',
      'フォントのアウトライン化',
      '画像の埋め込み（リンク切れ防止）',
      'カラーモード・解像度の最終確認',
    ],
  },
  {
    number: 3,
    title: '入稿',
    description: 'データをアップロードまたはメールで送付',
    icon: '📤',
    details: [
      'Web入稿フォームからアップロード（推奨）',
      'メール添付（10MB以下）',
      '大容量ファイルはファイル転送サービスをご利用ください',
      '入稿後、受付確認メールをお送りします',
    ],
  },
  {
    number: 4,
    title: '校正・確認',
    description: '仕上がりイメージを確認し、印刷開始',
    icon: '🖨️',
    details: [
      '校正PDFをメールでお送りします（1〜2営業日）',
      'レイアウト・色味・文字をご確認ください',
      '修正がある場合は再入稿→再校正',
      '校了後、印刷・製造を開始します',
    ],
  },
];

export interface FileFormatInfo {
  format: string;
  extension: string;
  recommended: boolean;
  colorMode: string;
  resolution: string;
  notes: string;
}

export const fileFormats: FileFormatInfo[] = [
  {
    format: 'Adobe Illustrator',
    extension: '.ai',
    recommended: true,
    colorMode: 'CMYK',
    resolution: 'ベクター（解像度不問）',
    notes: 'フォントはアウトライン化必須。最も推奨のフォーマットです。',
  },
  {
    format: 'Adobe Photoshop',
    extension: '.psd',
    recommended: true,
    colorMode: 'CMYK',
    resolution: '300〜350dpi（実寸）',
    notes: 'レイヤー統合版も併せてご入稿ください。',
  },
  {
    format: 'PDF',
    extension: '.pdf',
    recommended: true,
    colorMode: 'CMYK推奨',
    resolution: '300dpi以上（画像含む場合）',
    notes: 'PDF/X-1a または PDF/X-4 形式を推奨。',
  },
  {
    format: 'PNG',
    extension: '.png',
    recommended: false,
    colorMode: 'RGB（CMYK変換します）',
    resolution: '300dpi以上（実寸）',
    notes: '色味が変わる場合があります。簡易デザイン向け。',
  },
  {
    format: 'JPEG',
    extension: '.jpg / .jpeg',
    recommended: false,
    colorMode: 'RGB（CMYK変換します）',
    resolution: '300dpi以上（実寸）',
    notes: '圧縮による劣化にご注意ください。高画質設定で保存を。',
  },
  {
    format: 'Microsoft Office',
    extension: '.docx / .xlsx / .pptx',
    recommended: false,
    colorMode: 'RGB',
    resolution: '—',
    notes: 'レイアウト崩れの可能性あり。PDF化してからの入稿を推奨。',
  },
];

export interface CommonMistake {
  title: string;
  description: string;
  solution: string;
  icon: string;
}

export const commonMistakes: CommonMistake[] = [
  {
    title: '塗り足しがない',
    description: 'デザインが仕上がりサイズぴったりで、裁断時に白い縁が出てしまう。',
    solution: '仕上がりサイズの外側に3mm以上の塗り足しを設定してください。',
    icon: '🔲',
  },
  {
    title: 'フォントがアウトライン化されていない',
    description: '入稿先の環境にフォントがなく、文字化けや置換が発生。',
    solution: 'Illustratorの場合「書式→アウトラインを作成」でアウトライン化してください。',
    icon: '🔤',
  },
  {
    title: '解像度が低い（72dpi等）',
    description: 'Web用の画像をそのまま使い、印刷するとぼやける。',
    solution: '実寸で300〜350dpiの画像をご用意ください。拡大は劣化の原因になります。',
    icon: '🔍',
  },
  {
    title: 'RGBカラーのまま入稿',
    description: '画面で見た色と印刷の色が大きく異なる（特に蛍光色系）。',
    solution: '入稿前にCMYKモードに変換し、色味を確認してください。',
    icon: '🎨',
  },
  {
    title: 'リンク画像が埋め込まれていない',
    description: 'Illustratorで配置した画像がリンク切れで表示されない。',
    solution: '「ウィンドウ→リンク」パネルから全画像を埋め込み処理してください。',
    icon: '🖼️',
  },
  {
    title: 'ファイルサイズが大きすぎる',
    description: 'メール添付の上限を超えてしまい送信できない。',
    solution: 'ファイル転送サービス（ギガファイル便等）をご利用いただくか、Web入稿をお使いください。',
    icon: '📦',
  },
];

export interface CategoryGuide {
  category: string;
  color: string;
  points: string[];
}

export const categoryGuides: CategoryGuide[] = [
  {
    category: 'カレンダー',
    color: '#2563EB',
    points: [
      '日付・祝日データは弊社で用意可能です（ご指定の年度をお知らせください）',
      '壁掛けタイプは穴位置・綴じ方向にご注意ください',
      '卓上タイプはケース展開図テンプレートをご利用ください',
      '写真カレンダーの場合、画像は350dpi以上推奨',
    ],
  },
  {
    category: 'うちわ・扇子',
    color: '#22C55E',
    points: [
      '型に合わせたデザインが必要です（テンプレート必須）',
      '変形うちわは型代が別途かかる場合があります',
      '扇子は折り目を考慮したデザインが必要です',
      '柄部分への印刷は別途ご相談ください',
    ],
  },
  {
    category: 'アクリルグッズ',
    color: '#8B5CF6',
    points: [
      'カットライン（ダイカットパス）を別レイヤーで作成してください',
      '白押さえデータが必要な場合があります',
      '透明部分と白部分の指定を明確にしてください',
      'キーホルダーの穴位置はテンプレートで指定',
    ],
  },
  {
    category: 'シール＆ステッカー',
    color: '#F97316',
    points: [
      '型抜きの場合はカットラインを別レイヤーで指定',
      '白インク使用の場合は別途データが必要です',
      '透明素材への印刷は白押さえデータをご用意ください',
      'シートステッカーは面付けレイアウトをご確認ください',
    ],
  },
  {
    category: '衛生用品',
    color: '#06B6D4',
    points: [
      'ウェットティッシュのシールサイズはテンプレートをご確認ください',
      'ポケットティッシュは広告面のサイズにご注意ください',
      'マスクの袋印刷は1〜2色が基本です',
      'カイロのパッケージデザインはバリエーション対応可',
    ],
  },
  {
    category: 'タオル・名入れ',
    color: '#EC4899',
    points: [
      'タオルの印刷方法により入稿データが異なります（プリント / 織り / 刺繍）',
      'フルカラープリントは写真データも使用可能です',
      '刺繍の場合は色数制限があります（通常6色まで）',
      '名入れ商品はロゴデータ（AI形式）をご用意ください',
    ],
  },
];

export interface FAQItem {
  question: string;
  answer: string;
}

export const guideFAQs: FAQItem[] = [
  {
    question: 'デザインを自分で作れない場合はどうすればいいですか？',
    answer: 'デザイン制作も承っております。ラフ案や参考イメージをお伝えいただければ、プロのデザイナーがデータを作成いたします。別途デザイン費がかかりますが、お気軽にご相談ください。',
  },
  {
    question: '入稿後にデータの修正はできますか？',
    answer: '校正確認前であれば、データの差し替えが可能です。校了（印刷OK）後の修正は、工程の進行状況によりますので、お早めにご連絡ください。',
  },
  {
    question: 'RGBデータしか用意できません。大丈夫ですか？',
    answer: 'RGBデータでも入稿可能です。弊社にてCMYK変換を行いますが、画面の色味と印刷結果に差が出る場合があります。特に蛍光色や鮮やかなブルー・グリーンは変化が大きいためご了承ください。',
  },
  {
    question: 'テンプレートはどこからダウンロードできますか？',
    answer: 'テンプレートダウンロードページから、商品カテゴリ別のテンプレートをダウンロードいただけます。Illustrator形式（.ai）とPDF形式をご用意しています。',
  },
  {
    question: '対応していないファイル形式はありますか？',
    answer: 'Canvaなどのオンラインツールの独自形式は直接対応しておりません。PDF形式で書き出してからご入稿ください。また、WordやExcelでの入稿はレイアウト崩れの原因となるため、PDF化を推奨しています。',
  },
  {
    question: '入稿データの容量に制限はありますか？',
    answer: 'メール添付の場合は10MBまでとなります。Web入稿は100MBまで対応しています。それ以上の場合はギガファイル便等のファイル転送サービスをご利用ください。',
  },
  {
    question: '色校正（本機校正）はお願いできますか？',
    answer: 'はい、本機校正も承っております。実際の印刷機・用紙で出力するため、より正確な色味を確認できます。別途費用と日数がかかりますので、詳しくはお問い合わせください。',
  },
  {
    question: '納品までどのくらいかかりますか？',
    answer: '商品や数量により異なりますが、校了後おおよそ5〜14営業日が目安です。各商品ページに最短納期を記載していますのでご確認ください。お急ぎの場合は特急対応も可能です（別途費用）。',
  },
];

export interface TemplateItem {
  name: string;
  category: string;
  color: string;
  formats: string[];
  description: string;
}

export const templates: TemplateItem[] = [
  {
    name: 'B3壁掛けカレンダー',
    category: 'カレンダー',
    color: '#2563EB',
    formats: ['AI', 'PDF'],
    description: 'B3サイズ壁掛けカレンダーの入稿用テンプレート（13枚綴り）',
  },
  {
    name: '卓上リングカレンダー',
    category: 'カレンダー',
    color: '#2563EB',
    formats: ['AI', 'PDF'],
    description: '卓上リング式カレンダーのケース展開図＋本体テンプレート',
  },
  {
    name: '紙うちわ（レギュラー）',
    category: 'うちわ・扇子',
    color: '#22C55E',
    formats: ['AI', 'PDF'],
    description: 'レギュラーサイズ紙うちわの両面テンプレート',
  },
  {
    name: 'ポリうちわ',
    category: 'うちわ・扇子',
    color: '#22C55E',
    formats: ['AI', 'PDF'],
    description: 'ポリうちわの入稿テンプレート（骨位置ガイド付き）',
  },
  {
    name: 'アクリルスタンド',
    category: 'アクリルグッズ',
    color: '#8B5CF6',
    formats: ['AI'],
    description: 'アクリルスタンドのデザイン面＋カットラインテンプレート',
  },
  {
    name: 'アクリルキーホルダー',
    category: 'アクリルグッズ',
    color: '#8B5CF6',
    formats: ['AI'],
    description: 'アクリルキーホルダーの各サイズテンプレート（穴位置付き）',
  },
  {
    name: '型抜きステッカー',
    category: 'シール＆ステッカー',
    color: '#F97316',
    formats: ['AI', 'PDF'],
    description: '型抜きステッカーのカットライン作成ガイド付きテンプレート',
  },
  {
    name: 'ポケットティッシュ広告',
    category: '衛生用品',
    color: '#06B6D4',
    formats: ['AI', 'PDF'],
    description: 'ポケットティッシュの広告面テンプレート（各サイズ対応）',
  },
  {
    name: 'フェイスタオル（プリント）',
    category: 'タオル・名入れ',
    color: '#EC4899',
    formats: ['AI'],
    description: 'フルカラープリントタオルの印刷範囲テンプレート',
  },
];

export interface ResolutionGuide {
  use: string;
  minDpi: number;
  recommendedDpi: number;
  notes: string;
}

export const resolutionGuides: ResolutionGuide[] = [
  {
    use: 'チラシ・カレンダー（近距離で見るもの）',
    minDpi: 300,
    recommendedDpi: 350,
    notes: '手に取って見る印刷物は高解像度が必須',
  },
  {
    use: 'ポスター（中距離で見るもの）',
    minDpi: 200,
    recommendedDpi: 300,
    notes: '壁に掛けて見る程度であれば200dpiでも可',
  },
  {
    use: 'タペストリー・大判出力',
    minDpi: 150,
    recommendedDpi: 200,
    notes: '離れて見る大判は低めでもOK',
  },
  {
    use: 'アクリルグッズ・小物',
    minDpi: 300,
    recommendedDpi: 400,
    notes: '小さいサイズほど高解像度が必要',
  },
  {
    use: 'シール・ステッカー',
    minDpi: 300,
    recommendedDpi: 350,
    notes: '細かい文字がある場合は350dpi以上推奨',
  },
];

export interface ColorModeInfo {
  mode: string;
  description: string;
  use: string;
  pros: string[];
  cons: string[];
}

export const colorModes: ColorModeInfo[] = [
  {
    mode: 'CMYK',
    description: 'シアン・マゼンタ・イエロー・ブラックの4色で色を表現する減法混色',
    use: '印刷物全般（推奨）',
    pros: [
      '印刷結果に近い色味で作業できる',
      '色のズレが最小限',
      'プロの印刷データの標準',
    ],
    cons: [
      '蛍光色や鮮やかな色は表現しにくい',
      '画面表示と完全一致はしない',
    ],
  },
  {
    mode: 'RGB',
    description: 'レッド・グリーン・ブルーの3色で色を表現する加法混色',
    use: 'Web・画面表示用（入稿時はCMYK変換推奨）',
    pros: [
      '色域が広く鮮やかな色が表現できる',
      'Webデザインツールの標準',
      '写真データはRGBが一般的',
    ],
    cons: [
      '印刷時にCMYK変換で色がくすむ場合がある',
      '特に青・緑系の鮮やかな色は変化が大きい',
    ],
  },
];
