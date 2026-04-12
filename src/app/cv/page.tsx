"use client";

import { useEffect } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import Link from "next/link";

export default function CVPage() {
  const { t, locale } = useLanguage();

  useEffect(() => {
    // Auto-trigger print dialog after brief delay
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        @media print {
          body { background: white !important; color: black !important; }
          body::before { display: none !important; }
          .no-print { display: none !important; }
          .cv-page { padding: 0 !important; }
          @page { margin: 1.5cm; size: A4; }
        }
      `}</style>

      <div className="cv-page min-h-screen bg-white text-black p-8 md:p-16 max-w-[800px] mx-auto">
        {/* Back button (hidden in print) */}
        <div className="no-print mb-8 flex items-center justify-between">
          <Link href="/" className="text-sm text-blue-600 hover:underline">
            &larr; Back to site
          </Link>
          <button
            onClick={() => window.print()}
            className="px-4 py-2 bg-black text-white text-sm rounded-lg hover:bg-gray-800"
          >
            {locale === "ja" ? "PDFとして保存" : "Save as PDF"}
          </button>
        </div>

        {/* Header */}
        <header className="border-b-2 border-black pb-4 mb-6">
          <h1 className="text-3xl font-bold">{t.hero.name}</h1>
          <p className="text-lg text-gray-600 mt-1">{t.hero.nameEn}</p>
          <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
            <span>koyatani.com</span>
            <span>@koyach777</span>
            <span>Keio SFC</span>
          </div>
        </header>

        {/* About */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {locale === "ja" ? "概要" : "Summary"}
          </h2>
          <p className="text-sm leading-relaxed">{t.about.bio1}</p>
        </section>

        {/* Education */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {locale === "ja" ? "学歴" : "Education"}
          </h2>
          <div className="text-sm space-y-3">
            <div>
              <p className="font-medium">{t.about.academics1}</p>
              <p className="text-gray-600">{t.about.academics2}</p>
            </div>
            <div>
              <p className="font-medium">
                {locale === "ja" ? "同志社高等学校（2022年4月〜2025年3月）" : "Doshisha Senior High School (Apr 2022 – Mar 2025)"}
              </p>
              <p className="text-gray-600">
                {locale === "ja"
                  ? "岩倉祭 総監督（高1）・分団長（高3）/ JOFキャンプリーダーボランティア / 吉本新喜劇 主演（高2）"
                  : "Iwakura Festival Director (Y1) & Division Leader (Y3) / JOF Camp Leader Volunteer"}
              </p>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {locale === "ja" ? "プロジェクト" : "Projects"}
          </h2>
          <div className="space-y-4 text-sm">
            <div>
              <div className="flex justify-between">
                <p className="font-medium">{t.projects.mirakoe.title} - {t.projects.mirakoe.subtitle}</p>
                <p className="text-gray-500 shrink-0">{t.projects.mirakoe.role}</p>
              </div>
              <p className="text-gray-600 mt-1">{t.projects.mirakoe.description}</p>
            </div>
            <div>
              <div className="flex justify-between">
                <p className="font-medium">{t.projects.bedrock.title}</p>
                <p className="text-gray-500 shrink-0">{t.projects.bedrock.role}</p>
              </div>
              <p className="text-gray-600 mt-1">{t.projects.bedrock.description}</p>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {locale === "ja" ? "受賞・実績" : "Achievements"}
          </h2>
          <div className="space-y-1.5 text-sm">
            {t.achievements.items.map((item, i) => (
              <div key={i} className="flex gap-3">
                <span className="text-gray-400 shrink-0 w-16 font-mono text-xs mt-0.5">{item.year}</span>
                <div>
                  <span className="font-medium">{item.title}</span>
                  <span className="text-gray-500"> - {item.detail}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skiing */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {locale === "ja" ? "競技スキー" : "Competitive Skiing"}
          </h2>
          <div className="space-y-1 text-sm">
            {t.skiing.results.map((r, i) => (
              <div key={i} className="flex justify-between">
                <span>{r.event}</span>
                <span className={r.highlight ? "font-medium" : "text-gray-500"}>{r.result}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Media */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {t.media.heading}
          </h2>
          <div className="text-sm space-y-2">
            {t.media.categories.map((cat) => (
              <div key={cat.category}>
                <p className="font-medium text-gray-700">{cat.category}</p>
                {cat.items.map((item, i) => (
                  <p key={i} className="text-gray-600 ml-4">
                    {item.title} - {item.detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* International */}
        <section className="mb-6">
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {t.about.internationalLabel}
          </h2>
          <ul className="text-sm space-y-0.5 text-gray-600">
            {t.about.international.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </section>

        {/* Affiliations */}
        <section>
          <h2 className="text-lg font-bold border-b border-gray-300 pb-1 mb-3">
            {t.achievements.affiliationsLabel}
          </h2>
          <p className="text-sm text-gray-600">
            {t.achievements.affiliations.join(" / ")}
          </p>
        </section>
      </div>
    </>
  );
}
