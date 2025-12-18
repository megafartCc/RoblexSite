import React from "react";

export function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-slate-900 to-slate-950 px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-700/70 bg-slate-900/90 p-6 shadow-2xl shadow-sky-900/40 backdrop-blur">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-sky-400">
          TESTING
        </p>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-50">Roblex Admin</h1>
        <p className="mt-1 text-sm text-slate-400">
          Sign in to access your admin dashboard.
        </p>
        <form className="mt-6 space-y-4">
          <label className="block text-sm">
            <span className="mb-1 block text-slate-200">Email</span>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              autoComplete="email"
              className="block w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/70"
            />
          </label>
          <label className="block text-sm">
            <span className="mb-1 block text-slate-200">Password</span>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              autoComplete="current-password"
              className="block w-full rounded-xl border border-slate-700 bg-slate-900/70 px-3 py-2 text-sm text-slate-100 outline-none ring-sky-500/0 transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/70"
            />
          </label>
          <button
            type="submit"
            className="mt-2 flex w-full items-center justify-center rounded-full bg-gradient-to-r from-sky-400 to-emerald-400 px-4 py-2.5 text-sm font-semibold tracking-wide text-slate-950 shadow-lg shadow-sky-500/40 transition hover:shadow-xl hover:shadow-sky-500/50 active:translate-y-px"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
