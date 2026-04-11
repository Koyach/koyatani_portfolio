"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("メールアドレスまたはパスワードが違います");
      setLoading(false);
    } else {
      router.push("/admin/messages");
    }
  }

  return (
    <div className="min-h-screen bg-[#0c0f14] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-xl font-bold text-[#f0ece4] text-center mb-8">
          Admin Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-xs text-[#5e6678] mb-1.5 font-medium"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#141821] border border-[rgba(240,236,228,0.08)] rounded-lg text-sm text-[#f0ece4] focus:outline-none focus:border-[#c94a2e] transition-colors"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-xs text-[#5e6678] mb-1.5 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#141821] border border-[rgba(240,236,228,0.08)] rounded-lg text-sm text-[#f0ece4] focus:outline-none focus:border-[#c94a2e] transition-colors"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#c94a2e] text-[#f0ece4] text-sm font-medium rounded-lg hover:bg-[#e05a3c] active:scale-[0.98] transition-[background-color,transform] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <a
          href="/"
          className="block text-center text-xs text-[#5e6678] mt-6 hover:text-[#f0ece4] transition-colors"
        >
          Back to site
        </a>
      </div>
    </div>
  );
}
