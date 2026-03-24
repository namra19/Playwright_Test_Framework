
import { Locator, Page, expect } from '@playwright/test';

type SubMenuItem = {
    label: string;
    urlPart?: string;
    opensNewTab?: boolean;
};

type MenuSection = {
    menuName: string;
    subItems: SubMenuItem[];
};

export class NavigationBar {

    readonly page: Page;
    
    readonly platform: Locator;
    readonly solutions: Locator;
    readonly whyDarktrace: Locator;
    readonly resources: Locator;
    readonly getDemo: Locator;
    readonly navBar: Locator;
    readonly logo: Locator;


    constructor(page: Page) {
        this.page = page;
        this.platform = page.getByRole('button', { name: 'Platform' });
        this.solutions = page.getByRole('button', { name: 'Solutions' });
        this.whyDarktrace = page.getByRole('button', { name: 'Why Darktrace' });
        this.resources = page.getByRole('button', { name: 'Resources' });
        this.getDemo = page.getByRole('navigation').getByRole('link', { name: 'Get a demo' });
        this.navBar = page.locator('.navbar6_menu-inner').first()
        this.logo = page.getByRole('navigation').getByRole('link').filter({ hasText: '.logo-svg path { transition:' })

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

    getMenu(menuName: string): Locator {
        return this.page
            .locator('nav')
            .getByRole('button', { name: menuName, exact: true })
            .first();
    }

    async assertLogoVisible() {
        await expect(this.logo).toBeVisible();
    }

    async assertLogoLinksToHome() {
        await expect(this.logo).toHaveAttribute('href', '/');
    }

    async clickLogo() {
        await this.logo.click();
    }

    getSubMenuItemByName(name: string): Locator {
        return this.page.getByRole('link', { name }).first();

    }
}   
