import { test, expect, Browser, chromium, Page } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage'

test.describe('Darktrace Home Page Tests', async () => {

  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {

    homePage = new HomePage(page);
    await homePage.navigate();
  });

  //Test 1 - Verify darktrace home page is loaded successfully 
  test('Verify darktrace home page opens successfully', async ({ page }) => {
    await homePage.verifyTitle('Darktrace | The Essential AI Cybersecurity Platform');
  });

});
