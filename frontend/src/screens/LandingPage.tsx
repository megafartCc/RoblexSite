import React, { useEffect, useState } from "react";
import { Notification } from "../components/Notification";

type LandingPageProps = {
  initialMode?: "login" | "register";
};

export function LandingPage({ initialMode = "login" }: LandingPageProps) {
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [messageKind, setMessageKind] = useState<"success" | "error">("error");

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  const apiBase =
    import.meta.env.VITE_PUBLIC_API_BASE_URL && import.meta.env.VITE_PUBLIC_API_BASE_URL.length > 0
      ? import.meta.env.VITE_PUBLIC_API_BASE_URL.replace(/\/+$/, "")
      : "https://api.roblex.io";

  const showMessage = (text: string | null, kind: "success" | "error" = "error") => {
    setMessage(text);
    setMessageKind(kind);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    showMessage(null);

    if (!email.includes("@") || !email.includes(".")) {
      showMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      showMessage("Password must be at least 8 characters long.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${apiBase}/api/${mode === "login" ? "login" : "register"}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorText = (data && (data.error || data.message)) || "Something went wrong.";
        showMessage(errorText);
        return;
      }

      if (mode === "register") {
        showMessage("Account created. You can now log in.", "success");
        setMode("login");
        return;
      }

      const isAdmin =
        typeof data?.isAdmin === "boolean"
          ? data.isAdmin
          : typeof data?.is_admin === "number"
            ? data.is_admin === 1
            : false;

      showMessage(isAdmin ? "Login successful. Admin account detected." : "Login successful.", "success");
    } catch (error) {
      showMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-collection-1-background px-4 py-12 text-collection-1-glyphs-title"
      data-collection-1-mode="dark"
    >
      <div className="w-full max-w-[520px] space-y-8">
        <header className="space-y-3 text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-collection-1-stroke bg-collection-1-sub-default px-4 py-2 text-sm font-semibold tracking-[0.2em] uppercase text-collection-1-glyphs-body">
            Roblex Account
          </div>
          <h1 className="text-3xl font-semibold tracking-[-0.8px] md:text-4xl">
            {mode === "login" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="text-base text-collection-1-glyphs-body">
            {mode === "login"
              ? "Log in with your email to access the dashboard."
              : "Register to start using Roblex today."}
          </p>
        </header>

        <div className="rounded-2xl border border-collection-1-stroke bg-collection-1-sub-default p-6 shadow-[0_20px_45px_rgba(0,0,0,0.35)]">
          <div className="mb-6 flex rounded-full border border-collection-1-stroke bg-collection-1-impr-default p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
                mode === "login"
                  ? "bg-collection-1-buttons-primary-default text-collection-1-buttons-glyphs"
                  : "text-collection-1-glyphs-body"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-[0.2em] transition-colors ${
                mode === "register"
                  ? "bg-collection-1-buttons-primary-default text-collection-1-buttons-glyphs"
                  : "text-collection-1-glyphs-body"
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <div className="flex h-[52px] items-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4">
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Email"
                  required
                  aria-required="true"
                  className="w-full text-base font-medium text-collection-1-glyphs-title placeholder:text-collection-1-glyphs-body/70"
                />
              </div>
              <div className="flex h-[52px] items-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4">
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Password"
                  required
                  aria-required="true"
                  className="w-full text-base font-medium text-collection-1-glyphs-title placeholder:text-collection-1-glyphs-body/70"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center rounded-xl border border-collection-1-buttons-stroke bg-collection-1-buttons-primary-default px-4 py-4 text-base font-semibold text-collection-1-buttons-glyphs transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {submitting ? "Sending..." : mode === "login" ? "Continue" : "Create account"}
            </button>
          </form>

          {message && (
            <div className="mt-4">
              <Notification
                title={mode === "login" ? "Login" : "Register"}
                description={message}
                variant={messageKind}
              />
            </div>
          )}
        </div>

        <div className="text-center text-sm text-collection-1-glyphs-body">
          Admin access?{" "}
          <a href="/admin/login" className="font-medium text-collection-1-glyphs-title underline">
            Go to admin login
          </a>
        </div>
      </div>
    </div>
  );
}
