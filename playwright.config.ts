import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 60000,
  testDir: './src',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["allure-playwright"]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [

    {
      name: 'chromium-api', // A separate name for the project
      testDir: './src/api', // Only the API test directory
      use: { ...devices['Desktop Chrome'] },
    },

    // Projects for UI tests in multiple browsers
    {
      name: 'chromium',
      testDir: './src/ui',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'webkit',
      testDir: './src/ui',
      use: { ...devices['Desktop Safari'] },
    },

    {
      name: 'firefox',
      testDir: './src/ui',
      use: { ...devices['Desktop Firefox'] },
    },
  ],
});

