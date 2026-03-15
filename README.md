# 谷昊埜 Portfolio

谷昊埜（Koya Tani）の個人ポートフォリオサイト。

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Hosting**: Vercel
- **i18n**: 日本語 / English（クライアントサイド切替）

## Design

- **Tone**: Editorial / Documentary / Bold Data
- **Color**: ダークベース（濃紺）+ 漆inspired朱アクセント
- **Typography**: Noto Sans JP / DM Mono / Space Grotesk
- **Motion**: IntersectionObserver による scroll-triggered fade-in（`prefers-reduced-motion` 対応）

## Project Structure

```
src/
├── app/
│   ├── globals.css          # Design system (colors, typography, motion)
│   ├── layout.tsx           # Root layout + LanguageProvider
│   ├── page.tsx             # Main page (all sections)
│   └── icon.jpg             # Favicon
├── components/
│   ├── Header.tsx           # Fixed header + mobile menu + language toggle
│   ├── Hero.tsx             # Full-screen hero with background photo
│   ├── About.tsx            # Bio, principles, international experience
│   ├── Projects.tsx         # Mirakoe, Bedrock Space, Noto
│   ├── Achievements.tsx     # Awards timeline + affiliations
│   ├── Media.tsx            # TV, press, speaking appearances
│   ├── Skiing.tsx           # Competition results + photo
│   ├── Contact.tsx          # SNS links + Google Calendar scheduling
│   ├── Footer.tsx           # Copyright
│   └── ScrollReveal.tsx     # IntersectionObserver for fade-in
└── lib/
    ├── translations.ts      # All content in ja/en
    └── LanguageContext.tsx   # React Context for language switching
```

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
npm run lint       # ESLint
```

## i18n

全テキストは `src/lib/translations.ts` に集約。
ヘッダーの `EN` / `JA` ボタンでクライアントサイドで言語切替。
新しいテキストを追加する場合は translations.ts の ja / en 両方に追記すること。

## Images

写真は `public/images/` に配置。コンポーネント内で `next/image` の `Image` で参照。

| File | Usage |
|------|-------|
| `profile.JPG` | Hero background |
| `political_photo.jpg` | About section |
| `IMG_4898.jpg` | Kenya (international experience) |
| `miraisenkyo_photo.jpg` | Mirakoe project |
| `class_miracoe.jpg` | Mirakoe team |
| `skiing.jpg` | Skiing section |
| `IMG_3781.JPG` | Contact section |
| `favicon.JPG` / `og.JPG` | Favicon / OGP |

## Deployment

Vercel に接続済み。`main` ブランチへの push で自動デプロイ。

```bash
vercel --prod      # Manual deploy
```

## Rules

- 実績ファイルに書かれていない情報を捏造しない
- テキスト追加時は `translations.ts` の ja / en 両方を更新
- コンポーネントは `useLanguage()` hook で翻訳を取得
- 画像は `next/image` + `fill` + explicit `sizes` で最適化
- アクセシビリティ: `aria-label`, `aria-hidden`, `prefers-reduced-motion` を遵守
- モバイルファースト: タッチターゲット 44px 以上、`100svh`、safe-area-inset
