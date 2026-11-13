
import { Page, Locator, expect } from '@playwright/test';

export class QuantityControl {
  readonly quantityMinus: Locator;
  readonly quantityInput: Locator;
  readonly quantityPlus: Locator;

  constructor(page: Page) {
    const product = page.locator(
      '.t-store__prod-popup__container'
    ).filter({ visible: true });

    const quantityBlock = product.locator(
      '.t-store__prod__quantity'
    );

    this.quantityMinus = quantityBlock.locator(
      '.t-store__prod__quantity__minus-wrapper'
    );

    this.quantityInput = quantityBlock.locator(
      'input.t-store__prod__quantity-input'
    );

    this.quantityPlus = quantityBlock.locator(
      '.t-store__prod__quantity__plus-wrapper'
    );
  }

  async getQuantity(): Promise<number> {
    const value = await this.quantityInput.inputValue();
    const quantity = Number(value);

    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new Error(`Некорректное количество: ${value}`);
    }

    return quantity;
  }
  
  async changeQuantity(amount: number): Promise<number> {
  if (!Number.isInteger(amount)) {
    throw new Error('Изменение количества должно быть целым числом');
  }

  const initial = await this.getQuantity();
  const expected = initial + amount;

  if (expected < 1) {
    throw new Error('Количество не может быть меньше 1');
  }

  const button = amount > 0
    ? this.quantityPlus
    : this.quantityMinus;

  for (let i = 0; i < Math.abs(amount); i++) {
    const next = initial + Math.sign(amount) * (i + 1);

    await button.click();

    await expect(this.quantityInput).toHaveValue(
      String(next),
      { timeout: 5000 }
    );
  }

  return expected;
  }


  async checkQuantity(expected: number): Promise<void> {

    await expect(this.quantityInput).toHaveValue(String(expected));
  }
}
