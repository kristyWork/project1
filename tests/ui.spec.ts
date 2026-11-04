// @ts-check
import { test, expect } from '@playwright/test';
import { beforeEach } from 'node:test';
import { BentoPage } from '../pageObject/pageOfDessert/bentoPage';
import { BombCakePage } from '../pageObject/pageOfDessert/bombCakePage';
import { CakePage } from '../pageObject/pageOfDessert/cakePage';
import { MacaronPage } from '../pageObject/pageOfDessert/macaronPage';
import { MussePage } from '../pageObject/pageOfDessert/mussePage';
import { TraiflPage } from '../pageObject/pageOfDessert/traiflPage';
import { WedCakePage } from '../pageObject/pageOfDessert/wedCakePage';
import { MainPage } from '../pageObject/mainPage';


test.beforeEach(async({page})=> {
  await page.goto('https://cehgrodno.by/');
  await expect(page).toHaveTitle(/ЦЕХ/);
})

test('get started link', async ({ page }) => {
  await page.goto('https://cehgrodno.by/');

  await page.getByRole('link', { name: 'Бенто-торты' }).click();

  await expect(page).toHaveTitle(/Бенто торт/);
});
