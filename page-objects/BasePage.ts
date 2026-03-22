import { Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {
    this.page = page;
  }
  // Navigate to a URL and handle cookie popup if it exists
  async goto(url: string) {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.acceptCookiesIfPresent();
  }

  // Method to accept cookies if the popup appears
  async acceptCookiesIfPresent() {
    const cookieButton = this.page.locator('button:has-text("Allow all")');
    if (await cookieButton.isVisible({ timeout: 3000 }).catch(() => false))
      await cookieButton.click();
  }

  // Generic helper to click any locator with wait
  async click(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 15000 });
    await locator.click();
  }

  // Generic helper to get text content
  async getText(locator: Locator) {
    await locator.waitFor({ state: 'visible', timeout: 10000 });
    return locator.textContent();
  }
}