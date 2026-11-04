import { Page, Locator } from '@playwright/test';

export class BaseDessert{
        protected page: Page;
        
        basket: Locator;
            
         addToFavoritBtn: Locator;

        constructor(page:Page){
            this.page=page;
            this.basket=page.getByRole('link', {name:'В корзину'});
            this.addToFavoritBtn=page.locator('a.t1002__addBtn');
        }      

     async selectRandomTeste(slctr: Locator): Promise<void> {
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
        await this.basket.click();
     }

     async addToFavorites(): Promise<void> {
        await this.addToFavoritBtn.click();
     }
}