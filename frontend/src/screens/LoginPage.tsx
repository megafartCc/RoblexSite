import React, { useState } from "react";
import { Notification } from "../components/Notification";

type IconProps = {
  className?: string;
};

const SunIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className={className}
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.5 2.625V1.125C10.5 0.826631 10.6185 0.540483 10.8295 0.329505C11.0405 0.118526 11.3266 0 11.625 0C11.9234 0 12.2095 0.118526 12.4205 0.329505C12.6315 0.540483 12.75 0.826631 12.75 1.125V2.625C12.75 2.92337 12.6315 3.20952 12.4205 3.4205C12.2095 3.63147 11.9234 3.75 11.625 3.75C11.3266 3.75 11.0405 3.63147 10.8295 3.4205C10.6185 3.20952 10.5 2.92337 10.5 2.625ZM18 11.625C18 12.8859 17.6261 14.1184 16.9256 15.1668C16.2251 16.2151 15.2295 17.0322 14.0646 17.5147C12.8997 17.9972 11.6179 18.1235 10.3813 17.8775C9.14467 17.6315 8.00875 17.0244 7.11719 16.1328C6.22563 15.2412 5.61847 14.1053 5.37249 12.8687C5.12651 11.6321 5.25276 10.3503 5.73527 9.18539C6.21778 8.02051 7.03488 7.02488 8.08324 6.32438C9.1316 5.62389 10.3641 5.25 11.625 5.25C13.3152 5.25174 14.9357 5.92394 16.1309 7.11911C17.3261 8.31428 17.9983 9.93478 18 11.625ZM15.75 11.625C15.75 10.8092 15.5081 10.0116 15.0548 9.33327C14.6016 8.65492 13.9573 8.12621 13.2036 7.814C12.4498 7.50179 11.6204 7.4201 10.8203 7.57926C10.0201 7.73843 9.28508 8.13129 8.70818 8.70818C8.13129 9.28508 7.73843 10.0201 7.57926 10.8203C7.4201 11.6204 7.50179 12.4498 7.814 13.2036C8.12621 13.9573 8.65492 14.6016 9.33327 15.0548C10.0116 15.5081 10.8092 15.75 11.625 15.75C12.7186 15.7488 13.7671 15.3138 14.5404 14.5404C15.3138 13.7671 15.7488 12.7186 15.75 11.625ZM4.45406 6.04594C4.55871 6.15058 4.68294 6.2336 4.81967 6.29023C4.9564 6.34686 5.10294 6.37601 5.25094 6.37601C5.39893 6.37601 5.54548 6.34686 5.6822 6.29023C5.81893 6.2336 5.94317 6.15058 6.04781 6.04594C6.15246 5.94129 6.23547 5.81706 6.2921 5.68033C6.34874 5.5436 6.37789 5.39706 6.37789 5.24906C6.37789 5.10107 6.34874 4.95452 6.2921 4.8178C6.23547 4.68107 6.15246 4.55683 6.04781 4.45219L4.92281 3.32719C4.71147 3.11584 4.42482 2.99711 4.12594 2.99711C3.82705 2.99711 3.54041 3.11584 3.32906 3.32719C3.11772 3.53853 2.99899 3.82518 2.99899 4.12406C2.99899 4.42295 3.11772 4.70959 3.32906 4.92094L4.45406 6.04594ZM4.45406 17.2022L3.32906 18.3272C3.22442 18.4318 3.1414 18.5561 3.08477 18.6928C3.02814 18.8295 2.99899 18.9761 2.99899 19.1241C2.99899 19.2721 3.02814 19.4186 3.08477 19.5553C3.1414 19.6921 3.22442 19.8163 3.32906 19.9209C3.54041 20.1323 3.82705 20.251 4.12594 20.251C4.27393 20.251 4.42048 20.2219 4.5572 20.1652C4.69393 20.1086 4.81817 20.0256 4.92281 19.9209L6.04781 18.7959C6.25916 18.5846 6.37789 18.2979 6.37789 17.9991C6.37789 17.7002 6.25916 17.4135 6.04781 17.2022C5.83647 16.9908 5.54982 16.8721 5.25094 16.8721C4.95205 16.8721 4.66541 16.9908 4.45406 17.2022ZM18 6.375C18.1478 6.37512 18.2941 6.34612 18.4307 6.28965C18.5673 6.23319 18.6914 6.15038 18.7959 6.04594L19.9209 4.92094C20.0256 4.81629 20.1086 4.69206 20.1652 4.55533C20.2219 4.4186 20.251 4.27206 20.251 4.12406C20.251 3.97607 20.2219 3.82952 20.1652 3.6928C20.1086 3.55607 20.0256 3.43183 19.9209 3.32719C19.8163 3.22254 19.6921 3.13953 19.5553 3.0829C19.4186 3.02626 19.2721 2.99711 19.1241 2.99711C18.9761 2.99711 18.8295 3.02626 18.6928 3.0829C18.5561 3.13953 18.4318 3.22254 18.3272 3.32719L17.2022 4.45219C17.0439 4.60954 16.936 4.81041 16.8922 5.02925C16.8484 5.24809 16.8707 5.47501 16.9562 5.68115C17.0418 5.8873 17.1867 6.06334 17.3725 6.18689C17.5584 6.31044 17.7768 6.37592 18 6.375ZM18.7959 17.2041C18.5846 16.9927 18.2979 16.874 17.9991 16.874C17.7002 16.874 17.4135 16.9927 17.2022 17.2041C16.9908 17.4154 16.8721 17.7021 16.8721 18.0009C16.8721 18.2998 16.9908 18.5865 17.2022 18.7978L18.3272 19.9228C18.5385 20.1342 18.8252 20.2529 19.1241 20.2529C19.4229 20.2529 19.7096 20.1342 19.9209 19.9228C20.1323 19.7115 20.251 19.4248 20.251 19.1259C20.251 18.8271 20.1323 18.5404 19.9209 18.3291L18.7959 17.2041ZM3.75 11.625C3.75 11.3266 3.63147 11.0405 3.4205 10.8295C3.20952 10.6185 2.92337 10.5 2.625 10.5H1.125C0.826631 10.5 0.540483 10.6185 0.329505 10.8295C0.118526 11.0405 0 11.3266 0 11.625C0 11.9234 0.118526 12.2095 0.329505 12.4205C0.540483 12.6315 0.826631 12.75 1.125 12.75H2.625C2.92337 12.75 3.20952 12.6315 3.4205 12.4205C3.63147 12.2095 3.75 11.9234 3.75 11.625ZM11.625 19.5C11.3266 19.5 11.0405 19.6185 10.8295 19.8295C10.6185 20.0405 10.5 20.3266 10.5 20.625V22.125C10.5 22.4234 10.6185 22.7095 10.8295 22.9205C11.0405 23.1315 11.3266 23.25 11.625 23.25C11.9234 23.25 12.2095 23.1315 12.4205 22.9205C12.6315 22.7095 12.75 22.4234 12.75 22.125V20.625C12.75 20.3266 12.6315 20.0405 12.4205 19.8295C12.2095 19.6185 11.9234 19.5 11.625 19.5ZM22.125 10.5H20.625C20.3266 10.5 20.0405 10.6185 19.8295 10.8295C19.6185 11.0405 19.5 11.3266 19.5 11.625C19.5 11.9234 19.6185 12.2095 19.8295 12.4205C20.0405 12.6315 20.3266 12.75 20.625 12.75H22.125C22.4234 12.75 22.7095 12.6315 22.9205 12.4205C23.1315 12.2095 23.25 11.9234 23.25 11.625C23.25 11.3266 23.1315 11.0405 22.9205 10.8295C22.7095 10.6185 22.4234 10.5 22.125 10.5Z"
      fill="currentColor"
    />
  </svg>
);

const EyeIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Zm0-8a3 3 0 1 0 .002 6.002A3 3 0 0 0 12 9Z"
    />
  </svg>
);

const ChevronRightIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M9.29 6.71a1 1 0 0 0 0 1.41L12.17 11.99 9.3 14.87a1 1 0 1 0 1.4 1.42l3.88-3.89a1 1 0 0 0 0-1.41L10.7 6.7a1 1 0 0 0-1.41.01Z"
    />
  </svg>
);

export function LoginPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [twoFactorDigits, setTwoFactorDigits] = useState<string[]>(["", "", "", "", "", ""]);
  const [rememberMe, setRememberMe] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [step, setStep] = useState<"credentials" | "twofactor">("credentials");
  const [tempToken, setTempToken] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const apiBase =
    import.meta.env.VITE_API_BASE_URL && import.meta.env.VITE_API_BASE_URL.length > 0
      ? import.meta.env.VITE_API_BASE_URL.replace(/\/+$/, "")
      : "https://roblexsite-production.up.railway.app/api";

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage(null);

    if (step === "credentials") {
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
        const res = await fetch(
          `${apiBase}/auth/` + (mode === "login" ? "login" : "register"),
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          },
        );

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errorText = (data && (data.message || data.error)) || "Something went wrong.";
          setMessage(errorText);
          return;
        }

        if (mode === "login" && data.requires2fa && data.tempToken) {
          setTempToken(data.tempToken);
          setStep("twofactor");
          setMessage("Enter the 6-digit code from your authenticator app.");
          return;
        }

        if (mode === "login") {
          setMessage("Logged in successfully.");
        } else {
          setMessage("Admin account created. You can now log in.");
          setMode("login");
        }
      } catch (error) {
        setMessage("Network error. Please try again.");
      } finally {
        setSubmitting(false);
      }
    } else if (step === "twofactor") {
      if (!tempToken) {
        setMessage("Missing 2FA session. Please log in again.");
        setStep("credentials");
        return;
      }

      const twoFactorCode = twoFactorDigits.join("");

      if (!/^[0-9]{6}$/.test(twoFactorCode)) {
        setMessage("Please enter a valid 6-digit code.");
        return;
      }

      setSubmitting(true);

      try {
        const res = await fetch(`${apiBase}/auth/2fa/verify`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: twoFactorCode, tempToken }),
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          const errorText = (data && (data.message || data.error)) || "Invalid 2FA code.";
          setMessage(errorText);
          return;
        }

        setMessage("Logged in successfully with 2FA.");
        setStep("credentials");
        setTempToken(null);
        setTwoFactorDigits(["", "", "", "", "", ""]);
      } catch (error) {
        setMessage("Network error. Please try again.");
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center bg-collection-1-background px-4"
      data-collection-1-mode={theme}
    >
      <form
        className="flex w-full max-w-md flex-col items-start overflow-hidden rounded-xl border-2 border-collection-1-stroke bg-collection-1-sub-default shadow-[0_4px_16px_rgba(17,17,17,0.04)]"
        aria-label="Admin login form"
        onSubmit={handleSubmit}
      >
        <header className="flex h-20 w-full items-center justify-between border-b border-collection-1-stroke bg-collection-1-sub-default px-6">
          <h1 className="text-[28px] font-semibold leading-7 tracking-[-0.84px] text-collection-1-glyphs-title">
            {step === "twofactor"
              ? "2-FA"
              : mode === "login"
                ? "Admin login"
                : "Admin sign up"}
          </h1>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-collection-1-sub-default transition-opacity hover:opacity-80"
            aria-label="Toggle theme"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            <SunIcon className="h-6 w-6 text-collection-1-glyphs-title" />
          </button>
        </header>

        <div className="flex w-full flex-col gap-6 bg-collection-1-sub-default p-6">
          {step === "credentials" ? (
            <>
              <div className="flex w-full flex-col gap-2">
                <div className="flex h-[52px] items-center justify-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
                  <label htmlFor="email" className="sr-only">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="Email"
                    required
                    aria-required="true"
                    className="w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
                  />
                </div>

                <div className="flex h-[52px] w-full items-center justify-between rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"
                    required
                    aria-required="true"
                    className="mr-3 w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
                  />
                  <button
                    type="button"
                    className="text-collection-1-glyphs-body transition-opacity hover:opacity-80"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <EyeIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="flex w-full flex-col gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-collection-1-buttons-stroke bg-collection-1-buttons-primary-default px-4 py-4 text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-buttons-glyphs transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {mode === "login" ? "Continue" : "Sign up"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMode((prev) => (prev === "login" ? "signup" : "login"));
                    setMessage(null);
                  }}
                  className="text-sm font-medium text-collection-1-glyphs-body/80 underline-offset-4 hover:underline"
                >
                  {mode === "login" ? "Sign up (temporary admin)" : "Back to login"}
                </button>
              </div>
            </>
          ) : (
            <div className="flex w-full flex-col gap-4">
              <p className="text-sm leading-4 text-collection-1-glyphs-body">
                Open your authenticator app, then enter the 6‑digit code shown on the screen.
              </p>
              <div className="flex justify-between gap-2">
                {twoFactorDigits.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(event) => {
                      const value = event.target.value.replace(/\D/g, "").slice(0, 1);
                      const next = [...twoFactorDigits];
                      next[index] = value;
                      setTwoFactorDigits(next);

                      if (value && index < twoFactorDigits.length - 1) {
                        const nextInput = document.getElementById(`twofactor-${index + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    onKeyDown={(event) => {
                      if (event.key === "Backspace" && !twoFactorDigits[index] && index > 0) {
                        const prevInput = document.getElementById(`twofactor-${index - 1}`);
                        prevInput?.focus();
                      }
                    }}
                    id={`twofactor-${index}`}
                    className="flex h-12 w-10 items-center justify-center rounded-lg border border-collection-1-stroke bg-collection-1-background text-center text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-title"
                  />
                ))}
              </div>

              <div className="flex w-full flex-col gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-collection-1-buttons-stroke bg-collection-1-buttons-primary-default px-4 py-4 text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-buttons-glyphs transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  Verify code
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials");
                    setTempToken(null);
                    setTwoFactorDigits(["", "", "", "", "", ""]);
                    setMessage(null);
                  }}
                  className="text-sm font-medium text-collection-1-glyphs-body/80 underline-offset-4 hover:underline"
                >
                  Back to login
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex w-full items-center justify-between border-t border-collection-1-stroke bg-collection-1-impr-default px-6 py-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body transition-opacity hover:opacity-80"
            aria-label="Remember this device"
            aria-pressed={rememberMe}
            onClick={() => setRememberMe((prev) => !prev)}
          >
            <div
              className={`h-6 w-6 rounded-md border border-collection-1-stroke bg-gradient-to-br from-slate-100/10 via-slate-100/40 to-slate-100/10 ${
                rememberMe ? "bg-collection-1-buttons-primary-default" : ""
              }`}
              role="checkbox"
              aria-checked={rememberMe}
            />
            <span>Remember me</span>
          </button>

          <ChevronRightIcon className="h-5 w-5 text-collection-1-glyphs-body" />
        </div>
      </form>

      {message && (
        <div className="pointer-events-none fixed bottom-4 right-4 z-50 w-[377px] max-w-full animate-toast-enter">
          <Notification
            title={mode === "login" ? "Authorization error" : "Sign up error"}
            description={message}
          />
        </div>
      )}
    </div>
  );
}

