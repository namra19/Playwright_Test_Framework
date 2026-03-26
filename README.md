# Playwright_Test_Framework

This repository contains automated tests for the Darktrace Navigation bar. 

### Framework Description
This automation framework is built using Playwright with TypeScript for web testing.

### Installation

* Install Node.js -  Visit https://nodejs.org/
* Clone the repo: https://github.com/namra19/Playwright_Test_Framework.git
* Install NPM Packages: $ npm install
* Install Playwright browsers:
- init playwright@latest
- npm install playwright --save-dev 
- npm install @playwright/test --save -dev

* Install Typescript: npm install typescript --save-dev


### Running Tests

* Run Tests on Playwright Test Runner (headless): npx playwright test
* Run Tests in UI mode for debugging: npx playwright test --ui or npx playwright test --headed
* Run Tests in a Specific Browser: npx playwright test --project chromium
* Run a specific test case: npx playwright test homePage.spec.ts

### Framework Tools and Languages

* Playwright 1.58.2
* Typescript 5.9.3
* Node v18.16.0
* Visual Studio Code 

### Test Reports & Screenshots

* After running the tests, Playwright generates reports:
HTML Report - npx playwright show-report

* Screenshots/videos on failure are stored in the default test-results/ folder

### Project Structure

* Page Objects - Contains all the selectors for test cases for channable pricing page
* Tests - Main test suite for pricing page
* playwright.config.ts - Playwright configuration
* package.json - Scripts and dependencies
* tsconfig.json - TypeScript configuration

## Project Structure 
```
├── fixtures                # test data
│
├── page-objects            # Page Objects and Base Page
│
├── tests
│   ├── getDemo.spec.ts     # test cases for request a demo flow
    ├── homePage.spec.ts.   # test cases for navigation bar and generic tests for home page
│
├── utils                   # Helper functions to be used across framework           
├── playwright.config.ts    # Playwright configuration
├── tsconfig.config.json    # Typescript configuration
└── README.md
```

### Test Coverage
The test suite focuses on validating the homepage and navigation bar functionality, ensuring both UI behavior and link integrity.

* Home Page Validation
- Verify that the home page loads successfully
- Validate that the page title is correct

* Navigation Bar UI & Behavior
- Verify all navigation bar items are visible
- Ensure the navigation bar remains visible during scrolling
- Validate hover interactions across all main menu items:
** Platform
** Solutions
** Why Darktrace
** Resources
- Verify that clicking the logo redirects to the homepage

* Navigation Menu Validation
Validate dropdown menu structure for Platform navigation
Validate dropdown menu structure for Resources navigation (known failing test based on current requirements mismatch)

* Link Integrity
Verify that all navigation menu links are functional
Detect and report broken links based on HTTP response status

* Performance Validation
Ensure all page resources load within acceptable performance limits
Flag any resources taking longer than 1 second to load

* Notes
- One test (Resources navigation menus) is intentionally failing due to a mismatch between implementation and expected requirements (as mentioned in the document)
- Link validation uses API requests to verify response status codes
- Performance checks are based on browser performance API


### Features of Playwright Framework

* Page Object Model (POM) design pattern
* Centralized URL management via fixtures
* Interactive test execution using Playwright UI
* Automatic retries for failed tests (configured in playwright.config.ts)
* Built-in support for screenshots and video recording on failure






