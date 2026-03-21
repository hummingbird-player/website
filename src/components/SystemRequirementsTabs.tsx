import React from "react";
import Card from "./Card";

type PlatformName = "Linux" | "Windows" | "macOS";

interface SystemRequirementsPlatform {
  name: PlatformName;
  minimum: string[];
  recommended: string[];
  notes: string[];
}

interface SystemRequirementsTabsProps {
  platforms: SystemRequirementsPlatform[];
  defaultPlatform?: PlatformName;
}

const activeTabClasses =
  "border-button-primary-border bg-button-primary text-button-primary-text";
const inactiveTabClasses =
  "border-button-secondary-border bg-button-secondary text-button-secondary-text hover:border-button-secondary-border-hover hover:bg-button-secondary-hover";

export default function SystemRequirementsTabs({
  platforms,
  defaultPlatform = "Windows",
}: SystemRequirementsTabsProps) {
  const [activePlatform, setActivePlatform] =
    React.useState<PlatformName>(defaultPlatform);

  React.useEffect(() => {
    const detectedPlatform = detectPlatform(defaultPlatform);

    setActivePlatform(detectedPlatform);
  }, [defaultPlatform]);

  return (
    <>
      <div
        className="mt-6 inline-flex flex-wrap gap-2 rounded-lg border border-elevated-border bg-elevated-background p-2"
        role="tablist"
        aria-label="System requirements by platform"
      >
        {platforms.map((platform) => {
          const panelId = `system-requirements-panel-${platform.name.toLowerCase()}`;
          const tabId = `system-requirements-tab-${platform.name.toLowerCase()}`;
          const isActive = platform.name === activePlatform;

          return (
            <button
              key={platform.name}
              id={tabId}
              type="button"
              role="tab"
              aria-controls={panelId}
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActivePlatform(platform.name)}
              className={`rounded-sm border px-4 py-2 text-sm font-semibold transition-colors duration-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${isActive ? activeTabClasses : inactiveTabClasses}`}
            >
              {platform.name}
            </button>
          );
        })}
      </div>

      <div className="mt-6">
        {platforms.map((platform) => {
          const panelId = `system-requirements-panel-${platform.name.toLowerCase()}`;
          const tabId = `system-requirements-tab-${platform.name.toLowerCase()}`;
          const isActive = platform.name === activePlatform;

          return (
            <Card
              key={platform.name}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              aria-hidden={!isActive}
              className={`px-5 py-5 ${isActive ? "" : "hidden"}`}
            >
              <div className="grid gap-4 lg:grid-cols-2">
                <div>
                  <h3 className="text-base font-bold text-text">Minimum</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
                    {platform.minimum.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-base font-bold text-text">Recommended</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-6 text-text-secondary">
                    {platform.recommended.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 border-t border-border pt-4">
                <ul className="space-y-1 text-sm leading-6 text-text-secondary">
                  {platform.notes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function detectPlatform(defaultPlatform: PlatformName): PlatformName {
  const userAgent = window.navigator.userAgent.toLowerCase();
  const platform = (
    window.navigator.userAgentData?.platform ||
    window.navigator.platform ||
    ""
  ).toLowerCase();

  if (platform.includes("linux") || userAgent.includes("linux")) {
    return "Linux";
  }

  if (platform.includes("mac") || userAgent.includes("mac os")) {
    return "macOS";
  }

  if (platform.includes("win") || userAgent.includes("windows")) {
    return "Windows";
  }

  return defaultPlatform;
}
