import { Locator, Page, expect } from '@playwright/test';

// type SubMenuItem = {
//    label: string;
//    urlPart?: string;
//    opensNewTab?: boolean;
// };

// type MenuSection = {
//    menuName: string;
//    subItems: SubMenuItem[];
// };

export class NavigationBar {

    readonly page: Page;

    readonly platform: Locator;
    readonly solutions: Locator;
    readonly whyDarktrace: Locator;
    readonly resources: Locator;
    readonly getDemo: Locator;
    readonly navBar: Locator;
    readonly logo: Locator;
    readonly menuItems: Locator;


    constructor(page: Page) {
        this.page = page;
        this.platform = page.getByRole('button', { name: 'Platform' });
        this.solutions = page.getByRole('button', { name: 'Solutions' });
        this.whyDarktrace = page.getByRole('button', { name: 'Why Darktrace' });
        this.resources = page.getByRole('button', { name: 'Resources' });
        this.getDemo = page.getByRole('navigation').getByRole('link', { name: 'Get a demo' });
        this.navBar = page.locator('.navbar6_menu-inner').first()
        this.logo = page.getByRole('navigation').getByRole('link').filter({ hasText: '.logo-svg path { transition:' })
        this.menuItems = page.locator('header nav >> ul >> li');


    }

    async assertNavItemsVisible() {
        await expect(this.platform).toBeVisible();
        await expect(this.solutions).toBeVisible();
        await expect(this.whyDarktrace).toBeVisible();
        await expect(this.resources).toBeVisible();
        await expect(this.getDemo).toBeVisible();
    }

    async scrollToBottom() {
        await this.page.evaluate(() => {
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    async navBarIsVisible() {
        return await this.navBar.isVisible();
    }

    async hoverOverMenu(menu: Locator) {
        await menu.waitFor({ state: 'visible' });
        await menu.hover();
    }

    async hoverMenu(menuName: string) {
        const menu = this.menuItems.locator(`text=${menuName}`);
        await menu.hover();
    }

    async getSubmenuLinks(menuName: string): Promise<Locator[]> {
        const menu = this.menuItems.locator(`text=${menuName}`);
        await menu.hover();
        const submenuLinks = menu.locator('ul li a');
        const count = await submenuLinks.count();
        const links: Locator[] = [];
        for (let i = 0; i < count; i++) {
            links.push(submenuLinks.nth(i));
        }
        return links;
    }

    getMenu(menuName: string): Locator {
        return this.page
            .locator('nav')
            .getByRole('button', { name: menuName, exact: true })
            .first();
    }

    async clickLogo() {
        await this.logo.click();
    }

    getSubMenuItemByName(name: string): Locator {
        return this.page.getByRole('link', { name }).first();

    }

    topLevelLinks = 'nav a';
    submenuLinks = 'nav li ul li a';

    async getAllNavLinks(): Promise<string[]> {
        const links: string[] = [];

        const topLinks = await this.page.$$eval(this.topLevelLinks, (els) =>
            els.map((el) => (el as HTMLAnchorElement).href)
        );
        links.push(...topLinks);

        const subLinks = await this.page.$$eval(this.submenuLinks, (els) =>
            els.map((el) => (el as HTMLAnchorElement).href)
        );
        links.push(...subLinks);
        return Array.from(new Set(links));
    }
   
}

