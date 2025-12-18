import React, { useState } from "react";

type IconProps = {
  className?: string;
};

const SunIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="currentColor"
      d="M12 4.5a1 1 0 0 0 1-1V2a1 1 0 1 0-2 0v1.5a1 1 0 0 0 1 1Zm0 15a1 1 0 0 0-1 1V22a1 1 0 1 0 2 0v-1.5a1 1 0 0 0-1-1Zm7.5-7.5a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1Zm-15 0a1 1 0 0 0 1-1V9a1 1 0 1 0-2 0v2a1 1 0 0 0 1 1Zm11.01-5.303a1 1 0 0 0 1.414-1.414l-1.06-1.06a1 1 0 1 0-1.415 1.414l1.061 1.06Zm-9.9 9.9a1 1 0 0 0 1.415-1.415l-1.06-1.06A1 1 0 0 0 4.54 16.5l1.07 1.097Zm0-9.9L4.55 6.797A1 1 0 0 0 5.96 5.38l1.06 1.06A1 1 0 0 0 5.6 7.855Zm9.9 9.9 1.06 1.06a1 1 0 1 0 1.414-1.414l-1.06-1.06a1 1 0 1 0-1.414 1.414ZM12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7Z"
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
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: connect to backend auth
  };

  return (
    <div
      className="flex min-h-screen w-full items-center justify-center bg-collection-1-background px-4"
      data-collection-1-mode={theme}
    >
      <form
        className="flex w-full max-w-md flex-col items-start overflow-hidden rounded-xl border-2 border-collection-1-stroke bg-collection-1-sub-default shadow-[0_4px_16px_rgba(17,17,17,0.04)]"
        aria-label="Форма авторизации"
        onSubmit={handleSubmit}
      >
        <header className="flex h-20 w-full items-center justify-between border-b border-collection-1-stroke bg-collection-1-sub-default px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-collection-1-glyphs-body">
              TESTING
            </p>
            <h1 className="text-[28px] font-semibold leading-7 tracking-[-0.84px] text-collection-1-glyphs-title">
              Авторизация
            </h1>
          </div>
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center rounded-md bg-collection-1-sub-default transition-opacity hover:opacity-80"
            aria-label="Переключить тему"
            onClick={() => setTheme((prev) => (prev === "dark" ? "light" : "dark"))}
          >
            <SunIcon className="h-6 w-6 text-collection-1-glyphs-title" />
          </button>
        </header>

        <div className="flex w-full flex-col gap-6 bg-collection-1-sub-default p-6">
          <div className="flex w-full flex-col gap-2">
            <div className="flex h-[52px] items-center justify-center rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
              <label htmlFor="email" className="sr-only">
                Почта
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Почта"
                required
                aria-required="true"
                className="w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
              />
            </div>

            <div className="flex h-[52px] w-full items-center justify-between rounded-xl border border-collection-1-stroke bg-collection-1-background px-4 py-2.5">
              <label htmlFor="password" className="sr-only">
                Пароль
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Пароль"
                required
                aria-required="true"
                className="mr-3 w-full bg-transparent text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body placeholder:text-collection-1-glyphs-body/70"
              />
              <button
                type="button"
                className="text-collection-1-glyphs-body transition-opacity hover:opacity-80"
                aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <EyeIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-collection-1-buttons-stroke bg-collection-1-buttons-primary-default px-4 py-4 text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-buttons-glyphs transition-opacity hover:opacity-90"
          >
            Продолжить
          </button>
        </div>

        <div className="flex w-full items-center justify-between border-t border-collection-1-stroke bg-collection-1-impr-default px-6 py-4">
          <button
            type="button"
            className="inline-flex items-center gap-2 text-xl font-medium leading-5 tracking-[-0.6px] text-collection-1-glyphs-body transition-opacity hover:opacity-80"
            aria-label="Запомнить меня"
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
            <span>{rememberMe ? "Запомнить" : "Не выбрано"}</span>
          </button>

          <ChevronRightIcon className="h-5 w-5 text-collection-1-glyphs-body" />
        </div>
      </form>
    </div>
  );
}
