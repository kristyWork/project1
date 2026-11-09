import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../baseDessert';

export class CakePage extends BaseDessert{

    weightSlctr:Locator;
    weightOption:Locator;

    tasteSlctr:Locator;
    tasteOption:Locator;

    cendelSlctr:Locator;
    cendelOption:Locator;

    decorSlctr:Locator;
    decorOption:Locator;


    constructor(page:Page){
        super(page);
        this.weightSlctr=page.locator('.js-product-edition-option-variants:has(option[value="2000"])');
        this.weightOption=this.weightSlctr.getByRole('option', {name:/.000/});
        
        this.tasteSlctr = page.locator('select.js-product-edition-option-variants:has(option[value="Сникерс"])');
        this.tasteOption = this.tasteSlctr.getByRole('option');

        this.cendelSlctr=page.locator('select.js-product-option-variants:has(option[value="1 свеча (в подарок)"])');
        this.cendelOption=this.cendelSlctr.getByRole('option', {name: /.свеч./});
       
        this.decorSlctr=page.locator('select.js-product-option-variants:has(option[value="Классический от Цеха"])');
        this.decorOption=this.decorSlctr.locator('[data-product-variant-price]')
    }


}