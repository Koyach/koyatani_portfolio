"use client";

import { useEffect } from "react";

export default function ScrollReveal() {
  useEffect(() => {
    // Mark that JS has loaded — without this class, fade-in elements remain visible
    document.documentElement.classList.add("js-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    const elements = document.querySelectorAll(".fade-in");
    for (const el of elements) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return null;
}
