import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../baseDessert';

export class MussePage extends BaseDessert{

    colorSlctr:Locator;
    colorOption: Locator;
    
    weightSlctr:Locator;
    weightOption:Locator;

    tasteCheckbox:Locator;
   
    typeSlctr: Locator;
    typeOption:Locator;

    constructor(page:Page){

        super(page);
        this.colorSlctr=page.locator('.js-product-edition-option-variants');
        this.colorOption = this.colorSlctr.locator('option');;
        
        this.weightSlctr=page.locator('.js-product-option-variants');
        this.weightOption=this.weightSlctr.getByRole('option', {name:/.гм/});

        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
       
        this.typeSlctr=page.locator('.js-product-option-name');
        this.typeOption=page.locator('[data-product-variant-price]')
    }


}