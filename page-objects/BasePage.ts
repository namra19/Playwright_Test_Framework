import { chromium, Locator, Page } from '@playwright/test';

export class BasePage {
  constructor(protected page: Page) {
    this.page = page;
  }
  // Navigate to a URL and handle cookie popup if it exists
  async navigate(url: string) {
    const browser = await chromium.launch({ headless: false });
      const context = await browser.newContext({
    ignoreHTTPSErrors: true, 
  });
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  // Method to accept cookies if the popup appears
  async acceptCookies() {
    const cookieButton = this.page.locator('#onetrust-accept-btn-handler');
    try {
      await cookieButton.waitFor({ state: 'visible', timeout: 10000 });
      await cookieButton.click();
    } catch (e) {
      console.log('Cookie banner not displayed or already accepted');
    }
  }

  async waitForPageLoad() {
    await this.page.waitForLoadState('load');
  }

}