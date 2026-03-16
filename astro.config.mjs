// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
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
          if (
            next &&
            next.type === "text" &&
            next.value.trimStart().startsWith(":")
          ) {
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

// https://astro.build/config
export default defineConfig({
  site: "https://hummingbird.mailliw.org",

  integrations: [react()],

  markdown: {
    rehypePlugins: [changelogTags],
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
