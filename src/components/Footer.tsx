import React from "react";

export default function Footer() {
  return (
    <footer className="bg-background-secondary border-t border-border py-10 text-text-secondary text-sm">
      <div className="max-w-6xl mx-auto px-8 space-y-4">
        <p className="font-medium text-text">
          © {new Date().getFullYear()} William Whittaker and contributors.
        </p>
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
      </div>
    </footer>
  );
}
