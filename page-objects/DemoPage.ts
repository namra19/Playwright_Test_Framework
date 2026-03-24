// page-objects/DemoPage.ts
import { BasePage } from './BasePage';
import { Page, Locator, expect } from '@playwright/test';

export class DemoPage extends BasePage {
  readonly getADemoButton: Locator;
  readonly formFrame;

  // Step 1
  readonly businessEmailInput: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly nextButton: Locator;

  // Step 2
  readonly phoneInput: Locator;
  readonly jobTitleInput: Locator;
  readonly companyNameInput: Locator;
  readonly employeesDropdown: Locator;
  readonly nextButtonStep2: Locator;

  // Step 3
  readonly countryDropdown: Locator;
  readonly regionDropdown: Locator;
  readonly agreeCheckbox: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    super(page);

    this.getADemoButton = page.getByRole('link', { name: /get a demo/i });

    this.formFrame = page.frameLocator('iframe[src*="form"], iframe[src*="hsforms"], iframe[src*="marketo"]');

    // Step 1
    this.businessEmailInput = this.formFrame.getByRole('textbox', { name: /business email/i });
    this.firstNameInput = this.formFrame.getByRole('textbox', { name: /first name/i });
    this.lastNameInput = this.formFrame.getByRole('textbox', { name: /last name/i });
    this.nextButton = this.formFrame.getByRole('button', { name: /^next$/i });

    // Step 2
    this.phoneInput = this.formFrame.getByRole('textbox', { name: /phone/i });
    this.jobTitleInput = this.formFrame.getByRole('textbox', { name: /job title/i });
    this.companyNameInput = this.formFrame.getByRole('textbox', { name: /company/i });
    this.employeesDropdown = this.formFrame.getByLabel(/number of employees/i);
    this.nextButtonStep2 = this.formFrame.getByRole('button', { name: /^next$/i });

    // Step 3
    this.countryDropdown = this.formFrame.getByLabel(/country/i);
    this.regionDropdown = this.formFrame.getByLabel(/state|region/i);
    this.agreeCheckbox = this.formFrame.getByRole('checkbox');
    this.submitButton = this.formFrame.getByRole('button', { name: /submit/i });
  }

  async clickGetDemo() {
    await this.getADemoButton.first().click();
  }

  async verifyFormLoaded() {
    await expect(this.businessEmailInput).toBeVisible();
  }

  // Step 1
  async fillStep1(data: { email: string; firstName: string; lastName: string }) {
    await this.businessEmailInput.fill(data.email);
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
  }

  async goToStep2() {
    await this.nextButton.click();
  }

  // Step 2
  async fillStep2(data: { phone: string; jobTitle: string; company: string; employees: string }) {
    await expect(this.phoneInput).toBeVisible();
    await this.phoneInput.fill(data.phone);
    await this.jobTitleInput.fill(data.jobTitle);
    await this.companyNameInput.fill(data.company);
    await this.selectEmployees(data.employees);
  }

  async selectEmployees(value: string) {
    await this.employeesDropdown.click();
    await this.formFrame.getByRole('option', { name: value, exact: true }).click();
  }

  async goToStep3() {
    await this.nextButtonStep2.click();
  }

  // Step 3
  async fillStep3(data: { country: string }) {
    await expect(this.countryDropdown).toBeVisible();
    await this.selectCountry(data.country);
  }

  async selectCountry(value: string) {
    await this.countryDropdown.click();
    await this.formFrame.getByRole('option', { name: value, exact: true }).click();
  }

  async acceptTerms() {
    await this.agreeCheckbox.check();
  }

  async submitForm() {
    await this.submitButton.click();
  }

  async verifySubmissionSuccess() {
    await expect(this.page).toHaveURL(/thank|success|demo/i);
  }
}