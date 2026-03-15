const ACHIEVEMENTS = [
  {
    year: "2025.07",
    title: "第5回学生団体サミット 優勝",
    detail: "日本一の学生団体の代表に（賞金20万円）",
    featured: true,
  },
  {
    year: "2025",
    title: "宮古島観光戦略プログラム 最優秀賞",
    detail:
      "リクルート主催。人流データを活用した閑散期の観光客滞在日数増加戦略を提案",
    featured: true,
  },
  {
    year: "2024",
    title: "アプリ甲子園 1次選考通過",
    detail: "京都のゴミ問題をAIで解決するアプリを開発",
    featured: false,
  },
  {
    year: "2024",
    title: "TSG 1次選考通過",
    detail: "高校3年次",
    featured: false,
  },
  {
    year: "2024",
    title: "モノコトイノベーション 5位入賞",
    detail: "高校2年次",
    featured: false,
  },
];

const AFFILIATIONS = [
  "IVSスカラシップ 2期生（2025年7月〜）",
  "慶應ビジネスクラブ（KBC）21期",
  "日本若者協議会",
  "起業義塾部",
  "ゴブリンスキークラブ",
];

export default function Achievements() {
  return (
    <section id="achievements" className="section-padding bg-[var(--bg-secondary)]">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">Achievements</div>

        {/* Timeline */}
        <div className="space-y-0 mb-16">
          {ACHIEVEMENTS.map((a, i) => (
            <div
              key={i}
              className={`fade-in fade-in-delay-${Math.min(i + 1, 4)} grid grid-cols-[80px_1fr] md:grid-cols-[120px_1fr] gap-6 py-8 border-b border-[var(--border)] ${
                a.featured ? "" : "opacity-80"
              }`}
            >
              <span className="font-[family-name:var(--font-dm-mono)] text-[0.8rem] text-[var(--text-tertiary)] pt-1">
                {a.year}
              </span>
              <div>
                <h3
                  className={`font-[family-name:var(--font-space-grotesk)] font-semibold leading-snug ${
                    a.featured
                      ? "text-[clamp(1.1rem,2.5vw,1.5rem)]"
                      : "text-[1rem]"
                  }`}
                >
                  {a.title}
                  {a.featured && (
                    <span className="inline-block ml-3 w-2 h-2 rounded-full bg-[var(--accent)] align-middle" />
                  )}
                </h3>
                <p className="text-[0.85rem] text-[var(--text-secondary)] mt-2">
                  {a.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Affiliations */}
        <div className="fade-in">
          <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-6">
            所属・プログラム
          </h3>
          <div className="flex flex-wrap gap-3">
            {AFFILIATIONS.map((a, i) => (
              <span
                key={i}
                className="text-[0.8rem] text-[var(--text-secondary)] px-4 py-2 border border-[var(--border)] rounded-full"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
