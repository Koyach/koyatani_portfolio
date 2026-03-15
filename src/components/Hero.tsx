export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-end pb-[var(--space-xl)] px-[var(--space-md)]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] via-[var(--bg-primary)] to-[var(--bg-primary)]" />

      {/* Subtle accent glow */}
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--accent-glow)] blur-[120px] pointer-events-none" />

      <div className="relative mx-auto w-full max-w-[var(--max-content)]">
        {/* Name — big editorial type */}
        <div className="mb-8">
          <p className="text-[0.7rem] font-medium tracking-[0.25em] uppercase text-[var(--accent)] mb-6">
            Portfolio 2026
          </p>
          <h1 className="font-[family-name:var(--font-space-grotesk)] text-[clamp(3rem,10vw,8rem)] font-bold leading-[0.9] tracking-tight">
            谷昊埜
          </h1>
          <p className="font-[family-name:var(--font-dm-mono)] text-[clamp(0.9rem,2vw,1.2rem)] text-[var(--text-secondary)] mt-4 tracking-wider">
            Koya Tani
          </p>
        </div>

        {/* Tagline & scroll hint */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <p className="max-w-[440px] text-[0.95rem] leading-relaxed text-[var(--text-secondary)]">
            人は互いを完全には理解できない。
            <br />
            だからこそ対話で社会を作る。
          </p>

          <div className="flex items-center gap-3 text-[var(--text-tertiary)]">
            <div className="w-[1px] h-12 bg-[var(--text-tertiary)] animate-pulse" />
            <span className="text-[0.65rem] tracking-[0.2em] uppercase">
              Scroll
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
