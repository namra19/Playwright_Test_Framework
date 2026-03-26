import { Page, Locator, BrowserContext, expect } from '@playwright/test';
import { NavigationBar } from '../page-objects/NavigationBar';

export class NavigationValidator {

  private page: Page;
  private navBar: NavigationBar;
  private context: BrowserContext;

  constructor(page: Page, navBar: NavigationBar, context: BrowserContext) {
    this.page = page;
    this.navBar = navBar;
    this.context = context;
  }

  async hoverMenu(menu: Locator) {
    await menu.waitFor({ state: 'visible', timeout: 2000 });
    await menu.hover();
  }

  async getDropdownLinks(menu: Locator, dropdown: Locator) {
    await menu.hover();
    await dropdown.waitFor({ state: 'visible' });
    const anchors = dropdown.locator('.navbar5_dropdown-column a');

    const products: string[] = [];
    const links = [];
    const count = await anchors.count();
    for (let i = 0; i < count; i++) {
      const text = (await (anchors.nth(i)).innerText()).replace('/', '').split('\n')[0].trim();
      console.log(`Extracted text: "${text}" from link ${i}`);
      const href = await anchors.nth(i).getAttribute('href');
      products.push(text);
      links.push({
        href: href,
      });
      console.log(`Found link: href: "${links[i].href}"`);
    }
    return { products: products, links: links };

  }
  
  async verifyDropdownButtons(menu: Locator, expectedButtons: string[]) {
    await this.hoverMenu(menu);
    const buttons = menu.locator('div[role="button"]');
    const count = await buttons.count();
    const actualButtons: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = (await buttons.nth(i).innerText()).trim();
      actualButtons.push(text);
      expect(await buttons.nth(i).isEnabled()).toBe(true);
    }

    for (const expected of expectedButtons) {
      expect(actualButtons).toContain(expected);
    }

    console.log('All dropdown buttons for "${await menu.innerText()}" verified.');
  }

  productsMenu(): Locator {
    return this.page.locator('nav >> .navbar6_menu-link-list');
  }

  ourAIMenu(): Locator {
    return this.page.locator('nav >> text=Our AI');
  }

  resourcesMenu(): Locator {
    return this.page.locator('nav >> text=Resources');
  }

  dropdownLinks(menuText: string): Locator {
    return this.page.locator(`nav >> text=${menuText} >> xpath=..//ul//a`);
  }

  dropdownButtons(menuText: string): Locator {
    return this.page.locator(`nav >> text=${menuText} >> xpath=..//ul//button`);
  }
}