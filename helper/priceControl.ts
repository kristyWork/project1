
import { Page, Locator, expect } from '@playwright/test';
import type {DessertItem} from '../pages/components/dessertItem';

export function parsePrice(text: string): number {
  const compact = text
    .replace(/[\s\u00a0\u202f]/g, '')
    .replace(/[^\d.,-]/g, '');

  const comma = compact.lastIndexOf(',');
  const dot = compact.lastIndexOf('.');
  const separator = Math.max(comma, dot);

  const normalized = separator < 0
    ? compact
    : compact.slice(0, separator).replace(/[.,]/g, '')
      + '.'
      + compact.slice(separator + 1);

  const price = Number(normalized);

  if (!compact || !Number.isFinite(price) || price < 0) {
    throw new Error(`Не удалось прочитать цену: "${text}"`);
  }

  return price;
}

export class PriceControl {
  readonly totalPrice: Locator;

  constructor(page: Page) {
    this.totalPrice = page.locator(
      '.t706__cartwin-totalamount'
    ).first();
  }

  calculateTotal(items: DessertItem[]): number {
    const totalInCents = items.reduce((sum, item) => {
      if (!Number.isInteger(item.quantity) || item.quantity < 1) {
        throw new Error(
          `Некорректное количество для ${item.name}`
        );
      }

      const unitPriceInCents = Math.round(item.unitPrice * 100);

      return sum + unitPriceInCents * item.quantity;
    }, 0);

    return totalInCents / 100;
  }

  async getTotalPrice(): Promise<number> {
    const text = await this.totalPrice.innerText();

    return parsePrice(text);
  }

  async checkTotalPrice(items: DessertItem[]): Promise<void> {
    const expected = this.calculateTotal(items);

    await expect.poll(
      () => this.getTotalPrice(),
      {
        message: `Ожидаемая стоимость товаров: ${expected}`
      }
    ).toBe(expected);
  }

  async checkUnitPrice(
    cartPrice: Locator,
    item: DessertItem
  ): Promise<void> {
    await expect.poll(async () => {
      const text = await cartPrice.innerText();

      return parsePrice(text);
    }).toBe(item.unitPrice);
  }

  async getInitialPrice(): Promise<number> {
    return this.getTotalPrice();
  }

  async checkDeliveryPrice(
    initialPrice: number,
    selectedDelivery: string
  ): Promise<void> {
    const surcharge = selectedDelivery.includes('Курьер')
      ? 12
      : 0;

    await expect.poll(
      () => this.getTotalPrice()
    ).toBe(initialPrice + surcharge);
  }
}
