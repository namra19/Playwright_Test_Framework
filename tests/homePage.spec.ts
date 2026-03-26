import { test, expect, Browser } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage'
import { NavigationBar } from '../page-objects/NavigationBar';
import { URLs } from '../fixtures/urls';
import { navigationData } from '../fixtures/navigationData';
import { NavigationValidator } from '../utils/utils';

test.describe('Darktrace Homepage Tests', () => {
  let homePage: HomePage;
  let navBar: NavigationBar;

 // const menus = ['Platform', 'Solutions', 'Why Darktrace'];

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
    const isNavBarVisible = await navBar.navBarIsVisible();
    expect(isNavBarVisible).toBeTruthy();
  });

  test('Verify that hover effects work on navigation menu bar', async ({ page }) => {
    await navBar.hoverOverMenu(navBar.platform);
    await navBar.hoverOverMenu(navBar.solutions);
    await navBar.hoverOverMenu(navBar.whyDarktrace);
    await navBar.hoverOverMenu(navBar.resources);
  });

  test('Verify logo redirects to homepage when clicked', async ({ page }) => {
    await navBar.clickLogo();
    await expect(page).toHaveURL(URLs.baseURL);
  });

  test('Validate Product navigation menus', async ({ page, context }) => {
    const validator = new NavigationValidator(page, navBar, context);
    const expectedProductsPlatform = navigationData.find(menu => menu.menuName === 'Platform')?.items || [];
    console.log('Expected Products:', validator.productsMenu());
    const menuItems = await validator.productsMenu();
    const count = await menuItems.count();
    const menuPlatform = page.getByRole('button', { name: 'Platform' });
    const dropdownPlatform = page.getByRole('navigation', { name: 'Platform' });
    const productPlatform = await validator.getDropdownLinks(menuPlatform, dropdownPlatform);
    console.log('Actual Products:', productPlatform.products);
  });

  //This test will fail in the pipeline as it doesn't match the requirements mentioned in the document
  test('Validate Resources navigation menus', async ({ page, context }) => {
    const validator = new NavigationValidator(page, navBar, context);
    const expectedProductsResources = navigationData.find(menu => menu.menuName === 'Resources')?.items || [];
    const menuResources = page.getByRole('button', { name: 'Resources' });
    const dropdownResources = page.getByRole('navigation', { name: 'Resources' });
     const productResources = await validator.getDropdownLinks(menuResources, dropdownResources);
    expect(productResources.products).toEqual( expectedProductsResources); 
  });

  test('Verify navigation menu links are not broken', async ({ page, request }) => {

    const links = await navBar.getAllNavLinks();
    const brokenLinks = [];
    console.log(`Found ${links.length} links in navigation.`);

    for (const link of links) {
      try {
        const response = await request.get(link);
        if (!response.ok()) {
          brokenLinks.push(link);
          console.log(`Broken link: ${link} | Status: ${response.status()}`);
        }
      } catch (error) {
        brokenLinks.push(link);
        console.log(`Error fetching link: ${link} | Error: ${error}`);
      }
      expect(brokenLinks).toEqual([]);
    }
  });

  test('all resources load under 1 second', async ({ page }) => {
  await page.goto(URLs.netwworkURL);
  const slowResources = await page.evaluate(() =>
    performance.getEntriesByType('resource')
      .filter((r: any) => r.duration > 1000)
      .map((r: any) => `${r.name} - ${r.duration}ms`)
  );
  console.log('Slow resources:', slowResources);
  expect(slowResources).toEqual([]);
  });
})