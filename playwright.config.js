// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',

  /* Párhuzamos tesztek száma */
  fullyParallel: true,

  /* Hibás teszt esetén ne folytassuk a többi teszt futtatását */
  forbidOnly: !!process.env.CI,

  /* Újrapróbálkozások száma CI környezetben */
  retries: process.env.CI ? 2 : 0,

  /* Párhuzamos worker-ek száma */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter konfiguráció */
  reporter: [
    ['html'],
    ['list'],
    ['junit', { outputFile: 'test-results/results.xml' }]
  ],

  /* Globális teszt beállítások */
  use: {
    /* Alap URL minden tesztnél */
    baseURL: 'http://localhost:3000',

    /* Screenshot készítés hiba esetén */
    screenshot: 'only-on-failure',

    /* Videó felvétel hiba esetén */
    video: 'retain-on-failure',

    /* Trace fájl mentése hiba esetén */
    trace: 'on-first-retry',
  },

  /* Különböző böngészők konfigurációja */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      /*snapshotDir: './test-results/snapshots',*/
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Mobile viewports tesztelése */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Webserver indítása tesztek előtt */
  // webServer: {
  //   command: 'npm start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
