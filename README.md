# 谷昊埜 Portfolio

谷昊埜（Koya Tani）の個人ポートフォリオサイト。https://koyatani.com

## コンセプト — 描いて知る

トップページは白いキャンバス。
訪問者が四角や丸を描き、その中に「実績」「私について」「コンタクト」などの言葉を入れると、
描いた図形がそのままボタンになり、対応する情報がキャンバス上に紙のようにひらく。

「人を知るには、自分から働きかける必要がある」「どんな問いを持つかで、見えてくる人物像が変わる」。
この思想を説明文ではなく操作そのもので伝える。

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + `globals.css`（紙×墨のデザイントークン）
- **Hosting**: Vercel（`main` への push で自動デプロイ、ブランチは Preview）
- **i18n**: 日本語 / English（クライアントサイド切替、`src/lib/translations.ts`）
- **DB / Mail**: Prisma + Neon（問い合わせ・アクセス解析・ステータス）、Resend（問い合わせ通知）

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Design tokens + キャンバス UI のスタイル
│   ├── layout.tsx               # Root layout, fonts (Noto Sans JP / DM Mono / Klee One), LanguageProvider
│   ├── page.tsx                 # トップ = <Atelier />（ブログ一覧を渡す）
│   ├── blog/ projects/ cv/ bookshelf/   # サブページ（従来どおり）
│   ├── admin/                   # 管理画面（NextAuth）
│   └── api/                     # contact / analytics / status / visitors / chat / github
├── components/
│   ├── atelier/
│   │   ├── Atelier.tsx          # キャンバス本体：描画・図形判定・ラベル・パネル・履歴・保存
│   │   ├── InkLayer.tsx         # SVG の線（描いた線・図形・接続線・パネルへの糸）
│   │   ├── ShapeOverlay.tsx     # 図形内の HTML：言葉のボタン / 入力欄 / 近い項目の提案
│   │   ├── Panel.tsx            # ひらく紙：ドラッグ・折りたたみ・閉じる・スクロール
│   │   ├── ConnectionNote.tsx   # 2 図形を結んだときの関係文
│   │   ├── Toolbar.tsx Corners.tsx Onboarding.tsx
│   │   └── panels/TopicContent.tsx  # 各項目の中身（translations / projects / blog から描画）
│   ├── CommandPalette.tsx       # ⌘K：キャンバス項目・ページへのジャンプ
│   └── PageTracker.tsx
├── lib/
│   ├── atelier/
│   │   ├── geometry.ts          # 閉じ判定・結合・多角形内判定・生成図形
│   │   ├── topics.ts            # 言葉 → 項目の対応（日英・ひらがな・ローマ字の揺れ）
│   │   ├── relations.ts         # 2 項目の関係文（既存コンテンツの言い換えのみ）
│   │   ├── handwriting.ts       # Web Handwriting Recognition API の機能検出（外部 API なし）
│   │   ├── storage.ts           # localStorage への保存・復元（フォーム入力は含まない）
│   │   └── export.ts            # キャンバスを PNG に書き出す
│   ├── translations.ts          # 全テキスト（ja / en）
│   ├── blog.ts prisma.ts auth.ts LanguageContext.tsx
└── data/projects.ts books.ts
```

## キャンバスの仕様（要点）

- **描画**: Pointer Events（マウス・タッチ・ペン）。2 本指でパン／ピンチ、ホイールでパン、Ctrl+ホイールでズーム、Space+ドラッグでパン
- **図形判定**: 始点と終点の距離・周長・面積で「囲み」を判定。途切れた線は直前の線と端点を結合して再判定（最大 4 本）
- **言葉**: 図形内をタップ → 入力欄。Enter/決定で確定。対応語がなければ言葉を残したまま近い項目を 3 つ提案
- **手書き認識**: ブラウザが `navigator.createHandwritingRecognizer` を持つ場合のみ使用し、結果は修正可能。無い場合は「書いた言葉を入力」へ誘導（偽の認識結果は返さない）
- **パネル**: 図形の右 → 左 → 下の順に空きを探して配置。ドラッグ／矢印キーで移動、折りたたみ、閉じる→図形を押して再表示
- **関係線**: 項目の付いた 2 図形を線で結ぶと `relations.ts` の文を表示。未定義の組は「まだ言葉になっていません」
- **一覧 / 連絡先 / ⌘K / `/?open=<topic>`**: 描かずに開く経路。点線の生成図形として置かれる
- **保存**: 線・図形・ラベル・パネル位置・表示位置を localStorage に保存（キー `koyatani.atelier.v1`）。「最初から」で消去
- **アクセシビリティ**: 言葉は `<button aria-expanded>`、パネルは `<section aria-labelledby>`、操作結果は `aria-live` で読み上げ。`prefers-reduced-motion` でデモ・展開アニメーションを静止

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build (prisma generate → next build)
npm run lint       # ESLint
```

## Rules

- 実績ファイルに書かれていない情報を捏造しない
- テキスト追加時は `translations.ts` の ja / en 両方を更新
- コンポーネントは `useLanguage()` hook で翻訳を取得
- 画像は `next/image` で最適化
- アクセシビリティ: `aria-label`, `aria-hidden`, `prefers-reduced-motion` を遵守
- モバイルファースト: タッチターゲット 44px 以上、safe-area-inset
