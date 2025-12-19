import React from "react";

type IconProps = {
  className?: string;
};

export const ErrorIcon: React.FC<IconProps> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" fill="#ff2525" />
    <path
      d="M12 7v6"
      stroke="#ffffff"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="12" cy="16" r="1.2" fill="#ffffff" />
  </svg>
);

