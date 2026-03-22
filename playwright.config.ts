import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,

  ...(process.env.CI ? { workers: 1 } : {}),

  reporter: 'html',

  projects: [
    {
      name: 'tests',
      testDir: 'tests',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: process.env.BASE_URL || 'https://www.darktrace.com/',
        screenshot: 'only-on-failure',
        trace: 'on-first-retry',
      },
    }
  ],
});
