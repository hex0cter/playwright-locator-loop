import { test, expect } from "@playwright/test";

test.describe("playwright", () => {
  test.beforeEach(async ({ page }) => {
    page.goto(
      "https://staging.scrive.com/s/9221714692413010618/9221932570717574475/d0661b5e62380af4"
    );
    await page.waitForLoadState();
    await page.waitForLoadState("networkidle");
  });

  test("should select all checkboxes by a loop", async ({ page }) => {
    const checkboxes = await page.locator("rect[data-test='checkbox']").all();
    for (const checkbox of checkboxes) {
      await checkbox.click();
    }

    await expect(page.locator("[data-test='signview_sign_btn']")).toBeEnabled();
  });

  test("should select all checkboxes", async ({ page }) => {
    for (let i = 1; i <= 9; i++) {
      await page.locator(`[data-arrow^="Checkbox_${i}0_"]`).click();
    }

    await expect(page.locator("[data-test='signview_sign_btn']")).toBeEnabled();
  });
});
