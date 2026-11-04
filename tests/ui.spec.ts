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
import { OrderPage } from '../pageObject/orderPage';


test.beforeEach(async({page})=> {
  await page.goto('https://cehgrodno.by/');
  await expect(page).toHaveTitle(/ЦЕХ/);
})

test('get started link', async ({ page }) => {
  await page.goto('https://cehgrodno.by/');

  await page.getByRole('link', { name: 'Бенто-торты' }).click();

  await expect(page).toHaveTitle(/Бенто торт/);
});

test('whole prosses of place of order', async({page})=>{
  const mainPage=new MainPage(page);
  const bentoPage=new BentoPage(page);
  const orderPage =new OrderPage(page);

  await mainPage.chooseDessert(mainPage.bento);
  await bentoPage.weightSlctr.click();
  await bentoPage.selectRandomTeste(bentoPage.weightOption);
  await bentoPage.selectRandomTeste(bentoPage.tasteCheckbox);
  await bentoPage.cendelSlctr.click();
  await bentoPage.selectRandomTeste(bentoPage.cendelOption);
  await bentoPage.decorOption.click();
  await bentoPage.selectRandomTeste(bentoPage.decorOption);

  await page.goto('https://cehgrodno.by/');

});
