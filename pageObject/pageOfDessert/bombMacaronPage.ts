
import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../baseDessert';
import { QuantityControl } from '../../helper/QuantityControl';

export class BombMakaronPage extends BaseDessert {
  tasteCheckbox: Locator;
  quantity: QuantityControl;

  constructor(page: Page) {
    super(page);

    const product = page.locator(
      '.t-store__prod-popup__container:visible'
    );

    this.tasteCheckbox = product.locator(
      'input.t-checkbox[type="checkbox"]'
    );

    this.quantity = new QuantityControl(page);
  }
}
