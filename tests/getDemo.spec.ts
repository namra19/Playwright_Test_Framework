import { test } from '@playwright/test';
import { HomePage } from '../page-objects/HomePage';
import { DemoPage } from '../page-objects/DemoPage';
import { demoUser } from '../fixtures/DemoUser';

test.describe('Darktrace - Get a Demo Flow', () => {
  let homePage: HomePage;
  let demoPage: DemoPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    demoPage = new DemoPage(page);
    await homePage.open();
  });

  test('User should complete full demo request flow', async () => {
    await demoPage.clickGetDemo();

    // Step 1
    await demoPage.verifyFormLoaded();
    await demoPage.fillStep1({
      email: demoUser.email,
      firstName: demoUser.firstName,
      lastName: demoUser.lastName,
    });
    await demoPage.goToStep2();

    // Step 2
    await demoPage.fillStep2({
      phone: demoUser.phone,
      jobTitle: demoUser.jobTitle,
      company: demoUser.company,
      employees: demoUser.employees,
    });

    await demoPage.goToStep3();

    // Step 3
    await demoPage.fillStep3({
      country: demoUser.country
    });

    await demoPage.acceptTerms();
    await demoPage.submitForm();
    await demoPage.verifySubmissionSuccess();
  });
});