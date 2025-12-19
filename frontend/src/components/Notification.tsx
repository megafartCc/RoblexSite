import React from "react";
import { ErrorIcon } from "./ErrorIcon";

type NotificationProps = {
  title: string;
  description?: string;
};

export const Notification: React.FC<NotificationProps> = ({ title, description }) => {
  return (
    <div
      className="flex w-full items-center gap-3 rounded-xl border border-collection-1-stroke bg-collection-1-impr-default p-3"
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div
        className="inline-flex flex-[0_0_auto] items-center gap-2.5 rounded-lg border border-[#ff2525] bg-[#ff252526] p-1.5"
        aria-hidden="true"
      >
        <ErrorIcon className="h-6 w-6" />
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

