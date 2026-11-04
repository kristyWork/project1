import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../helper/baseDessert';
import { QuantityControl } from '../helper/QuantityControl';

export class BombCakePage extends BaseDessert{

    tasteCheckbox:Locator;
    quantity: QuantityControl;
   
    constructor(page:Page){

        super(page);   
        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
        this.quantity = new QuantityControl(page);
    }
        
       
    }
