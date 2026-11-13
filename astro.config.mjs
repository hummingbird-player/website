// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import { __iconNode as iconFeature } from "@tabler/icons-react/dist/esm/icons/IconCirclePlus.mjs";
import { __iconNode as iconImprovement } from "@tabler/icons-react/dist/esm/icons/IconCircleArrowUp.mjs";
import { __iconNode as iconFix } from "@tabler/icons-react/dist/esm/icons/IconCircleCheck.mjs";

const changelogTags = () => (tree) => {
  const visit = (node, parent) => {
    if (node.tagName === "strong" && node.children?.[0]?.type === "text") {
      let text = node.children[0].value.toLowerCase().trim();
      // Handle "feature:" within the strong tag
      if (text.endsWith(":")) {
        text = text.slice(0, -1).trim();
      }

      if (["feature", "improvement", "fix"].includes(text)) {
        node.tagName = "strong";
        node.properties = node.properties || {};

        const colors = {
          feature: "text-emerald-500 border-emerald-500/20 bg-emerald-500/10",
          improvement: "text-blue-500 border-blue-500/20 bg-blue-500/10",
          fix: "text-red-500 border-red-500/20 bg-red-500/10",
        };

        const icons = {
          feature: iconFeature,
          improvement: iconImprovement,
          fix: iconFix,
        };

        node.properties.className = [
          "inline-flex",
          "items-center",
          "px-2",
          "py-1",
          "rounded",
          "text-xs",
          "capitalize",
          "font-extrabold",
          "mr-1",
          "align-middle",
          "border",
          "leading-none",
          "-translate-y-0.25",
          "transition-colors",
          "shadow-[0_1px_2px_rgba(0,0,0,0.2)]",
          "[text-shadow:0_1px_0_rgba(0,0,0,0.4)]",
          ...colors[text].split(" "),
        ];

        const icon = {
          type: "element",
          tagName: "svg",
          properties: {
            xmlns: "http://www.w3.org/2000/svg",
            width: "24",
            height: "24",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: ["size-4", "mr-2"],
          },
          children: icons[text].map(([tagName, props]) => ({
            type: "element",
            tagName,
            properties: props,
            children: [],
          })),
        };

        node.children = [icon, { type: "text", value: text }];

        // If the next sibling is a text node starting with a colon, remove it
        if (parent && parent.children) {
          const index = parent.children.indexOf(node);
          const next = parent.children[index + 1];
          if (next && next.type === "text" && next.value.trimStart().startsWith(":")) {
            next.value = next.value.trimStart().slice(1);
          }
        }
      }
    }
    if (node.children) {
      node.children.forEach((child) => visit(child, node));
    }
  };
  visit(tree, null);
};

const attributionPattern = /\s*\(((?:@[^,()]+(?:\([^()]*\))?\s*,?\s*)+)\)\.?\s*$/;

const changelogAttribution = () => (tree, file) => {
  if (!file.path?.includes("/changelog/")) return;

  // these older ones didn't attribute my (143mailliw) changes
  const version =
    file.data?.astro?.frontmatter?.version ?? file.path.split("/").pop().replace(/\.md$/, "");
  const [major = 0, minor = 0, patch = 0] = String(version).split(".").map(Number);
  const isLegacy = major === 0 && (minor < 3 || (minor === 3 && patch === 0));

  const authorNode = (raw) => {
    const name = raw.trim();
    const handle = name.match(/^@([\w.-]+)$/)?.[1];
    if (!handle) {
      return { type: "element", tagName: "span", properties: {}, children: [{ type: "text", value: name }] };
    }
    // "@user.github" / "@user.codeberg" handling
    const forges = {
      github: "https://github.com/",
      codeberg: "https://codeberg.org/",
    };
    const [, user, forge] = handle.match(/^(.+)\.(github|codeberg)$/) ?? [, handle];
    const base = forges[forge] ?? "https://git.mailliw.org/";
    return {
      type: "element",
      tagName: "a",
      properties: {
        href: `${base}${user}`,
        title: forge ? `@${user} on ${forge === "github" ? "GitHub" : "Codeberg"}` : undefined,
        className: ["text-text-secondary", "no-underline", "hover:text-text", "hover:underline"],
      },
      children: [{ type: "text", value: `@${user}` }],
    };
  };

  const processItem = (li) => {
    const container =
      li.children.find((c) => c.type === "element" && c.tagName === "p") ?? li;
    const idx = container.children.findLastIndex(
      (c) => !(c.type === "element" && c.tagName === "ul") && !(c.type === "text" && !c.value.trim()),
    );
    const last = container.children[idx];
    const match = last?.type === "text" ? last.value.match(attributionPattern) : null;
    let children = [];
    let missing = false;

    if (match) {
      last.value = last.value.slice(0, match.index);
      const authors = match[1].split(/,(?![^()]*\))/).filter((a) => a.trim());
      authors.forEach((a, i) => {
        if (i > 0) children.push({ type: "text", value: ", " });
        children.push(authorNode(a));
      });
    } else if (last?.type === "text" && last.value.trimEnd().endsWith(":")) {
      // ignore group headers (e.g. "Added 2 new languages:")
      return;
    } else if (isLegacy) {
      children = [authorNode("@143mailliw")];
    } else {
      missing = true;
      children = [{ type: "text", value: "invalid or missing attribution" }];
    }

    container.children.unshift({
      type: "element",
      tagName: "span",
      properties: {
        className: [
          "float-right",
          "ml-4",
          "text-sm",
          "leading-relaxed",
          missing ? "text-red-500" : "text-text-secondary",
        ],
      },
      children,
    });
  };

  const visit = (node) => {
    if (node.type === "element" && node.tagName === "li") processItem(node);
    node.children?.forEach(visit);
  };
  visit(tree);
};

// https://astro.build/config
export default defineConfig({
  site: "https://hummingbird.mailliw.org",

  integrations: [react()],

  markdown: {
    rehypePlugins: [changelogTags, changelogAttribution],
  },

  vite: {
    plugins: [tailwindcss(), svgr()],
  },
});
