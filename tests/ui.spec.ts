import{ BentoPage } from '../pageObject/pageOfDessert/bentoPage';
import {  BombMakaronPage } from '../pageObject/pageOfDessert/bombMacaronPage';
import { CakePage } from '../pageObject/pageOfDessert/cakePage';
import { MussePage } from '../pageObject/pageOfDessert/mussePage';
import { TraiflPage } from '../pageObject/pageOfDessert/traiflPage';
import { WedCakePage } from '../pageObject/pageOfDessert/wedCakePage';
import { MainPage } from '../pageObject/mainPage';
import { OrderPage } from '../pageObject/orderPage';
import { test, expect } from './fixtures';
import { orderMaker } from '../pageObject/helper/orderMaker';

test.beforeEach(async({page})=> {
  await page.goto('https://cehgrodno.by/');
  await expect(page).toHaveTitle(/ЦЕХ/);
})

test('get started link', async ({ page }) => {
  await page.goto('');

  await page.getByRole('link', { name: 'Бенто-торты' }).click();

  await expect(page).toHaveTitle(/Бенто торт/);
});

test('bento', async({page, orderMock, mainPage, orderPage})=>{
  const bentoPage=new BentoPage(page);

  await mainPage.chooseDessert(mainPage.bento);
  await expect(page).toHaveTitle(/Бенто торт/);

  await bentoPage.weightSlctr.click();
  await bentoPage.selectRandomOption(bentoPage.weightOption);

  await bentoPage.selectRandomOption(bentoPage.tasteCheckbox);

  await bentoPage.cendelSlctr.click();
  await bentoPage.selectRandomOption(bentoPage.cendelOption);

  await bentoPage.decorSlctr.click();
  await bentoPage.selectRandomOption(bentoPage.decorOption);

  await orderMaker(bentoPage, orderPage, priceControl, orderMock);

});

test('cake', async({page, orderMock, mainPage, orderPage})=>{

  const cakePage=new CakePage(page);

  await mainPage.chooseDessert(mainPage.cake);
  await expect(page).toHaveTitle(/Торты от 2000 грамм/);
  await cakePage.weightSlctr.click();
  await cakePage.selectRandomOption(cakePage.weightOption);
  await cakePage.tasteSlctr.click();
  await cakePage.selectRandomOption(cakePage.tasteOption);
  await cakePage.cendelSlctr.click();
  await cakePage.selectRandomOption(cakePage.cendelOption);
  await cakePage.decorSlctr.click();
  await cakePage.selectRandomOption(cakePage.decorOption);

  await orderMaker (cakePage, orderPage, orderMock, mainPage);
});

test('quantity control macaron test', async({page, mainPage})=>{
  const bombMacaronPage =new BombMakaronPage(page);

  await mainPage.chooseDessert(mainPage.macaron);
  await bombMacaronPage.selectRandomOption(bombMacaronPage.tasteCheckbox);
  await bombMacaronPage.quantity.changeQuantity(4);

  //проверка что количество изменилось добавить

  await bombMacaronPage.addToChart();

  await mainPage.openPack();
  await mainPage.submitOrder();

  // метод для сверки цены

})