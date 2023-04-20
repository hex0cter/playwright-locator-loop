# Looping all elements results in some elements being selected multiple times
<!-- ⚠️⚠️ Do not delete this template ⚠️⚠️ -->

<!-- 🔎 Search existing issues to avoid creating duplicates. -->
<!-- 🧪 Test using the latest Playwright release to see if your issue has already been fixed -->
<!-- 💡 Provide enough information for us to be able to reproduce your issue locally -->

### System info
- Playwright Version: 1.32.3
- Operating System: [macOS 13.2.1 (22D68)]
- Browser: [Chromium]
- Other info:

### Source code

- [x] I provided exact source code that allows reproducing the issue locally.

<!-- For simple cases, please provide a self-contained test file along with the config file -->
<!-- For larger cases, you can provide a GitHub repo you created for this issue -->
<!-- If we can not reproduce the problem locally, we won't be able to act on it -->
<!-- You can still file without the exact code and we will try to help, but if we can't repro, it will be closed -->

**Link to the GitHub repository with the repro**

[playwright-locator-loop](https://github.com/hex0cter/playwright-locator-loop)

or

**Config file**

```js
// playwright.config.ts

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
```

**Test file (self-contained)**

```js
  test("should select all checkboxes by a loop", async ({ page }) => {
    page.goto(
      "https://staging.scrive.com/s/9221714692413010618/9221932570717574475/d0661b5e62380af4"
    );
    await page.waitForLoadState();
    await page.waitForLoadState("networkidle");

    const checkboxes = await page.locator("rect[data-test='checkbox']").all();
    for (const checkbox of checkboxes) {
      await checkbox.click();
    }

    await expect(page.locator("[data-test='signview_sign_btn']")).toBeEnabled();
  });

```

**Steps**
- npm install
- npm test

**Expected**

All checkbox should be checked by the end of the tests. And the Next button on the bottom should be enabled

**Actual**

Some of the checkbox are clicked multiple times and others are never clicked. When I looked at the trace, it seems when playwright loops through all the matching elements, it calls `locator.click(rect[data-test='checkbox'] >> nth=<n>` every time, and the order of that matched list may be non deterministic.
