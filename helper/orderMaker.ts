import { OrderPage } from '../pages/orderPage';
import { BaseDessert } from '../pages/baseDessert';
import { MainPage } from '../pages/mainPage';
import { PriceControl } from './priceControl';
import { expect } from '@playwright/test';
import { OrderMock } from '../fixtures/index';
import { WedCake } from '../pages/dessert/cakes';
import { BombMakaron } from '../pages/dessert/desserts';

export async function orderMaker(
  dessertPage: BaseDessert,
  orderPage: OrderPage,
  priceControl: PriceControl,
  orderMock: OrderMock,
  mainPage?: MainPage,
): Promise<void> {

  await dessertPage.addToChart();

  if (dessertPage instanceof BombMakaron || dessertPage instanceof WedCake ) {
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
