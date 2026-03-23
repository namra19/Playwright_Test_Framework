import { test, expect, Browser, chromium, Page } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage'

test.describe('Darktrace Homepage Tests', () => {
  let homePage: HomePage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.open();
  });

  test('Verify Home Page Loads Successfully', async ({ page }) => {
    await homePage.verifyPageLoaded();
  });

  test('Verify Home Page Title', async ({ page }) => {
    await homePage.verifyTitle();
  });
})
