import { test, expect } from '../../../fixtures/index';
import { BentoCake, Cake, WedCake} from '../../../pages/dessert/cakes';
import { BombMakaron,Traifl, Musse} from '../../../pages/dessert/desserts';
import { MainPage } from '../../../pages/mainPage';
import { OrderPage } from '../../../pages/orderPage';
import { orderMaker } from '../../../helper/orderMaker';
import { PriceControl } from '../../../helper/priceControl';


test.beforeEach(async({page})=> {
  await page.goto('',{ waitUntil: 'domcontentloaded'});
  await expect(page).toHaveTitle(/ЦЕХ/);
})


test('bento', async({page, orderMock, mainPage, orderPage, priceControl})=>{
  const bentoPage=new BentoCake(page);

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

  const cakePage=new Cake(page);

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


test('traifl order e2e', async ({page,orderMock,mainPage,orderPage,priceControl
}) => {
  const traiflPage = new Traifl(page);

  await mainPage.chooseDessert(mainPage.traifl);

  await expect.poll( async () => await traiflPage.tasteCheckbox.count(),
    {
      message: 'Ожидание загрузки вкусов трайфлов',
      timeout: 20000,
      intervals: [500, 1000, 2000]
    }
  ).toBeGreaterThan(0);

  await traiflPage.selectRandomOption(traiflPage.tasteCheckbox);

  await orderMaker(traiflPage,orderPage,priceControl,orderMock);
});

test('macaron order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const macaronPage = new BombMakaron(page);

  await mainPage.chooseDessert(mainPage.macaron);
  await macaronPage.selectRandomOption(macaronPage.tasteCheckbox);

 await orderMaker(macaronPage, orderPage, priceControl, orderMock, mainPage);
});


test('musse cake order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const mussePage = new Musse(page);

  await mainPage.chooseDessert(mainPage.muss);

  await mussePage.colorSlctr.click();
  await mussePage.selectRandomOption(mussePage.colorOption);
  await mussePage.weightSlctr.click();
  await mussePage.selectRandomOption(mussePage.weightOption);

  await mussePage.selectRandomOption(mussePage.tasteCheckbox);

  await orderMaker(mussePage,orderPage,priceControl,orderMock);
});


test('wedding cake order e2e', async ({page,orderMock,mainPage,orderPage,priceControl}) => {
  const weddingPage = new WedCake(page);

  await mainPage.chooseDessert(mainPage.weddingCake);

  await weddingPage.weightSlctr.click();
  await weddingPage.selectRandomOption( weddingPage.weightOption);

  await weddingPage.selectRandomOption(weddingPage.tasteCheckbox);

  await orderMaker(weddingPage,orderPage,priceControl,orderMock, mainPage);
});