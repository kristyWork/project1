import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../baseDessert';
import { QuantityControl } from '../../helper/quantityControl';

export class BombMakaron extends BaseDessert {
  tasteCheckbox: Locator;
  quantity: QuantityControl;

  constructor(page: Page) {
    super(page);

    const product = page.locator('.t-store__prod-popup__container:visible');
    this.tasteCheckbox = product.locator('input.t-checkbox[type="checkbox"]');
    this.quantity = new QuantityControl(page);
  }
}

export class Traifl extends BaseDessert{

    tasteCheckbox:Locator;
   
    constructor(page:Page){

        super(page);   
        this.tasteCheckbox = page.locator('.t-product__checkbox-wrap input.t-checkbox[type="checkbox"]');
       
    }


}

export class Musse extends BaseDessert{

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
        
        this.weightSlctr=page.locator('.js-product-option-variants:has(option[value="250 гр"])');
        this.weightOption=this.weightSlctr.getByRole('option', {name:/.гр/});

        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
       
        this.typeSlctr=page.locator('select.js-product-option-variants').filter({has: page.locator('option[value="Муссовый мини-тортик"]')});
        this.typeOption=page.locator('[data-product-variant-price]')
    }


}