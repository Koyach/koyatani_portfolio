const PROJECTS = [
  {
    id: "mirakoe",
    tag: "Student Organization",
    title: "ミラコエ",
    subtitle: "ミライを創るコエ",
    role: "代表（2024年9月〜現在）",
    description:
      "若者の主体的な政治参加を促す学生団体。設立時4名から55名へ成長させ、超党派の国会議員5名を招いた大規模イベントを実現。",
    stats: [
      { value: "271", label: "ミライ選挙 参加者" },
      { value: "55", label: "メンバー数" },
      { value: "70万+", label: "Instagram 閲覧数" },
      { value: "21", label: "協賛団体" },
    ],
    highlights: [
      "ミライ選挙 — 超党派の国会議員5名を招聘、参加者満足度 8.45/10、再参加意向 97%",
      "ぽりふぇす — Red Bull協賛、子育て世帯200名動員",
      "出前授業「つくろう。未来。」— 選挙管理委員会からの依頼による主権者教育",
      "SNS — TikTok街頭インタビュー、X上で泉健太議員・青山繁晴議員との公開ディスカッション",
    ],
  },
  {
    id: "bedrock",
    tag: "Startup",
    title: "Bedrock Space",
    subtitle: "",
    role: "共同創業・Chief of Staff（2026年2月〜現在）",
    description:
      "共同創業メンバーとして参画。CoS（Chief of Staff）として事業運営を推進中。",
    stats: [],
    highlights: [],
  },
  {
    id: "noto",
    tag: "Past Project",
    title: "能登・輪島塗事業",
    subtitle: "",
    role: "2025年〜2026年初頭",
    description:
      "石川県能登半島の伝統工芸（輪島塗）を現代プロダクトに展開する事業を構想。田谷漆器店とパートナー契約を締結し、3回の現地訪問で事業の種を育てた。法人設立を目指したが実現に至らず、AI領域へピボット。",
    stats: [],
    highlights: [],
    reflection:
      "「起業という言葉に踊らされて視野が狭くなっていた1年だった。ここでの経験が今の判断軸をつくった」",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-padding">
      <div className="mx-auto max-w-[var(--max-content)]">
        <div className="section-label fade-in">Projects</div>

        <div className="space-y-24">
          {PROJECTS.map((project) => (
            <article key={project.id} className="fade-in">
              {/* Header */}
              <div className="mb-8">
                <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--accent)] tracking-wider uppercase">
                  {project.tag}
                </span>
                <h3 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mt-2">
                  {project.title}
                </h3>
                {project.subtitle && (
                  <p className="text-[var(--text-tertiary)] text-[0.9rem] mt-1">
                    {project.subtitle}
                  </p>
                )}
                <p className="font-[family-name:var(--font-dm-mono)] text-[0.8rem] text-[var(--text-secondary)] mt-3">
                  {project.role}
                </p>
              </div>

              {/* Description */}
              <p className="text-[0.95rem] leading-relaxed text-[var(--text-secondary)] max-w-[var(--max-text)] mb-10">
                {project.description}
              </p>

              {/* Stats grid */}
              {project.stats.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10 py-8 border-t border-b border-[var(--border)]">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="stat-number">{stat.value}</div>
                      <div className="stat-label">{stat.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Highlights */}
              {project.highlights.length > 0 && (
                <ul className="space-y-4 max-w-[var(--max-text)]">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex gap-4 text-[0.9rem]">
                      <span className="font-[family-name:var(--font-dm-mono)] text-[0.7rem] text-[var(--text-tertiary)] mt-1 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[var(--text-secondary)]">{h}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Reflection quote */}
              {project.reflection && (
                <blockquote className="mt-10 pl-6 border-l-2 border-[var(--accent)] text-[0.9rem] italic text-[var(--text-secondary)] max-w-[var(--max-text)]">
                  {project.reflection}
                </blockquote>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
