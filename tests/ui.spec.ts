import { BentoPage } from '../pageObject/pageOfDessert/bentoPage';
import { BombMakaronPage } from '../pageObject/pageOfDessert/bombMacaronPage';
import { CakePage } from '../pageObject/pageOfDessert/cakePage';
import { MussePage } from '../pageObject/pageOfDessert/mussePage';
import { TraiflPage } from '../pageObject/pageOfDessert/traiflPage';
import { WedCakePage } from '../pageObject/pageOfDessert/wedCakePage';
import { MainPage } from '../pageObject/mainPage';
import { OrderPage } from '../pageObject/orderPage';
import { test, expect } from '../helper/fixtures';
import { orderMaker } from '../helper/orderMaker';
import { PriceControl } from '../helper/priceControl';
import { CartControl } from '../helper/CartControl';
import { FavoritesPage } from '../pageObject/FavoritesPage';
import { monitorNetwork } from '../helper/NetworkDiagnostics';

test.beforeEach(async({page})=> {
  monitorNetwork(page);
  await page.goto('',{ waitUntil: 'domcontentloaded'});
  await expect(page).toHaveTitle(/ЦЕХ/);
})

test('get started link', async ({ page }) => {
  await page.goto('');

  await page.getByRole('link', { name: 'Бенто-торты' }).click();

  await expect(page).toHaveTitle(/Бенто торт/);
});

test('bento', async({page, orderMock, mainPage, orderPage, priceControl})=>{
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

test('cake', async({page, orderMock, mainPage, orderPage, priceControl})=>{

  const cakePage=new CakePage(page);

  await mainPage.chooseDessert(mainPage.cake);
  await expect(page).toHaveTitle(/Торты 2000 грамм на заказ/);
  await cakePage.weightSlctr.click();
  await cakePage.selectRandomOption(cakePage.weightOption);
  await cakePage.tasteSlctr.click();
  await cakePage.selectRandomOption(cakePage.tasteOption);
  await cakePage.cendelSlctr.click();
  await cakePage.selectRandomOption(cakePage.cendelOption);
  await cakePage.decorSlctr.click();
  await cakePage.selectRandomOption(cakePage.decorOption);

  await orderMaker (cakePage, orderPage, priceControl, orderMock);
});


test('traifl order e2e', async ({page, orderMock,mainPage,orderPage,priceControl}) => {
  const traiflPage = new TraiflPage(page);

  await mainPage.chooseDessert(mainPage.traifl);

  await expect(traiflPage.name).toBeVisible();

  await traiflPage.selectRandomOption(
    traiflPage.tasteCheckbox
  );

  await orderMaker(
    traiflPage,
    orderPage,
    priceControl,
    orderMock
  );
});


test('macaron order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const macaronPage = new BombMakaronPage(page);

  await mainPage.chooseDessert(mainPage.macaron);

  await expect(macaronPage.name).toBeVisible();

  await macaronPage.selectRandomOption(
    macaronPage.tasteCheckbox
  );

  await orderMaker(macaronPage, orderPage,priceControl,orderMock);
});


test('musse cake order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const mussePage = new MussePage(page);

  await mainPage.chooseDessert(mainPage.muss);

  await expect(mussePage.name).toBeVisible();

  await mussePage.colorSlctr.click();

  await mussePage.selectRandomOption(mussePage.colorOption);

  await mussePage.weightSlctr.click();

  await mussePage.selectRandomOption(mussePage.weightOption);

  await mussePage.selectRandomOption(mussePage.tasteCheckbox);

  await orderMaker(mussePage,orderPage,priceControl,orderMock);
});


test('wedding cake order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const weddingPage = new WedCakePage(page);

  await mainPage.chooseDessert(mainPage.weddingCake);

  await expect(weddingPage.name).toBeVisible();

  await weddingPage.weightSlctr.click();

  await weddingPage.selectRandomOption( weddingPage.weightOption);

  await weddingPage.selectRandomOption(weddingPage.tasteCheckbox);

  await orderMaker(weddingPage,orderPage,priceControl,orderMock);
});


test('bomb cake order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const bombCakePage = new BombMakaronPage(page);

  await mainPage.chooseDessert(mainPage.bombCake);

  await expect(bombCakePage.name).toBeVisible();

  await orderMaker(bombCakePage,orderPage,priceControl,orderMock );
});



test('quantity control macaron test', async ({page, mainPage,priceControl}) => {
  const bombMacaronPage = new BombMakaronPage(page);
  const cartControl = new CartControl(page);

  await mainPage.chooseDessert(mainPage.macaron);

  await bombMacaronPage.selectRandomOption(bombMacaronPage.tasteCheckbox);

  const quantity = await bombMacaronPage.quantity.changeQuantity(4);

  await bombMacaronPage.quantity.checkQuantity(quantity);

  const selectedDessert = await bombMacaronPage.captureDessert(quantity);

  await bombMacaronPage.addToChart();

  await mainPage.openPack();

  await mainPage.submitOrder();

  await cartControl.debugCart();

  const cartItems = await cartControl.getCartItems();

  expect(cartItems.length).toBeGreaterThan(0);

  await cartControl.checkCartItem(selectedDessert);
  await priceControl.checkTotalPrice([selectedDessert]);
});


test('add macaron to favorites', async ({page,mainPage}) => {
  const macaronPage = new BombMakaronPage(page);
  const favoritesPage = new FavoritesPage(page);

  await mainPage.chooseDessert(mainPage.macaron);
  const dessertName = (await macaronPage.name.innerText()).trim();

  console.log('Выбранный десерт:', dessertName);

  await macaronPage.addToFavorites();

  await page.goto('');

  await mainPage.openWishList();

  const favoriteNames =await favoritesPage.getFavoriteNames();

  console.log('Избранное:', favoriteNames);

  await favoritesPage.checkFavorite(dessertName);
});
