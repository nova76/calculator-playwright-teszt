const { test, expect } = require('@playwright/test');

test.describe('Számológép Teljesítmény Tesztek', () => {

  test('Oldal betöltési idő', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Ellenőrizzük, hogy az oldal 2 másodpercen belül betöltődik
    expect(loadTime).toBeLessThan(2000);

    console.log(`⚡ Oldal betöltési idő: ${loadTime}ms`);
  });

  test('Műveletek válaszideje', async ({ page }) => {
    await page.goto('/');

    await page.locator('#number1').fill('100');
    await page.locator('#number2').fill('50');

    const startTime = Date.now();
    await page.locator('#add-btn').click();

    // Várjuk az eredményt
    await expect(page.locator('#result')).toHaveText('100 + 50 = 150');

    const responseTime = Date.now() - startTime;

    // A számolási műveletnek 500ms alatt kell megtörténnie
    expect(responseTime).toBeLessThan(500);

    console.log(`🧮 Számolási válaszidő: ${responseTime}ms`);
  });

  test('Több művelet egymás után', async ({ page }) => {
    await page.goto('/');

    const operations = [
      { num1: '10', num2: '5', btn: '#add-btn', result: '10 + 5 = 15' },
      { num1: '20', num2: '8', btn: '#subtract-btn', result: '20 - 8 = 12' },
      { num1: '4', num2: '7', btn: '#multiply-btn', result: '4 × 7 = 28' },
      { num1: '15', num2: '3', btn: '#divide-btn', result: '15 ÷ 3 = 5' }
    ];

    const startTime = Date.now();

    for (const op of operations) {
      await page.locator('#number1').fill(op.num1);
      await page.locator('#number2').fill(op.num2);
      await page.locator(op.btn).click();

      await expect(page.locator('#result')).toHaveText(op.result);

      // Törölünk minden művelet után
      await page.locator('#clear-btn').click();
    }

    const totalTime = Date.now() - startTime;

    // 4 műveletnek 5 másodpercen belül kell lezajlania
    expect(totalTime).toBeLessThan(5000);

    console.log(`🔄 Összes művelet ideje: ${totalTime}ms`);
  });
});