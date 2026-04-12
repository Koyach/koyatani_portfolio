"use client";

import { useEffect, useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function AdminStatus() {
  const [text, setText] = useState("");
  const [emoji, setEmoji] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/status")
      .then((r) => r.json())
      .then((data) => {
        setText(data.text || "");
        setEmoji(data.emoji || "");
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/status", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, emoji }),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0c0f14] text-[#f0ece4] flex items-center justify-center">
        <p className="text-[#5e6678]">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0c0f14] text-[#f0ece4]">
      <header className="border-b border-[rgba(240,236,228,0.08)] px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Status</h1>
          <div className="flex items-center gap-4">
            <a href="/admin/messages" className="text-sm text-[#5e6678] hover:text-[#f0ece4] transition-colors">Messages</a>
            <a href="/admin/analytics" className="text-sm text-[#5e6678] hover:text-[#f0ece4] transition-colors">Analytics</a>
            <Link href="/" className="text-sm text-[#5e6678] hover:text-[#f0ece4] transition-colors">Back to site</Link>
            <button onClick={() => signOut({ callbackUrl: "/" })} className="text-sm text-red-400/70 hover:text-red-400 transition-colors">Sign out</button>
          </div>
        </div>
      </header>

      <div className="max-w-md mx-auto p-8 space-y-6">
        <p className="text-sm text-[#9ba3b2]">
          Heroセクションに表示されるライブステータスを更新します。空にすると非表示になります。
        </p>

        {/* Preview */}
        {text && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#5e6678]">Preview:</span>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-[rgba(240,236,228,0.06)] border border-[rgba(240,236,228,0.08)] text-[#9ba3b2]">
              <span className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#c94a2e]" />
              {emoji && <span>{emoji}</span>}
              <span className="font-mono text-[0.7rem]">{text}</span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#5e6678] mb-1.5">Emoji (optional)</label>
            <input
              type="text"
              value={emoji}
              onChange={(e) => setEmoji(e.target.value)}
              placeholder="e.g. 🚀"
              className="w-full px-4 py-3 bg-[#141821] border border-[rgba(240,236,228,0.08)] rounded-lg text-sm text-[#f0ece4] outline-none focus:border-[#c94a2e] transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-[#5e6678] mb-1.5">Status text</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. Building Bedrock Space"
              className="w-full px-4 py-3 bg-[#141821] border border-[rgba(240,236,228,0.08)] rounded-lg text-sm text-[#f0ece4] outline-none focus:border-[#c94a2e] transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 bg-[#c94a2e] text-[#f0ece4] text-sm font-medium rounded-lg hover:bg-[#e05a3c] active:scale-[0.98] transition-[background-color,transform] disabled:opacity-50"
        >
          {saving ? "Saving..." : saved ? "Saved!" : "Save"}
        </button>

        {text && (
          <button
            onClick={() => { setText(""); setEmoji(""); }}
            className="w-full py-2 text-sm text-[#5e6678] hover:text-red-400 transition-colors"
          >
            Clear status
          </button>
        )}
      </div>
    </div>
  );
}
