# 谷昊埜 Portfolio

谷昊埜（Koya Tani）の個人ポートフォリオサイト。https://koyatani.com

## コンセプト — 描いて知る

トップページは白いキャンバス。
訪問者が「実績」「私について」「コンタクト」などの言葉を紙に書くと、
その手書きが読み取られ、書いた線がそのままボタンになり、対応する情報がキャンバス上に紙のようにひらく。
四角や丸を描いて中に入力する経路も残してある。

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
│   └── api/                     # handwriting / contact / analytics / status / visitors / chat / github
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
│   │   ├── handwriting.ts       # 手書き読み取り（ブラウザ標準 → /api/handwriting の順に試す）
│   │   ├── storage.ts           # localStorage への保存・復元（フォーム入力は含まない）
│   │   └── export.ts            # キャンバスを PNG に書き出す
│   ├── translations.ts          # 全テキスト（ja / en）
│   ├── blog.ts prisma.ts auth.ts LanguageContext.tsx
└── data/projects.ts questions.ts timeline.ts now.ts philosophy.ts books.ts   # 本人の言葉・年表・いま・行動原理の由来・本棚
```

## キャンバスの仕様（要点）

- **描画**: Pointer Events（マウス・タッチ・ペン）。2 本指でパン／ピンチ、ホイールでパン、Ctrl+ホイールでズーム、Space+ドラッグでパン
- **手書き → 語**: 何もない紙に描いた線は「書いている語」として近くの線とまとまる（横 `glyph×1.2`、縦 `glyph×0.6`、直近 5 秒）。ペンが止まって 0.85 秒後に読み取り、線そのものがボタンになる
- **読み取りの当て方**: 候補を上から順に `resolveWord` にかけ、最初に項目へ当たったものを採用する（1 文字外しても着地する）。どれも当たらなければ候補をその場に並べ、読めなければ入力へ誘導する。読み取った語には「直す」が常に付く
- **図形判定**: 1 本で閉じた線は囲み。2〜4 本で閉じた場合は、書きかけの語をあとから囲みに昇格させる（`tryCloseMark`）。書いている語の隣の閉じた線は文字（口・回 など）として扱う
- **言葉**: 囲みの中をタップ → 入力欄。Enter/決定で確定。「問い」（`data/questions.ts`）に一致する言葉はその答えを開き、対応語がなければ言葉を残したまま近い項目を 3 つ提案
- **項目**: 私について / 実績 / 思想 / コンタクト / スキー / メディア / 受賞・所属 / 文章 / 問い / 本棚（`lib/atelier/topics.ts`）
- **パネル**: 図形の右 → 左 → 下の順に空きを探して配置。ドラッグ／矢印キーで移動、折りたたみ、閉じる→図形を押して再表示
- **関係線**: 項目の付いた 2 図形を線で結ぶと `relations.ts` の文を表示。未定義の組は「まだ言葉になっていません」
- **一覧 / 連絡先 / ⌘K / `/?open=<topic>`**: 描かずに開く経路。点線の生成図形として置かれる
- **保存**: 線・図形・ラベル・パネル位置・表示位置を localStorage に保存（キー `koyatani.atelier.v2`）。「最初から」で消去。**操作の作り方を変えたらキーを上げる** — 上げないと再訪者は前回のキャンバスが復元されて新しい体験に出会えない（`lib/atelier/storage.ts`）
- **アクセシビリティ**: 言葉は `<button aria-expanded>`、パネルは `<section aria-labelledby>`、操作結果は `aria-live` で読み上げ。`prefers-reduced-motion` でデモ・展開アニメーションを静止

## 手書き認識の依存（重要）

`/api/handwriting` は、書いた線の座標を **Google の手書き入力エンドポイント**
（`inputtools.google.com/request?itc=ja-t-i0-handwrit`、Google 翻訳の手書きパッドと同じもの）へ中継している。

- API キー・アカウントは不要。CORS が無いのでサーバ経由で中継している
- **非公式・無保証**。予告なく変わる・消える可能性がある。失敗時は候補ゼロを返し、必ず入力へ落ちる（偽の認識結果は出さない）
- 送るのは線の座標だけ。Cookie も識別子も送らない。**入力した文字は送らない**
- この事実は「使い方」パネルに明記している（`helpPrivacy`）
- ブラウザが `navigator.createHandwritingRecognizer` を持つ場合は、そちらを先に使う（端末内で完結）

止めたい場合は `src/lib/atelier/handwriting.ts` の `recognizeViaRelay` を無効にすれば、
ブラウザ標準のみ（＝ほぼ全端末で入力にフォールバック）になる。

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
