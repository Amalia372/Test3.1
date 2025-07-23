import { test, expect, chromium } from '@playwright/test';

test('test', async () => {
  // Pornim browserul în mod vizibil și slowMo
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://automationexercise.com/test_cases');
  await page.getByRole('button', { name: 'Consent' }).click();
  await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
  await page.getByRole('link', { name: ' Home' }).click();

  // Intrăm pe pagina unui produs
  await page.locator('div:nth-child(5) > .product-image-wrapper > .choose > .nav > li > a').click();

  // Modificăm cantitatea la 4
  await page.locator('#quantity').click();
  await page.locator('#quantity').fill('4');

  // Adăugăm produsul în coș
  await page.getByRole('button', { name: ' Add to cart' }).click();

  // Mergem la coș
  await page.getByRole('link', { name: 'View Cart' }).click();

  // Verificăm butonul cu cantitatea "4"
  await expect(page.getByRole('button', { name: '4' })).toBeVisible();

  await browser.close();
});
