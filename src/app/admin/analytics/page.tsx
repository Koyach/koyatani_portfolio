"use client";

import { useEffect, useState, useCallback } from "react";
import { signOut } from "next-auth/react";
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
} from "recharts";

type AnalyticsData = {
  totalPV: number;
  byPath: { path: string; count: number }[];
  byDay: { date: string; count: number }[];
  byReferrer: { referrer: string; count: number }[];
  days: number;
};

export default function AdminAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const res = await fetch(`/api/analytics?days=${days}`);
    const json = await res.json();
    setData(json);
    setLoading(false);
  }, [days]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading || !data) {
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
            <p className="text-sm text-[#5e6678] mt-0.5">
              {data.totalPV.toLocaleString()} PV / past {data.days} days
            </p>
          </div>
          <div className="flex items-center gap-4">
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
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
            <a
              href="/"
              className="text-sm text-[#5e6678] hover:text-[#f0ece4] transition-colors"
            >
              Back to site
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm text-red-400/70 hover:text-red-400 transition-colors"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-6 space-y-8">
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
          <section className="bg-[#141821] rounded-xl border border-[rgba(240,236,228,0.05)] p-6">
            <h2 className="text-sm font-medium text-[#9ba3b2] mb-4 uppercase tracking-wider">
              Referrers
            </h2>
            <div className="space-y-2">
              {data.byReferrer.length === 0 ? (
                <p className="text-sm text-[#5e6678]">No data yet</p>
              ) : (
                data.byReferrer.map((r) => (
                  <div
                    key={r.referrer}
                    className="flex items-center justify-between py-1.5"
                  >
                    <span className="text-sm text-[#9ba3b2] truncate mr-4">
                      {r.referrer}
                    </span>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="w-24 h-1.5 bg-[#0c0f14] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#c94a2e] rounded-full"
                          style={{
                            width: `${(r.count / data.byReferrer[0].count) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-xs text-[#5e6678] w-8 text-right font-mono">
                        {r.count}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
