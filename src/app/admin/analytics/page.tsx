"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type LabelCount = { label: string; count: number };

type AnalyticsData = {
  totalPV: number;
  uniqueVisitors: number;
  byPath: { path: string; count: number }[];
  byDay: { date: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
  byDevice: LabelCount[];
  byBrowser: LabelCount[];
  byOS: LabelCount[];
  byHour: { hour: string; count: number }[];
  days: number;
};

const PIE_COLORS = ["#c94a2e", "#e05a3c", "#f09070", "#5e6678", "#9ba3b2", "#3a4050"];

function RankingList({
  title,
  data,
}: {
  title: string;
  data: { label: string; count: number }[];
}) {
  if (data.length === 0) return null;
  const max = data[0].count;
  return (
    <section className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-6">
      <h2 className="text-sm font-medium text-[#9ba3b2] mb-4 uppercase tracking-wider">
        {title}
      </h2>
      <div className="space-y-2">
        {data.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between py-1.5"
          >
            <span className="text-sm text-[#9ba3b2] truncate mr-4">
              {r.label}
            </span>
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-24 h-1.5 bg-[#0c0f14] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#c94a2e] rounded-full"
                  style={{ width: `${(r.count / max) * 100}%` }}
                />
              </div>
              <span className="text-xs text-[#5e6678] w-8 text-right font-mono">
                {r.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function MiniPieChart({
  title,
  data,
}: {
  title: string;
  data: LabelCount[];
}) {
  if (data.length === 0) return null;
  return (
    <section className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-6">
      <h2 className="text-sm font-medium text-[#9ba3b2] mb-4 uppercase tracking-wider">
        {title}
      </h2>
      <div className="flex items-center gap-4">
        <div className="w-32 h-32 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="count"
                nameKey="label"
                cx="50%"
                cy="50%"
                outerRadius={55}
                innerRadius={30}
                strokeWidth={0}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "#1a1f2e",
                  border: "1px solid rgba(240,236,228,0.1)",
                  borderRadius: "8px",
                  color: "#f0ece4",
                  fontSize: "13px",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex-1 space-y-1.5">
          {data.map((d, i) => (
            <div key={d.label} className="flex items-center gap-2 text-sm">
              <span
                className="w-2.5 h-2.5 rounded-full shrink-0"
                style={{ background: PIE_COLORS[i % PIE_COLORS.length] }}
              />
              <span className="text-[#9ba3b2] truncate">{d.label}</span>
              <span className="text-[#5e6678] font-mono ml-auto">{d.count}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState(30);
  const [fetchKey, setFetchKey] = useState(0);

  function changeDays(newDays: number) {
    setDays(newDays);
    setData(null);
    setFetchKey((k) => k + 1);
  }

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/analytics?days=${days}`, { signal: controller.signal })
      .then((res) => res.json())
      .then((json) => setData(json))
      .catch(() => {});
    return () => controller.abort();
  }, [days, fetchKey]);

  if (!data) {
    return (
      <div className="min-h-screen bg-[#0c0f14] text-[#f0ece4] flex items-center justify-center">
        <p className="text-[#5e6678]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0f14] text-[#f0ece4]">
      {/* Header */}
      <header className="border-b border-[rgba(240,236,228,0.08)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Analytics</h1>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={days}
              onChange={(e) => changeDays(Number(e.target.value))}
              className="bg-[#141821] border border-[rgba(240,236,228,0.08)] rounded px-3 py-1.5 text-sm text-[#f0ece4] outline-none"
            >
              <option value={7}>7 days</option>
              <option value={14}>14 days</option>
              <option value={30}>30 days</option>
              <option value={90}>90 days</option>
            </select>
            <a
              href="/admin/messages"
              className="text-sm text-[#5e6678] hover:text-[#f0ece4] transition-colors"
            >
              Messages
            </a>
            <Link
              href="/"
              className="text-sm text-[#5e6678] hover:text-[#f0ece4] transition-colors"
            >
              Back to site
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-red-400/70 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-5">
            <p className="text-xs text-[#5e6678] uppercase tracking-wider mb-1">Total PV</p>
            <p className="text-2xl font-bold font-mono">{data.totalPV.toLocaleString()}</p>
          </div>
          <div className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-5">
            <p className="text-xs text-[#5e6678] uppercase tracking-wider mb-1">Unique Visitors</p>
            <p className="text-2xl font-bold font-mono">{data.uniqueVisitors.toLocaleString()}</p>
          </div>
          <div className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-5">
            <p className="text-xs text-[#5e6678] uppercase tracking-wider mb-1">PV / Visitor</p>
            <p className="text-2xl font-bold font-mono">
              {data.uniqueVisitors > 0
                ? (data.totalPV / data.uniqueVisitors).toFixed(1)
                : "0"}
            </p>
          </div>
          <div className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-5">
            <p className="text-xs text-[#5e6678] uppercase tracking-wider mb-1">Period</p>
            <p className="text-2xl font-bold font-mono">{data.days}d</p>
          </div>
        </div>

        {/* Daily PV Chart */}
        <section className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-6">
          <h2 className="text-sm font-medium text-[#9ba3b2] mb-4 uppercase tracking-wider">
            Daily Page Views
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.byDay}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(240,236,228,0.05)"
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11, fill: "#5e6678" }}
                  tickFormatter={(v) => v.slice(5)}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#5e6678" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1f2e",
                    border: "1px solid rgba(240,236,228,0.1)",
                    borderRadius: "8px",
                    color: "#f0ece4",
                    fontSize: "13px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#c94a2e"
                  strokeWidth={2}
                  dot={{ fill: "#c94a2e", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Hourly Distribution */}
        <section className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-6">
          <h2 className="text-sm font-medium text-[#9ba3b2] mb-4 uppercase tracking-wider">
            Hourly Distribution (JST)
          </h2>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.byHour}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(240,236,228,0.05)"
                />
                <XAxis
                  dataKey="hour"
                  tick={{ fontSize: 10, fill: "#5e6678" }}
                  interval={2}
                />
                <YAxis
                  tick={{ fontSize: 11, fill: "#5e6678" }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#1a1f2e",
                    border: "1px solid rgba(240,236,228,0.1)",
                    borderRadius: "8px",
                    color: "#f0ece4",
                    fontSize: "13px",
                  }}
                />
                <Bar dataKey="count" fill="#c94a2e" radius={[3, 3, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>

        {/* Device / Browser / OS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <MiniPieChart title="Device" data={data.byDevice} />
          <MiniPieChart title="Browser" data={data.byBrowser} />
          <MiniPieChart title="OS" data={data.byOS} />
        </div>

        {/* Pages + Referrers */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pages */}
          <section className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-6">
            <h2 className="text-sm font-medium text-[#9ba3b2] mb-4 uppercase tracking-wider">
              Pages
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.byPath.slice(0, 10)} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(240,236,228,0.05)"
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 11, fill: "#5e6678" }}
                    allowDecimals={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="path"
                    tick={{ fontSize: 11, fill: "#9ba3b2" }}
                    width={120}
                  />
                  <Tooltip
                    contentStyle={{
                      background: "#1a1f2e",
                      border: "1px solid rgba(240,236,228,0.1)",
                      borderRadius: "8px",
                      color: "#f0ece4",
                      fontSize: "13px",
                    }}
                  />
                  <Bar dataKey="count" fill="#c94a2e" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Referrers */}
          <RankingList
            title="Referrers"
            data={data.byReferrer.map((r) => ({
              label: r.referrer,
              count: r.count,
            }))}
          />
        </div>
      </div>
    </div>
  );
}
