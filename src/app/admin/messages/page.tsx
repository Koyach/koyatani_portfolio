"use client";

import { useEffect, useState, useCallback } from "react";
import { signOut } from "next-auth/react";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
};

export default function AdminMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);

  const fetchMessages = useCallback(async () => {
    const res = await fetch("/api/contact");
    const data = await res.json();
    setMessages(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function toggleRead(id: string, isRead: boolean) {
    await fetch("/api/contact", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isRead: !isRead }),
    });
    fetchMessages();
  }

  async function deleteMessage(id: string) {
    if (!confirm("本当に削除しますか？")) return;
    await fetch("/api/contact", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setSelected(null);
    fetchMessages();
  }

  const selectedMsg = messages.find((m) => m.id === selected);
  const unreadCount = messages.filter((m) => !m.isRead).length;

  if (loading) {
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
            <h1 className="text-xl font-bold">Messages</h1>
            <p className="text-sm text-[#5e6678] mt-0.5">
              {messages.length} total / {unreadCount} unread
            </p>
          </div>
          <div className="flex items-center gap-4">
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

      <div className="max-w-6xl mx-auto flex min-h-[calc(100vh-73px)]">
        {/* Message List */}
        <div className="w-full md:w-[380px] border-r border-[rgba(240,236,228,0.08)] overflow-y-auto">
          {messages.length === 0 ? (
            <p className="p-6 text-[#5e6678] text-sm">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelected(msg.id)}
                className={`w-full text-left px-5 py-4 border-b border-[rgba(240,236,228,0.05)] transition-colors ${
                  selected === msg.id
                    ? "bg-[#1a1f2e]"
                    : "hover:bg-[#141821]"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {!msg.isRead && (
                    <span className="w-2 h-2 rounded-full bg-[#c94a2e] shrink-0" />
                  )}
                  <span className="text-sm font-medium truncate">
                    {msg.name}
                  </span>
                  <span className="text-xs text-[#5e6678] ml-auto shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString("ja-JP", {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-xs text-[#5e6678] truncate">{msg.email}</p>
                <p className="text-sm text-[#9ba3b2] mt-1 line-clamp-2">
                  {msg.message}
                </p>
              </button>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="hidden md:flex flex-1 flex-col">
          {selectedMsg ? (
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold">{selectedMsg.name}</h2>
                  <a
                    href={`mailto:${selectedMsg.email}`}
                    className="text-sm text-[#c94a2e] hover:underline"
                  >
                    {selectedMsg.email}
                  </a>
                  <p className="text-xs text-[#5e6678] mt-1">
                    {new Date(selectedMsg.createdAt).toLocaleString("ja-JP")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      toggleRead(selectedMsg.id, selectedMsg.isRead)
                    }
                    className="px-3 py-1.5 text-xs border border-[rgba(240,236,228,0.15)] rounded hover:bg-[#1a1f2e] transition-colors"
                  >
                    {selectedMsg.isRead ? "Mark unread" : "Mark read"}
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMsg.id)}
                    className="px-3 py-1.5 text-xs border border-red-900/50 text-red-400 rounded hover:bg-red-900/20 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="bg-[#141821] rounded-lg p-6 border border-[rgba(240,236,228,0.05)]">
                <p className="text-[0.95rem] leading-relaxed whitespace-pre-wrap">
                  {selectedMsg.message}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-[#5e6678] text-sm">
                Select a message to view
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
