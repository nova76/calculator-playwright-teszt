const { test, expect } = require('@playwright/test');

test.describe('Számológép Alkalmazás', () => {
  
  test.beforeEach(async ({ page }) => {
    // Navigálás a számológép oldalra minden teszt előtt
    await page.goto('/');
    
    // Ellenőrizzük, hogy a számológép betöltődött
    await expect(page.locator('h1')).toHaveText('Egyszerű Számológép');
  });

  test('Egyszerű összeadás teszt', async ({ page }) => {
    // Számok beírása
    await page.locator('#number1').fill('10');
    await page.locator('#number2').fill('5');
    
    // Összeadás gomb megnyomása
    await page.locator('#add-btn').click();
    
    // Eredmény ellenőrzése
    await expect(page.locator('#result')).toHaveText('10 + 5 = 15');
    await expect(page.locator('#result')).toHaveClass(/success/);
  });

  test('Kivonás teszt', async ({ page }) => {
    await page.locator('#number1').fill('20');
    await page.locator('#number2').fill('8');
    
    await page.locator('#subtract-btn').click();
    
    await expect(page.locator('#result')).toHaveText('20 - 8 = 12');
    await expect(page.locator('#result')).toHaveClass(/success/);
  });

  test('Szorzás teszt', async ({ page }) => {
    await page.locator('#number1').fill('4');
    await page.locator('#number2').fill('7');
    
    await page.locator('#multiply-btn').click();
    
    await expect(page.locator('#result')).toHaveText('4 × 7 = 28');
    await expect(page.locator('#result')).toHaveClass(/success/);
  });

  test('Osztás teszt', async ({ page }) => {
    await page.locator('#number1').fill('15');
    await page.locator('#number2').fill('3');
    
    await page.locator('#divide-btn').click();
    
    await expect(page.locator('#result')).toHaveText('15 ÷ 3 = 5');
    await expect(page.locator('#result')).toHaveClass(/success/);
  });

  test('Nullával való osztás hibakezelése', async ({ page }) => {
    await page.locator('#number1').fill('10');
    await page.locator('#number2').fill('0');
    
    await page.locator('#divide-btn').click();
    
    await expect(page.locator('#result')).toHaveText('Nullával nem lehet osztani!');
    await expect(page.locator('#result')).toHaveClass(/error/);
  });

  test('Hiányos adatok hibakezelése', async ({ page }) => {
    // Csak az első számot írjuk be
    await page.locator('#number1').fill('5');
    
    await page.locator('#add-btn').click();
    
    await expect(page.locator('#result')).toHaveText('Kérlek adj meg mindkét számot!');
    await expect(page.locator('#result')).toHaveClass(/error/);
  });

  test('Törlés funkció teszt', async ({ page }) => {
    // Számok beírása
    await page.locator('#number1').fill('123');
    await page.locator('#number2').fill('456');
    
    // Valamilyen műveletet végzünk
    await page.locator('#add-btn').click();
    await expect(page.locator('#result')).toHaveText('123 + 456 = 579');
    
    // Törlés gomb megnyomása
    await page.locator('#clear-btn').click();
    
    // Ellenőrizzük, hogy minden törlődött
    await expect(page.locator('#number1')).toHaveValue('');
    await expect(page.locator('#number2')).toHaveValue('');
    await expect(page.locator('#result')).toHaveText('Eredmény: -');
  });

  test('Tizedesjegyek kezelése', async ({ page }) => {
    await page.locator('#number1').fill('10.5');
    await page.locator('#number2').fill('2.3');
    
    await page.locator('#add-btn').click();
    
    await expect(page.locator('#result')).toHaveText('10.5 + 2.3 = 12.8');
  });

  test('Negatív számok kezelése', async ({ page }) => {
    await page.locator('#number1').fill('-5');
    await page.locator('#number2').fill('3');
    
    await page.locator('#multiply-btn').click();
    
    await expect(page.locator('#result')).toHaveText('-5 × 3 = -15');
  });

  test('Nagy számok kezelése', async ({ page }) => {
    await page.locator('#number1').fill('999999');
    await page.locator('#number2').fill('1000000');
    
    await page.locator('#add-btn').click();
    
    await expect(page.locator('#result')).toHaveText('999999 + 1000000 = 1999999');
  });
});