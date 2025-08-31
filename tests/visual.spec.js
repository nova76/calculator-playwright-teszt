const { test, expect } = require('@playwright/test');

test.describe('Számológép Vizuális Tesztek', () => {
  
  test('Számológép alapértelmezett megjelenése', async ({ page }) => {
    await page.goto('/');
    
    // Teljes oldal screenshot
    await expect(page).toHaveScreenshot('calculator-initial-state.png');
  });

  test('Számok beírása után megjelenés', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#number1').fill('42');
    await page.locator('#number2').fill('37');
    
    // Screenshot a beírt számokkal
    await expect(page).toHaveScreenshot('calculator-with-numbers.png');
  });

  test('Sikeres eredmény megjelenése', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#number1').fill('25');
    await page.locator('#number2').fill('17');
    await page.locator('#add-btn').click();
    
    // Screenshot a sikeres eredménnyel
    await expect(page).toHaveScreenshot('calculator-success-result.png');
  });

  test('Hibaüzenet megjelenése', async ({ page }) => {
    await page.goto('/');
    
    await page.locator('#number1').fill('10');
    await page.locator('#number2').fill('0');
    await page.locator('#divide-btn').click();
    
    // Screenshot a hibaüzenettel
    await expect(page).toHaveScreenshot('calculator-error-message.png');
  });
});
