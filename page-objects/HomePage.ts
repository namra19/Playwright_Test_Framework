import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLs } from '../fixtures/urls';

export class HomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  //Navigate to darktrace home page
  async open() {
    await this.navigate(URLs.baseURL);
    await this.acceptCookies();
    await this.waitForPageLoad();
  }

  //Verify page URL
  async verifyPageLoaded() {
    await expect(this.page).toHaveURL(URLs.baseURL);
    await expect(this.page.locator('body')).toBeVisible();
  }

  //Verify Page title
  async verifyTitle() {
    await expect(this.page).toHaveTitle('Darktrace | The Essential AI Cybersecurity Platform');
  }

}


