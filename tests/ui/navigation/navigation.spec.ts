import { test, expect } from '../../../fixtures/index';
import { MainPage } from '../../../pages/mainPage';

test.beforeEach(async({page})=> {
  await page.goto('',{ waitUntil: 'domcontentloaded'});
  await expect(page).toHaveTitle(/ЦЕХ/);
})

test('get started link', async ({ page }) => {
  await page.goto('');

  await page.getByRole('link', { name: 'Бенто-торты' }).click();

  await expect(page).toHaveTitle(/Бенто торт/);
});
