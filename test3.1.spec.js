import { test, expect, chromium } from '@playwright/test';

test('Add product and remove from cart', async () => {
  // Lansăm browserul vizibil și cu slowMo pentru debugging
  const browser = await chromium.launch({ headless: false, slowMo: 1000 });
  const context = await browser.newContext();
  const page = await context.newPage();

  // 1. Accesează pagina principală
  await page.goto('https://automationexercise.com/test_cases');
  await page.getByRole('button', { name: 'Consent' }).click();

  // 2. Navighează pe Home
  await expect(page.getByRole('link', { name: ' Home' })).toBeVisible();
  await page.getByRole('link', { name: ' Home' }).click();

  // 3. Hover pe primul produs și click pe Add to cart
  const firstProduct = page.locator('.single-products').first();
  await firstProduct.hover();
  await page.locator('.overlay-content > .btn').first().click();

  // 4. Mergi la View Cart
  await page.getByRole('link', { name: 'View Cart' }).click();

  // 5. Șterge produsul
  await page.getByRole('cell', { name: '' }).locator('a').click();

  // 6. Verifică dacă mesajul "Cart is empty" este vizibil
  await expect(page.locator('#empty_cart')).toContainText('Cart is empty! Click here to buy products.');

  await browser.close();
});
