import { Page, Locator, expect } from '@playwright/test';
import { fakerRU as faker } from '@faker-js/faker';
export class OrderPage{
     fullName:Locator;
     email:Locator;
     phone:Locator;
     wishes:Locator;
     
     remember:Locator;
     deliveryOptions: Locator;
     totalPrice:Locator;
     submit:Locator;

     constructor(page:Page){
        this.fullName=page.locator('input[name="Name"]');
        this.email=page.locator('input[name="Email"');
        this.phone=page.locator('input[name="Phone"]');
        this.wishes=page.locator('textarea[name="Textarea"]');

        this.remember=page.locator('input.t-checkbox__control[type="checkbox"]');
        this.deliveryOptions = page.locator( 'input[name="Выберите вариант доставки"]');
        this.totalPrice=page.locator('div.t706__cartwin-prodamount-price');
        this.submit=page.getByRole('button', { name: 'Оформить' });
     }

    async fillUserForm():Promise<void>{

    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const phone = `+375${faker.helpers.arrayElement(['29', '33', '44', '25'])}${faker.string.numeric(7)}`;
    const wishes = faker.lorem.sentence();

    await this.fullName.fill(fullName);
    await this.email.fill(email);
    await this.phone.fill(phone);
    await this.wishes.fill(wishes);
    await this.remember.click(); 
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

   async getOrderPrice(totalPrice: Locator): Promise<number> {
    const priceText = await totalPrice.innerText();

    const price = Number(priceText);

    if (Number.isNaN(price)) {
        throw new Error(`Не удалось получить цену: ${priceText}`);
    }

    return price;
    }

   async checkDeliveryPrice(initialPrice:number, selectedDelivery:string, totalPrice:Locator): Promise<void> {
    const actualPrice = await this.getOrderPrice(totalPrice);

    const surcharge = selectedDelivery.includes('Курьер') ? 12 : 0;

    expect(actualPrice).toBe(initialPrice + surcharge);
    }

    async clickSubmit():Promise<void>{
      await this.submit.click();
    }

    
     
}