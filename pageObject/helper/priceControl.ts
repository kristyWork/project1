import { Page, Locator, expect } from '@playwright/test';

export type ExpectedCartItem = {
    name: string;
    unitPrice: number;
    quantity: number;
};

export class PriceControl {
    totalPrice: Locator;

    constructor(page: Page) {
        this.totalPrice = page.locator('.t706__cartwin-totalamount').first();
    }

    async getProductInfo(
        nameLocator: Locator,
        priceLocator: Locator,
        quantity: number
    ): Promise<ExpectedCartItem> {
        const name = (await nameLocator.innerText()).trim();
        const unitPrice = Number(await priceLocator.innerText());

        if (Number.isNaN(unitPrice)) {
            throw new Error('Не удалось получить цену товара');
        }

        return { name, unitPrice, quantity };
    }

    calculateTotal(items: ExpectedCartItem[]): number {
        return items.reduce(
            (sum, item) => sum + item.unitPrice * item.quantity,
            0
        );
    }

    async getTotalPrice(): Promise<number> {
        const price = Number(await this.totalPrice.innerText());

        if (Number.isNaN(price)) {
            throw new Error('Не удалось получить общую стоимость');
        }

        return price;
    }

    async checkTotalPrice(
        items: ExpectedCartItem[],
        deliveryPrice: number = 0
    ): Promise<void> {
        const expectedTotal = this.calculateTotal(items) + deliveryPrice;
        const actualTotal = await this.getTotalPrice();

        expect(actualTotal).toBe(expectedTotal);
    }

    async checkQuantity(quantityLocator: Locator,expectedQuantity: number): Promise<void> {
        await expect(quantityLocator).toHaveText(String(expectedQuantity));
    }

 
    async getInitialPrice(): Promise<number> {
    return await this.getTotalPrice();
    }

    async checkDeliveryPrice(initialPrice: number,selectedDelivery: string): Promise<void> {
    const surcharge = selectedDelivery.includes('Курьер') ? 12 : 0;
    const expectedPrice = initialPrice + surcharge;
    const actualPrice = await this.getTotalPrice();

    expect(actualPrice).toBe(expectedPrice);
}
}