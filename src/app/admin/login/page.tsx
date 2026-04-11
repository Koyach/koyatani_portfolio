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

        {/* Google Login */}
        <button
          onClick={() => signIn("google", { callbackUrl: "/admin/messages" })}
          className="w-full flex items-center justify-center gap-3 py-3 bg-[#141821] border border-[rgba(240,236,228,0.08)] rounded-lg text-sm text-[#f0ece4] hover:bg-[#1a1f2e] active:scale-[0.98] transition-[background-color,transform] mb-6"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign in with Google
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1 h-px bg-[rgba(240,236,228,0.08)]" />
          <span className="text-xs text-[#5e6678]">or</span>
          <div className="flex-1 h-px bg-[rgba(240,236,228,0.08)]" />
        </div>

        {/* Password Login */}
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

          {error && <p className="text-sm text-red-400">{error}</p>}

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
