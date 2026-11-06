import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../helper/baseDessert';
export class BentoPage extends BaseDessert{
    weightSlctr: Locator;
    weightOption: Locator;

    tasteCheckbox: Locator;

    cendelSlctr: Locator;
    cendelOption: Locator;

    decorSlctr: Locator;
    decorOption: Locator;
    
    constructor(page:Page){
        super(page);
        this.weightSlctr=page.locator('.js-product-edition-option-variants');
        this.weightOption=this.weightSlctr.getByRole('option', {name:/.порций/});
        
        this.cendelSlctr=page.locator('.js-product-option-variants:has(option[value="1 свеча (в подарок)"])');
        this.cendelOption=this.cendelSlctr.getByRole('option', {name: /.свеч./});

        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
       
        this.decorSlctr=page.locator('.js-product-option-variants:has(option[value="Классический от Цеха"])');
        this.decorOption=this.decorSlctr.locator('[data-product-variant-price]')
    }


}