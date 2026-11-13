import { expect } from '@playwright/test';
import type { DessertItem } from '../pages/components/dessertItem';
import { Page, Locator } from '@playwright/test';

export type CartItem = {
  name: string;
  flavor: string | null;
  quantity: string | null;
  total: string | null;
};

export class CartControl {
  readonly cartItems: Locator;

  constructor(page: Page) {
    this.cartItems = page.locator('.t706__product');
  }

 
async getCartItems(): Promise<CartItem[]> {
  return this.cartItems.evaluateAll(elements =>
    elements.map(element => {
      const title = element.querySelector(
        '.t706__product-title'
      )?.textContent?.trim() ?? '';

      const parts = title.split(/\s+Вкусы:\s*/i);

      return {
        name: parts[0].trim(),
        flavor: parts[1]?.trim() || null,

        quantity: element.querySelector(
          '.t706__product-quantity'
        )?.textContent?.trim() ?? null,

        total: element.querySelector(
          '.t706__product-amount'
        )?.textContent?.trim() ?? null
      };
    })
  );
}

   

  async debugCart(): Promise<void> {
    const items = await this.cartItems.count();

    console.log('Видимых строк корзины:', items);

    const data = await this.getCartItems();

    console.log(
      'Содержимое корзины:',
      JSON.stringify(data, null, 2)
    );
  }

  async checkCartItem(expected: DessertItem): Promise<void> {
  const cartItems = await this.getCartItems();

  const matchingItems = cartItems.filter(
    item => item.name === expected.name
  );

  expect(
    matchingItems.length,
    `Не найден десерт "${expected.name}" в корзине`
  ).toBeGreaterThan(0);

  const expectedTotal = expected.unitPrice * expected.quantity;

  const item = matchingItems[0];

  expect(Number(item.quantity)).toBe(expected.quantity);

  const actualTotal = Number(
    (item.total ?? '')
      .replace(/\s/g, '')
      .replace(/[^\d.,]/g, '')
      .replace(',', '.')
  );

  expect(actualTotal).toBeCloseTo(expectedTotal, 2);
}
}
