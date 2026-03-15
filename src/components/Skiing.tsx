import Image from "next/image";

const RESULTS = [
  {
    event: "ジュニアワールドツアー（フリースタイル）",
    result: "2位",
    highlight: true,
  },
  {
    event: "全日本選手権（フリースタイル）",
    result: "15位",
    highlight: false,
  },
  {
    event: "近畿大会（アルペン / 2025年）",
    result: "男子団体初優勝",
    highlight: true,
  },
  {
    event: "京都府スキー選手権（アルペン）",
    result: "3位（2年連続）",
    highlight: false,
  },
  {
    event: "全国高等学校総体（インターハイ）",
    result: "出場（同志社34年ぶり）",
    highlight: true,
  },
];

const EXTRAS = [
  "さっぽろ雪まつり — ゲストパフォーマーとして出演",
  "石川能登チャリティーイベント参加",
  "Instagramフリースタイル動画 累計30万回以上再生",
];

export default function Skiing() {
  return (
    <section id="skiing" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">Skiing</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)]">
          {/* Left — overview + photo */}
          <div className="lg:col-span-5 fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,3rem)] font-bold leading-tight mb-6">
              フリースタイル
              <span className="text-[var(--text-tertiary)]"> &times; </span>
              アルペン
            </h2>
            <p className="text-[0.95rem] text-[var(--text-secondary)] leading-relaxed mb-8">
              フリースタイル・アルペンの二刀流で活動。大学1年次からはフリースタイルスキーをアート活動として継続し、
              自由に自分らしく生きることを体現している。
            </p>

            {/* Skiing photo */}
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <Image
                src="/images/skiing.jpg"
                alt="谷昊埜 — フリースタイルスキーのエアトリック"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 40vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right — results */}
          <div className="lg:col-span-7">
            <div className="fade-in fade-in-delay-2">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-6">
                競技成績
              </h3>

              <div className="space-y-0">
                {RESULTS.map((r, i) => (
                  <div
                    key={i}
                    className="flex flex-col sm:flex-row sm:items-baseline justify-between py-5 border-b border-[var(--border)] gap-1 sm:gap-4"
                  >
                    <span className="text-[0.9rem] text-[var(--text-secondary)]">
                      {r.event}
                    </span>
                    <span
                      className={`font-[family-name:var(--font-dm-mono)] text-[0.85rem] shrink-0 ${
                        r.highlight
                          ? "text-[var(--accent)] font-medium"
                          : "text-[var(--text-secondary)]"
                      }`}
                    >
                      {r.result}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10 fade-in fade-in-delay-3">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                その他
              </h3>
              <ul className="space-y-3">
                {EXTRAS.map((e, i) => (
                  <li
                    key={i}
                    className="text-[0.85rem] text-[var(--text-secondary)] pl-4 border-l border-[var(--border)]"
                  >
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
