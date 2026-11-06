import { OrderPage } from '../orderPage';
import { BaseDessert } from './baseDessert';
import { PriceControl } from './PriceControl';
import { expect } from '@playwright/test';
import { OrderMock } from '../../fixtures'; 

export async function orderMaker(
    dessertPage: BaseDessert,
    orderPage: OrderPage,
    priceControl: PriceControl,
    orderMock: OrderMock
): Promise<void> {

    await dessertPage.addToChart();
    await dessertPage.openOrder();
    await dessertPage.submitOrder();

    await orderPage.fillUserForm();

    const initialPrice = await priceControl.getInitialPrice();

    const selectedDelivery = await orderPage.selectRandomDelivery();

    await priceControl.checkDeliveryPrice(initialPrice, selectedDelivery);

    await orderPage.submitOrder();

    expect(orderMock.wasIntercepted()).toBe(true);
}