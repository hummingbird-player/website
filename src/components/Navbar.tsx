import {
  IconBrandDiscordFilled,
  IconBrandGithubFilled,
  IconBrandPatreonFilled,
  IconMenu,
  IconX,
} from "@tabler/icons-react";
import React from "react";
import Button from "./Button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Download", href: "/download" },
  { name: "Blog", href: "/blog" },
  { name: "Changelog", href: "/changelog" },
];

const socialLinks = [
  {
    name: "Patreon",
    href: "https://www.patreon.com/c/william341",
    icon: IconBrandPatreonFilled,
  },
  {
    name: "GitHub",
    href: "https://github.com/hummingbird-player/hummingbird",
    icon: IconBrandGithubFilled,
  },
  {
    name: "Discord",
    href: "https://discord.gg/cpBnukdjke",
    icon: IconBrandDiscordFilled,
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-background-secondary border-b border-border">
      <div className="max-w-6xl mx-auto px-8 h-12 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group">
          <img src="/logo.svg" alt="Hummingbird Logo" className="w-5 h-5" />
          <span className="font-lexend font-bold text-lg text-text tracking-tight">
            Hummingbird
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex gap-6 items-center font-inter w-full">
          <div className="mx-auto gap-1 items-center flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text transition-colors px-2.5 py-1 rounded-sm hover:bg-nav-button-hover"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
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

          <Button href="/download" className="py-1 px-3 text-sm">
            Get Hummingbird
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-text-secondary hover:text-text"
        >
          {isOpen ? (
            <IconX className="h-6 w-6" />
          ) : (
            <IconMenu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border p-4 flex flex-col gap-2 bg-background-secondary font-inter">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-text-secondary hover:text-text py-1.5 px-2 text-sm font-medium rounded-sm hover:bg-nav-button-hover"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <div className="flex items-center gap-2 px-2 py-1">
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
                  onClick={() => setIsOpen(false)}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
          <Button
            href="/download"
            className="text-center text-sm py-1 px-3 mt-1"
            onClick={() => setIsOpen(false)}
          >
            Get Hummingbird
          </Button>
        </div>
      )}
    </nav>
  );
}
