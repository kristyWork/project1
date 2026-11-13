
import { Page, Locator } from '@playwright/test';
import type { DessertItem } from '../pages/components/dessertItem';
import { parsePrice } from '../helper/priceControl';

export class BaseDessert {
  protected page: Page;

  inBasketBtn: Locator;
  favorites: Locator;
  order: Locator;
  submit: Locator;
  name: Locator;
  price: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inBasketBtn = page.getByRole('link', {name: 'В корзину'});
    this.favorites = page.locator('.t-store__prod-popup__container:visible a.t1002__addBtn');
    this.order = page.locator('div.t706__carticon-imgwrap');
    this.submit = page.getByRole('button', {name: 'Оформить'  });
    this.name = page.locator('.t-store__prod-popup__container:visible .js-store-prod-name');
    const productPopup = page.locator('.t-store__prod-popup__container:visible');
    this.price = page.locator('.t-store__prod-popup__container:visible .js-store-prod-price-val');
  }


async selectRandomOption(slctr: Locator): Promise<void> {
  const count = await slctr.count();

  if (count === 0) {
    throw new Error('Элементы для выбора не найдены');
  }

  const first = slctr.first();

  const tagName = await first.evaluate(
    el => el.tagName.toLowerCase()
  );

  if (tagName === 'select') {
    const options = await first.locator('option').evaluateAll(
      elements => elements
        .map((el, index) => ({
          index,
          disabled: (el as HTMLOptionElement).disabled,
          value: (el as HTMLOptionElement).value
        }))
        .filter(option => !option.disabled && option.value !== '')
    );
    if (options.length === 0) {throw new Error('Нет доступных вариантов');}
    const random = options[Math.floor(Math.random() * options.length)];
    await first.selectOption({ index: random.index });

  } else {
    const visibleLabels = slctr.locator('..').filter({ visible: true});
    const visibleCount = await visibleLabels.count();
    if (visibleCount === 0) {throw new Error('Нет видимых вариантов для выбора');}
    const randomIndex = Math.floor(Math.random() * visibleCount);
    await visibleLabels.nth(randomIndex).click();
  }
}

  
async getSelectedOptions(slctr: Locator): Promise<string[]> {
  const selected: string[] = [];
  const count = await slctr.count();

  for (let i = 0; i < count; i++) {
    const element = slctr.nth(i);

    const tagName = await element.evaluate(el => el.tagName.toLowerCase());

    if (tagName === 'select') {
      const selectedOption = element.locator('option:checked');

      const text = (await selectedOption.textContent() ?? '').trim();
      if (text) {selected.push(text);}

    } else if (tagName === 'input') {
      if (await element.isChecked()) {
        const text = await element.evaluate(el => {
          const input = el as HTMLInputElement;
          const label = input.closest('label');

          return (
            label?.textContent?.trim()
            || input.value
          );
        });

        selected.push(text);
      }
    }
  }

  return selected;
}


async captureDessert(quantity: number): Promise<DessertItem> {
  const name = (await this.name.innerText()).trim();

  const priceText = await this.price.innerText();
  const unitPrice = parsePrice(priceText);

  const dessert: DessertItem = {
    name,
    unitPrice,
    quantity
  };

  return dessert;
}

  async addToChart(): Promise<void> {
    await this.inBasketBtn.click();
  }

  async addToFavorites(): Promise<void> {
    await this.favorites.click();
  }

  async openOrder(): Promise<void> {
    await this.order.click();
  }

  async submitOrder(): Promise<void> {
    await this.submit.click();
  }

}
