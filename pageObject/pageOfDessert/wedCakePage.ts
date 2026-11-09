import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../baseDessert';
import { QuantityControl } from '../../helper/QuantityControl';

export class WedCakePage extends BaseDessert{
    
    weightSlctr: Locator;
    weightOption: Locator;
    
    tasteCheckbox:Locator;
    
    quantity: QuantityControl;
   
    constructor(page:Page){

        super(page);   
        const product = page.locator('.t-store__prod-popup__container:visible');
        this.weightSlctr=product.locator('.js-product-edition-option-variants');
        this.weightOption=this.weightSlctr.getByRole('option');
        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
        this.quantity = new QuantityControl(page);
    }
        
       
    }