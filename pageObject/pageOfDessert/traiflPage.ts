import { Page, Locator } from '@playwright/test';
import { BaseDessert } from '../helper/baseDessert';

export class TraiflPage extends BaseDessert{

    tasteCheckbox:Locator;
   
    constructor(page:Page){

        super(page);   
        this.tasteCheckbox = page.locator('input.t-checkbox[type="checkbox"]');
       
    }


}