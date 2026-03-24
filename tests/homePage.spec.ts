import { test, expect, Browser, chromium, Page, Locator } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage'
import { NavigationBar } from '../page-objects/NavigationBar';
import { URLs } from '../fixtures/urls';
import { navigationData } from '../fixtures/navigationData';
import { NavigationValidator } from '../utils/utils';

test.describe('Darktrace Homepage Tests', () => {
  let homePage: HomePage;
  let navBar: NavigationBar;

  const menus = ['Platform', 'Solutions', 'Why Darktrace', 'Resources'];

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    navBar = new NavigationBar(page);
    await homePage.open();
  });

  test('Verify Home Page Loads Successfully', async ({ page }) => {
    await homePage.verifyPageLoaded();
  });

  test('Verify Home Page Title', async ({ page }) => {
    await homePage.verifyTitle();
  });

  test('Verify that home page should display all items on the navigation bar', async ({ page }) => {
    await navBar.assertNavItemsVisible();
  });

  test('Verify that Navigation Bar remains visible when scrolling', async ({ page }) => {
    await navBar.scrollToBottom();
    // Verify nav bar is still visible
    const isNavBarVisible = await navBar.navBarIsVisible();
    expect(isNavBarVisible).toBeTruthy();
  });

  test('Verify that hover effects work on navigation menu bar', async ({ page }) => {
    await navBar.hoverOverMenu(navBar.platform);
    await navBar.hoverOverMenu(navBar.solutions);
    await navBar.hoverOverMenu(navBar.whyDarktrace);
    await navBar.hoverOverMenu(navBar.resources);
    await navBar.hoverOverMenu(navBar.getDemo);
  });

  test('Verify logo redirects to homepage when clicked', async ({ page }) => {
    await navBar.clickLogo();
    await expect(page).toHaveURL(URLs.baseURL);
  });

  // test.only('Validate all navigation menus', async ({ page, context }) => {
  //   const validator = new NavigationValidator(page, navBar, context);

  //   for (const section of navigationData) {
  //     await validator.validateMenu(section);
  //   }

  for (const menu of menus) {
    test.only(`Validate all ${menu} submenu links`, async ({ page }) => {
      const links = await navBar.getSubmenuLinks(menu);

      expect(links.length).toBeGreaterThan(0); // Ensure menu has links

      for (const link of links) {
        const href = await link.getAttribute('href');
        console.log(`Checking ${menu} -> ${href}`);
        await Promise.all([
          page.waitForNavigation({ waitUntil: 'domcontentloaded' }),
          link.click()
        ]);
        expect(page.url()).toContain(href?.replace(/#.*/, '') || ''); // Ignore anchor parts
        await navBar.clickLogo(); // Go back to homepage for next link
      }
    });
  }
  test('Verify navigation menu links are not broken', async ({ page, request }) => {

    const links = await navBar.getAllNavLinks();

    console.log(`Found ${links.length} links in navigation.`);

    for (const link of links) {
      try {
        const response = await request.get(link);
        if (!response.ok()) {
          console.log(`Broken link: ${link} | Status: ${response.status()}`);
        }
      } catch (error) {
        console.log(`Error fetching link: ${link} | Error: ${error}`);
      }
    }
  });
})


