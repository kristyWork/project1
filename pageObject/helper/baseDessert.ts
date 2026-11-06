import { Page, Locator } from '@playwright/test';

export class BaseDessert{
        protected page: Page;
        
        inBasketBtn: Locator;
            
        favorites: Locator;

        order:Locator;

        submit: Locator;

        constructor(page:Page){
            this.page=page;
            this.inBasketBtn=page.getByRole('link', {name:'В корзину'});
            this.favorites=page.locator('a.t1002__addBtn');
            this.order=page.locator('div.t706__carticon-imgwrap');
            this.submit=page.getByRole('button', { name: 'Оформить' });
        }      

     async selectRandomOption(slctr: Locator): Promise<void> {
        const count = await slctr.count();

        if (count === 0) {throw new Error('Элементы для выбора не найдены');}

        const firstElement = slctr.first();

        const tagName = await firstElement.evaluate(
            element => element.tagName.toLowerCase()
        );

        if (tagName === 'select') {const optionCount = await firstElement.locator('option').count();

            if (optionCount === 0) {
                throw new Error('Варианты выбора не найдены');
            }

            const randomIndex = Math.floor(Math.random() * optionCount);

            await firstElement.selectOption({ index: randomIndex });
        } else {
            const randomIndex = Math.floor(Math.random() * count);

            await slctr.nth(randomIndex).locator('..').click();
        }
        }

     
     async getSelectedOptions(slctr: Locator): Promise<string[]> {
     const count = await slctr.count();

     if (count === 0) {
        throw new Error('Элементы для получения значений не найдены');
     }

     const firstElement = slctr.first();

     const tagName = await firstElement.evaluate(
        element => element.tagName.toLowerCase()
     );

     const selectedOptions: string[] = [];

     if (tagName === 'select') {
        for (let i = 0; i < count; i++) {
            const value = await slctr.nth(i).inputValue();
            selectedOptions.push(value);
        }
     }

     else if (tagName === 'input') {
        const checked = slctr.locator(':checked');
        const checkedCount = await checked.count();

        for (let i = 0; i < checkedCount; i++) {
            const checkbox = checked.nth(i);
            const value = await checkbox.getAttribute('value');

            selectedOptions.push( value || '');
        }
     }

     else {
        throw new Error(`Неподдерживаемый тип элемента: ${tagName}`);
     }

     return selectedOptions;
     }

     async addToChart(): Promise<void>{
        await this.inBasketBtn.click();
     }

     async addToFavorites(): Promise<void> {
        await this.favorites.click();
     }

     async openOrder():Promise<void>{
      await this.order.click();   }
      
     async submitOrder():Promise<void>{
      await this.submit.click();
     }

     }