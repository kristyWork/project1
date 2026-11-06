import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../helper/baseDessert';
import { QuantityControl } from '../helper/QuantityControl';

export class BombMakaronPage extends BaseDessert{

    tasteCheckbox:Locator;
    quantity: QuantityControl;
   
    constructor(page:Page){

        super(page);   
        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
        this.quantity = new QuantityControl(page);
    }
        
    async getProductPrice(): Promise<number> {
    const priceText = await this.page.locator('.js-store-prod-price-val').first().innerText();
    return Number(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));
    }
    }
