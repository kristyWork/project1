import { Page, Locator, expect } from '@playwright/test';
import { fakerRU as faker } from '@faker-js/faker';
export class OrderPage{
     fullName:Locator;
     email:Locator;
     phone:Locator;
     wishes:Locator;
     
     remember:Locator;
     deliveryOptions: Locator;
     submit:Locator;

     constructor(page:Page){
        this.fullName = page.getByPlaceholder('Ваше ФИО');
        this.email=page.getByPlaceholder('Ваш email');
        this.phone = page.locator('#input_0701244879702');
        this.wishes=page.locator('textarea[name="Textarea"]:visible').first();
        this.remember = page.locator('label').filter({ hasText: 'Запомнить контакты в браузере' }).locator('input');
        this.deliveryOptions = page.locator( 'input[name="Выберите вариант доставки"]');
        this.submit=page.getByRole('button', { name: 'Оформить' });
     }

    async fillUserForm():Promise<void>{

    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const phone = `375${faker.helpers.arrayElement(['29', '33', '44', '25'])}${faker.string.numeric(7)}`;
    const wishes = faker.lorem.sentence();

    await this.fullName.fill(fullName);
    await this.email.fill(email);
    await this.phone.fill(phone);
    await this.wishes.fill(wishes);
    await this.remember.check(); 
    }


   async selectRandomDelivery(): Promise<string> {
    const count = await this.deliveryOptions.count();

    if (count === 0) {throw new Error('Варианты доставки не найдены'); }

    const randomIndex = Math.floor(Math.random() * count);
    const option = this.deliveryOptions.nth(randomIndex);

    const value = await option.getAttribute('value');
    await option.locator('..').click();

    return value || '';
    }


    async submitOrder():Promise<void>{
      await this.submit.click();
    }

    
     
}