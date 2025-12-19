import React, { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Notification } from "../components/Notification";

export function TwoFactorSetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otpauthUrl, setOtpauthUrl] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const apiBase =
    import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.length > 0
      ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")
      : "https://roblexsite-production.up.railway.app/api";

  const handleGenerate = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!email.includes("@") || !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${apiBase}/auth/2fa/setup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorText = (data && (data.message || data.error)) || "Failed to start 2FA setup.";
        setMessage(errorText);
        return;
      }

      setOtpauthUrl(data.otpauthUrl ?? null);
      setSecret(data.secret ?? null);
      setMessage("Scan the QR code or enter the secret in your authenticator app, then enter a 6-digit code to confirm.");
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleConfirm = async (event: React.FormEvent) => {
    event.preventDefault();
    setMessage(null);

    if (!email || !secret) {
      setMessage("Start 2FA setup first.");
      return;
    }

    if (!/^[0-9]{6}$/.test(code)) {
      setMessage("Please enter a valid 6-digit code.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch(`${apiBase}/auth/2fa/confirm`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, token: code }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        const errorText = (data && (data.message || data.error)) || "Failed to confirm 2FA.";
        setMessage(errorText);
        return;
      }

      setMessage("2FA has been enabled. You can now log in with your 6-digit code.");
    } catch {
      setMessage("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-collection-1-background px-4">
      <div className="flex w-full max-w-md flex-col gap-4 rounded-xl border-2 border-collection-1-stroke bg-collection-1-sub-default p-6 shadow-[0_4px_16px_rgba(17,17,17,0.04)]">
        <h1 className="text-[24px] font-semibold leading-7 tracking-[-0.72px] text-collection-1-glyphs-title">
          Set up 2FA
        </h1>

        {message && (
          <Notification title="2FA setup" description={message} />
        )}

        <form onSubmit={handleGenerate} className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex h-[52px] items-center justify-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
              <input
                type="email"
                placeholder="Admin email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
              />
            </div>
            <div className="flex h-[52px] items-center justify-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
              <input
                type="password"
                placeholder="Admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-collection-1-buttons-stroke bg-collection-1-buttons-primary-default px-4 py-3 text-lg font-medium leading-5 tracking-[-0.6px] text-collection-1-buttons-glyphs transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            Generate 2FA secret
          </button>
        </form>

        {secret && (
          <div className="flex flex-col gap-3 border-t border-collection-1-stroke pt-4">
            {otpauthUrl && (
              <div className="flex justify-center">
                <QRCodeSVG value={otpauthUrl} size={180} />
              </div>
            )}
            <div className="text-sm text-collection-1-glyphs-body">
              Secret (for manual entry):{" "}
              <span className="font-mono text-collection-1-glyphs-title">{secret}</span>
            </div>

            <form onSubmit={handleConfirm} className="flex flex-col gap-3">
              <div className="flex h-[52px] items-center justify-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={6}
                  placeholder="Enter 6-digit code to confirm"
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                  className="w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-collection-1-buttons-stroke bg-collection-1-buttons-primary-default px-4 py-3 text-lg font-medium leading-5 tracking-[-0.6px] text-collection-1-buttons-glyphs transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                Confirm 2FA
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

