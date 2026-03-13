import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-sm border border-elevated-border bg-elevated-background ${className}`}
    >
      {children}
    </div>
  );
}
