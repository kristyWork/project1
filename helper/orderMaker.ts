import { OrderPage } from '../pageObject/orderPage';
import { BaseDessert } from '../pageObject/baseDessert';
import { BombMakaronPage } from '../pageObject/pageOfDessert/bombMacaronPage';
import { MainPage } from '../pageObject/mainPage';
import { PriceControl } from './priceControl';
import { expect } from '@playwright/test';
import { OrderMock } from './fixtures';
import { WedCakePage } from '../pageObject/pageOfDessert/wedCakePage';

export async function orderMaker(
  dessertPage: BaseDessert,
  orderPage: OrderPage,
  priceControl: PriceControl,
  orderMock: OrderMock,
  mainPage?: MainPage,
): Promise<void> {

  await dessertPage.addToChart();

  if (dessertPage instanceof BombMakaronPage || dessertPage instanceof WedCakePage ) {
    if (!mainPage) {
    throw new Error('Для BombMakaronPage необходим mainPage');
  };
    await mainPage.openPack();
    await mainPage.submitOrder();

  } else {
    await dessertPage.openOrder();
    await dessertPage.submitOrder();
  }

  await orderPage.fillUserForm();

  const initialPrice = await priceControl.getInitialPrice();

  const selectedDelivery =await orderPage.selectRandomDelivery();

  await priceControl.checkDeliveryPrice(initialPrice,selectedDelivery);

  await orderPage.submitOrder();

  expect(orderMock.wasIntercepted()).toBe(true);
}
