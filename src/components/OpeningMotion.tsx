"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function OpeningMotion() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const alreadyShown = typeof window !== "undefined" && sessionStorage.getItem("opening-shown") === "1";
  const [done, setDone] = useState(alreadyShown);

  useEffect(() => {
    if (alreadyShown) return;
    sessionStorage.setItem("opening-shown", "1");

    const overlay = overlayRef.current;
    const counter = counterRef.current;
    if (!overlay || !counter) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setDone(true);
      },
    });

    // Fade in all elements
    tl.from(".lo-fade", {
      opacity: 0,
      y: 12,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
    }, 0);

    // Counter 000 → 100 (center, big)
    const obj = { val: 0 };
    tl.to(obj, {
      val: 100,
      duration: 1.8,
      ease: "power1.inOut",
      onUpdate: () => {
        counter.textContent = String(Math.floor(obj.val)).padStart(3, "0");
      },
    }, 0);

    // Meter bar fills left to right
    tl.to(".lo-meter-fill", {
      scaleX: 1,
      duration: 1.8,
      ease: "power1.inOut",
    }, 0);

    // Grid blocks fill one by one from bottom
    tl.to(".lo-cell", {
      backgroundColor: "rgba(240, 236, 228, 0.9)",
      stagger: {
        each: 0.08,
        from: "end",
      },
      duration: 0.15,
      ease: "power1.in",
    }, 0.1);

    // Status text update
    tl.call(() => {
      const el = document.querySelector(".lo-status-text");
      if (el) el.textContent = "CONNECTED";
    }, [], 1.5);

    // Hold at 100
    tl.to({}, { duration: 0.25 });

    // Exit — whole overlay slides up
    tl.to(overlay, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    });

    return () => {
      tl.kill();
      document.body.style.overflow = "";
    };
  }, [alreadyShown]);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[10000] bg-[#0c0f14] flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex flex-col items-center gap-6">
        {/* Top label */}
        <div className="lo-fade font-[family-name:var(--font-dm-mono)] text-[0.6rem] tracking-[0.3em] uppercase text-[var(--text-tertiary)]">
          ESTABLISHING CONNECTION
        </div>

        {/* Name */}
        <div className="lo-fade font-[family-name:var(--font-dm-mono)] text-[clamp(1.2rem,3vw,1.8rem)] font-medium tracking-[0.2em] text-[var(--text-primary)]">
          KOYA_TANI
        </div>

        {/* Big counter — centered */}
        <div className="lo-fade">
          <span
            ref={counterRef}
            className="font-[family-name:var(--font-dm-mono)] text-[clamp(5rem,15vw,10rem)] font-light leading-none tracking-[-0.04em] text-[var(--text-primary)]"
          >
            000
          </span>
        </div>

        {/* Meter bar */}
        <div className="lo-fade w-[min(360px,70vw)] h-[2px] bg-[var(--border)] relative overflow-hidden">
          <div className="lo-meter-fill absolute inset-0 bg-[var(--accent)] origin-left scale-x-0" />
        </div>

        {/* Grid blocks — visual loading indicator */}
        <div className="lo-fade flex gap-[3px]">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="lo-cell w-[20px] h-[28px] border border-[rgba(240,236,228,0.12)] bg-transparent transition-colors"
            />
          ))}
        </div>

        {/* Bottom status */}
        <div className="lo-fade flex items-center gap-3">
          <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] animate-pulse" />
          <span className="lo-status-text font-[family-name:var(--font-dm-mono)] text-[0.6rem] tracking-[0.2em] uppercase text-[var(--text-tertiary)]">
            LOADING ASSETS
          </span>
        </div>
      </div>
    </div>
  );
}
