import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://practicetestautomation.com/');
  await page.getByRole('link', { name: 'Courses', exact: true }).click();
  await page.close();

  // ---------------------
});