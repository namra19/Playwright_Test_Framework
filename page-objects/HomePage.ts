import { Locator, Page, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { URLs } from '../fixtures/urls';

export class HomePage extends BasePage {

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  //Navigate to darktrace home page
  async navigate() {
    await this.page.goto(URLs.baseURL, { waitUntil: 'load' });
    await this.acceptCookiesIfPresent()
  }

  //Verify Page title
  async verifyTitle(expectedTitle: string) {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  
}


