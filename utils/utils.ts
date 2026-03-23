import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { NavigationBar } from '../page-objects/NavigationBar';

type SubMenuItem = {
  name: string;
};

type MenuSection = {
  menuName: string;
  items: SubMenuItem[];
};

export class NavigationValidator {
  private page: Page;
  private navBar: NavigationBar;
  private context: BrowserContext;

  constructor(page: Page, navBar: NavigationBar, context: BrowserContext) {
    this.page = page;
    this.navBar = navBar;
    this.context = context;
  }

  async validateMenu(section: MenuSection) {
    const menu = this.navBar.getMenu(section.menuName);

    for (const item of section.items) {
      await menu.hover();
      await this.page.waitForTimeout(300); // wait for animation

      //Get submenu locator
      const locator = this.navBar.getSubMenuItemByName(item.name);
      await locator.waitFor({ state: 'visible', timeout: 5000 });
      await locator.scrollIntoViewIfNeeded();

      // Read href dynamically
      const href = await locator.getAttribute('href');

      // Click the submenu
      // Handle external links that open in new tab
      const target = await locator.getAttribute('target');
      if (target === '_blank') {
        const [newPage] = await Promise.all([
          this.context.waitForEvent('page'),
          locator.click({ force: true }),
        ]);
        await newPage.waitForLoadState('domcontentloaded');
        if (href) {
          await expect(newPage).toHaveURL(new RegExp(href, 'i'));
        }
        await newPage.close();
      } else {
        await locator.click({ force: true });
        await this.page.waitForLoadState('domcontentloaded');

        if (href) {
          await expect(this.page).toHaveURL(new RegExp(href, 'i'));
        }

        // Go back to re-hover the menu for the next item
        await this.page.goBack();
      }
    }
  }
}