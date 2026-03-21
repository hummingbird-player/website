import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
}

export default function Card({
    children,
    className = "",
    ...props
}: CardProps) {
    return (
        <div
            className={`rounded-lg border border-elevated-border bg-elevated-background ${className}`}
            {...props}
        >
            {children}
        </div>
    );
}
