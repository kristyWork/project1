import { BombMakaron} from '../../../pages/dessert/desserts';
import { MainPage } from '../../../pages/mainPage';
import { OrderPage } from '../../../pages/orderPage';
import { test, expect } from '../../../fixtures/index';
import { orderMaker } from '../../../helper/orderMaker';
import { PriceControl } from '../../../helper/priceControl';
import { CartControl } from '../../../helper/сartControl';

test.beforeEach(async({page})=> {
  await page.goto('',{ waitUntil: 'domcontentloaded'});
  await expect(page).toHaveTitle(/ЦЕХ/);
})


test('quantity control bomb cake', async ({page,orderMock, mainPage,priceControl,orderPage}) => {
  const bombCakePage = new BombMakaron(page);
  const cartControl = new CartControl(page);
  await mainPage.chooseDessert(mainPage.bombCake);
  await bombCakePage.selectRandomOption(bombCakePage.tasteCheckbox);
  const quantity = await bombCakePage.quantity.changeQuantity(1);
  await bombCakePage.quantity.checkQuantity(quantity);
  const selectedDessert = await bombCakePage.captureDessert(quantity);
  const cartItems = await cartControl.getCartItems();
  await orderMaker(bombCakePage,orderPage,priceControl,orderMock, mainPage);


});


test('quantity control macaron test', async ({page, mainPage,priceControl}) => {
  const macaronPage = new BombMakaron(page);
  const cartControl = new CartControl(page);
  await mainPage.chooseDessert(mainPage.macaron);
  await macaronPage.selectRandomOption(macaronPage.tasteCheckbox);
  const quantity = await macaronPage.quantity.changeQuantity(4);
  await macaronPage.quantity.checkQuantity(quantity);
  const selectedDessert = await macaronPage.captureDessert(quantity);
  await macaronPage.addToChart();
  await mainPage.openPack()
  await mainPage.submitOrder();
  await cartControl.debugCart();
  const cartItems = await cartControl.getCartItems();
  expect(cartItems.length).toBeGreaterThan(0);
  await cartControl.checkCartItem(selectedDessert);
  await priceControl.checkTotalPrice([selectedDessert]);
});
