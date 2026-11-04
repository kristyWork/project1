import { Page, Locator } from '@playwright/test';

export class QuantityControl {
    quantityMinus: Locator;
    quantityInput: Locator;
    quantityPlus: Locator;

    constructor(page: Page) {
        this.quantityMinus = page.locator(
            '.t-store__prod__quantity__minus-wrapper'
        );

        this.quantityInput = page.locator(
            'input.t-store__prod__quantity-input'
        );

        this.quantityPlus = page.locator(
            '.t-store__prod__quantity__plus-wrapper'
        );
    }

    async changeQuantity(amount: number): Promise<void> {
        const current = Number(
            await this.quantityInput.inputValue()
        );

        const min = Number(
            await this.quantityInput.getAttribute('min') ?? 1
        );

        const max = Number(
            await this.quantityInput.getAttribute('max') ?? 99999
        );

        if (current + amount < min || current + amount > max) {
            throw new Error('Количество выходит за допустимые пределы');
        }

        const button = amount > 0
            ? this.quantityPlus
            : this.quantityMinus;

        for (let i = 0; i < Math.abs(amount); i++) {
            await button.click();
        }
    }
}