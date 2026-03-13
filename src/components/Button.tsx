import React from "react";

interface ButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  children,
  className = "",
  ...props
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-sm border text-sm font-semibold font-inter transition-colors duration-100";
  const variants = {
    primary:
      "border-button-primary-border bg-button-primary text-button-primary-text hover:border-button-primary-border-hover hover:bg-button-primary-hover active:border-button-primary-border-active active:bg-button-primary-active",
    secondary:
      "border-button-secondary-border bg-button-secondary text-button-secondary-text hover:border-button-secondary-border-hover hover:bg-button-secondary-hover active:border-button-secondary-border-active active:bg-button-secondary-active",
  };

  return (
    <a
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
