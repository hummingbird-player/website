import React from "react";
import { IconBrandDiscordFilled, IconBrandPatreonFilled } from "@tabler/icons-react";
import CodebergIcon from "./codeberg-logo.svg?react";

const socialLinks = [
  {
    name: "Patreon",
    href: "https://www.patreon.com/c/william341",
    icon: IconBrandPatreonFilled,
  },
  {
    name: "GitHub",
    href: "https://codeberg.org/hummingbird/hummingbird",
    icon: CodebergIcon,
  },
  {
    name: "Discord",
    href: "https://discord.gg/cpBnukdjke",
    icon: IconBrandDiscordFilled,
  },
];

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border py-10 text-text-secondary text-sm">
      <div className="max-w-6xl mx-auto px-8 space-y-4">
        <p className="font-medium text-text">
          © {new Date().getFullYear()} William Whittaker and contributors.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-3">
            <a href="/" className="hover:text-text transition-colors">
              Home
            </a>
            <a href="/download" className="hover:text-text transition-colors">
              Download
            </a>
            <a href="/blog" className="hover:text-text transition-colors">
              Blog
            </a>
            <a href="/changelog" className="hover:text-text transition-colors">
              Changelog
            </a>
          </nav>

          <div className="flex items-center gap-1 sm:justify-end">
            {socialLinks.map((link) => {
              const Icon = link.icon;

              return (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={link.name}
                  className="rounded-sm p-1.5 text-text-secondary transition-colors hover:bg-nav-button-hover hover:text-text"
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
