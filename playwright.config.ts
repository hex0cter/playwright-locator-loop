
import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  timeout: 60 * 1000,
  retries: 0,
  snapshotDir: "./snapshots",
  reporter: [
    ["html", { outputFolder: `playwright-report` }],
    ["line"],
  ],
  projects: [
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        channel: "chrome",
        headless: true,
        viewport: { width: 1500, height: 730 },
        acceptDownloads: true,
        screenshot: "only-on-failure",
        video: "on",
        trace: "on",
      },
    }
  ],
};

export default config;
