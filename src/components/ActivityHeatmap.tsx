"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

type DayData = { date: string; count: number };

const CELL_SIZE = 11;
const CELL_GAP = 2;
const TOTAL = CELL_SIZE + CELL_GAP;

const COLORS = [
  "var(--snow-dim)",        // 0: empty
  "rgba(201, 74, 46, 0.3)", // 1: low
  "rgba(201, 74, 46, 0.5)", // 2: medium
  "rgba(201, 74, 46, 0.7)", // 3: high
  "rgba(201, 74, 46, 1.0)", // 4: max
];

function getLevel(count: number, max: number): number {
  if (count === 0) return 0;
  if (max <= 1) return 4;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

const MONTH_LABELS_JA = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
const MONTH_LABELS_EN = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function ActivityHeatmap() {
  const { locale } = useLanguage();
  const [data, setData] = useState<{ totalContributions: number; days: DayData[] } | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  if (!data || data.days.length === 0) return null;

  const monthLabels = locale === "ja" ? MONTH_LABELS_JA : MONTH_LABELS_EN;
  const maxCount = Math.max(...data.days.map((d) => d.count), 1);

  // Group days into weeks (columns)
  const weeks: DayData[][] = [];
  let currentWeek: DayData[] = [];
  for (const day of data.days) {
    const dow = new Date(day.date).getDay();
    if (dow === 0 && currentWeek.length > 0) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
    currentWeek.push(day);
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);

  const svgWidth = weeks.length * TOTAL + 30;
  const svgHeight = 7 * TOTAL + 20;

  // Calculate month label positions
  const monthPositions: { label: string; x: number }[] = [];
  let lastMonth = -1;
  for (let wi = 0; wi < weeks.length; wi++) {
    const firstDay = weeks[wi][0];
    const month = new Date(firstDay.date).getMonth();
    if (month !== lastMonth) {
      monthPositions.push({ label: monthLabels[month], x: wi * TOTAL + 30 });
      lastMonth = month;
    }
  }

  return (
    <section className="section-padding" id="activity">
      <div className="max-w-[var(--max-content)] mx-auto">
        <p className="section-label fade-in">
          {locale === "ja" ? "Activity" : "Activity"}
        </p>
        <div className="flex items-baseline gap-4 mb-6 fade-in">
          <h2
            className="text-2xl md:text-3xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            {locale === "ja"
              ? `${data.totalContributions} contributions`
              : `${data.totalContributions} contributions`}
          </h2>
          <span className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            {locale === "ja" ? "過去1年間" : "in the last year"}
          </span>
        </div>

        <div
          className="fade-in overflow-x-auto pb-2"
          style={{ position: "relative" }}
        >
          <svg
            width={svgWidth}
            height={svgHeight}
            role="img"
            aria-label={`GitHub activity: ${data.totalContributions} contributions in the last year`}
          >
            {/* Month labels */}
            {monthPositions.map((m, i) => (
              <text
                key={i}
                x={m.x}
                y={10}
                fontSize="10"
                fill="var(--text-tertiary)"
                fontFamily="var(--font-mono)"
              >
                {m.label}
              </text>
            ))}

            {/* Cells */}
            {weeks.map((week, wi) =>
              week.map((day) => {
                const dow = new Date(day.date).getDay();
                const x = wi * TOTAL + 30;
                const y = dow * TOTAL + 16;
                const level = getLevel(day.count, maxCount);
                return (
                  <rect
                    key={day.date}
                    x={x}
                    y={y}
                    width={CELL_SIZE}
                    height={CELL_SIZE}
                    rx={2}
                    fill={COLORS[level]}
                    onMouseEnter={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const parent = e.currentTarget.closest("div")?.getBoundingClientRect();
                      setTooltip({
                        x: rect.left - (parent?.left || 0) + CELL_SIZE / 2,
                        y: rect.top - (parent?.top || 0) - 8,
                        text: `${day.date}: ${day.count} contribution${day.count !== 1 ? "s" : ""}`,
                      });
                    }}
                    onMouseLeave={() => setTooltip(null)}
                    style={{ cursor: "pointer" }}
                  />
                );
              })
            )}
          </svg>

          {/* Tooltip */}
          {tooltip && (
            <div
              style={{
                position: "absolute",
                left: tooltip.x,
                top: tooltip.y,
                transform: "translate(-50%, -100%)",
                background: "var(--bg-tertiary)",
                color: "var(--text-primary)",
                padding: "4px 8px",
                borderRadius: "6px",
                fontSize: "11px",
                whiteSpace: "nowrap",
                pointerEvents: "none",
                border: "1px solid var(--border)",
              }}
            >
              {tooltip.text}
            </div>
          )}

          {/* Legend */}
          <div className="flex items-center gap-1.5 mt-3 justify-end">
            <span
              className="text-xs mr-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              Less
            </span>
            {COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                  borderRadius: 2,
                  background: color,
                }}
              />
            ))}
            <span
              className="text-xs ml-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              More
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
