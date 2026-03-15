export default function About() {
  const principles = [
    "アイデアの源泉は現場にある",
    "長期的リターンを見据えた誠実さ",
    "仲間・チームで動くリーダーシップ",
    "行動が先、信念が後",
  ];

  const international = [
    "ケニア — 小学生への日本文化授業",
    "インドネシア — 語学研修（2025年）",
    "アメリカ — ホームステイ受入家庭で育つ",
    "ベトナム・シンガポール — 渡航経験",
  ];

  return (
    <section id="about" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">About</div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[var(--space-lg)]">
          {/* Left — intro text */}
          <div className="lg:col-span-7 fade-in fade-in-delay-1">
            <h2 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(1.8rem,4vw,2.8rem)] font-semibold leading-tight mb-8">
              19歳。京都から慶應SFCへ。
              <br />
              <span className="text-[var(--text-secondary)]">
                対話と行動で社会を動かす。
              </span>
            </h2>

            <div className="space-y-5 text-[0.95rem] leading-relaxed text-[var(--text-secondary)] max-w-[var(--max-text)]">
              <p>
                同志社高等学校から慶應義塾大学SFCへ。学生団体ミラコエの代表として55名の組織を率い、
                超党派の国会議員を招いた271名規模のイベントを実現。
              </p>
              <p>
                母親が選択的夫婦別姓訴訟の原告という家庭で、「声を上げなければ社会は変わらない」という
                信念とともに育った。メキシコ出身の方との同居経験や、南アフリカ人の友人家族との交流など、
                多文化的な環境が現在の活動の原点。
              </p>
              <p>
                フリースタイルスキーではジュニアワールドツアー2位の実績を持ち、
                競技で培った「まず飛ぶ。考えるのはその後」という姿勢が、すべての活動に通底している。
              </p>
            </div>
          </div>

          {/* Right — principles & international */}
          <div className="lg:col-span-5 space-y-10">
            <div className="fade-in fade-in-delay-2">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                行動原理
              </h3>
              <ul className="space-y-3">
                {principles.map((p, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--accent)] mt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.9rem] text-[var(--text-secondary)]">
                      {p}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-in fade-in-delay-3">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                海外経験
              </h3>
              <ul className="space-y-3">
                {international.map((item, i) => (
                  <li
                    key={i}
                    className="text-[0.85rem] text-[var(--text-secondary)] pl-4 border-l border-[var(--border)]"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="fade-in fade-in-delay-4">
              <h3 className="text-[0.7rem] font-medium tracking-[0.2em] uppercase text-[var(--text-tertiary)] mb-5">
                学業
              </h3>
              <p className="text-[0.85rem] text-[var(--text-secondary)]">
                慶應SFC 総合政策学部（2025年4月入学）
                <br />
                清水先生の日本政治外交研究（JPD）所属
                <br />
                中室牧子研究会（教育経済学）聴講
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
