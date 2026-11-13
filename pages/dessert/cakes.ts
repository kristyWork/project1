import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../baseDessert';
import { QuantityControl } from '../../helper/quantityControl';
export class BentoCake extends BaseDessert{
    weightSlctr: Locator;
    weightOption: Locator;

    tasteCheckbox: Locator;

    cendelSlctr: Locator;
    cendelOption: Locator;

    decorSlctr: Locator;
    decorOption: Locator;
    
    constructor(page:Page){
        super(page);
        this.weightSlctr=page.locator('.js-product-edition-option-variants:has(option[value="700 грамм (2-4 порции)"])');
        this.weightOption=this.weightSlctr.getByRole('option', {name:/.порций/});
        
        this.cendelSlctr=page.locator('.js-product-option-variants:has(option[value="1 свеча (в подарок)"])');
        this.cendelOption=this.cendelSlctr.getByRole('option', {name: /.свеч./});

        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
       
        this.decorSlctr=page.locator('.js-product-option-variants:has(option[value="Классический от Цеха"])');
        this.decorOption=this.decorSlctr.locator('[data-product-variant-price]')
    }

}

export class WedCake extends BaseDessert{
    
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
export class Cake extends BaseDessert{

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