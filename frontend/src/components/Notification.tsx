import React from "react";
import { ErrorIcon } from "./ErrorIcon";

type NotificationProps = {
  title: string;
  description?: string;
  variant?: "success" | "error";
};

const SuccessIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8.00016 13.1699L4.83016 9.9999L3.41016 11.4099L8.00016 15.9999L18.0002 5.9999L16.5902 4.5899L8.00016 13.1699Z"
      fill="currentColor"
    />
  </svg>
);

export const Notification: React.FC<NotificationProps> = ({ title, description, variant = "error" }) => {
  const isSuccess = variant === "success";
  const borderColor = isSuccess ? "border-green-500/70" : "border-[#ff2525]";
  const bgColor = isSuccess ? "bg-green-500/10" : "bg-[#ff252526]";
  const icon = isSuccess ? <SuccessIcon className="h-6 w-6 text-green-500" /> : <ErrorIcon className="h-6 w-6" />;

  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border border-collection-1-stroke bg-collection-1-impr-default p-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        className={`inline-flex flex-[0_0_auto] items-center gap-2.5 rounded-lg border ${borderColor} ${bgColor} p-1.5`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <div className="flex grow flex-col items-start gap-1">
        <div className="text-xl font-medium leading-5 tracking-[-0.60px] text-collection-1-glyphs-title">
          {title}
        </div>

        {description && (
          <div className="text-xs font-medium leading-3 tracking-[-0.36px] text-collection-1-glyphs-body">
            {description}
          </div>
        )}
      </div>
    </div>
  );
};

