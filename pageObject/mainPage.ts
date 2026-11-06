import { Page, Locator } from '@playwright/test';

export class MainPage{
    protected page: Page;

    bento:Locator;
    cake:Locator;
    traifl:Locator;
    macaron:Locator;
    bombCake:Locator;
    muss:Locator;
    weddingCake:Locator;
    addToFavoritBtn:Locator;
    favoritesBtn: Locator;
    packBtn:Locator;
    submit:Locator;

    constructor(page:Page){
        this.page=page;
        this.bento = page.getByRole('link', {name: 'Бенто-торты'});
        this.cake=page.getByRole('link',{name:'Торты от 2000 грамм'});
        this.traifl=page.getByRole('link', {name: 'Трайфлы'});
        this.macaron=page.getByRole('link', {name: 'Макарон'});
        this.bombCake=page.getByRole('link', {name: /Торт бомба./});
        this.muss=page.getByRole('link', {name: 'Муссовые торты'});
        this.weddingCake=page.getByRole('link', {name: 'Свадебные торты'});

        this.addToFavoritBtn=page.locator('a.t1002__addBtn');
        this.favoritesBtn=page.locator('a.t-menuwidgeticons__wishlist');

        this.packBtn=page.getByRole('button', {name:'Корзина'});
        this.submit=page.getByRole('button', { name: 'Оформить' });
        
    }

    async chooseDessert(dessert:Locator): Promise<void>{
        await dessert.click();
    }
     async addToFavorites(): Promise<void> {
        await this.addToFavoritBtn.click();
    }
    async openFavorites():Promise<void>{
        await this.favoritesBtn.click();
    }  
    async openPack():Promise<void>{
        await this.packBtn.click();
    }
    async submitOrder():Promise<void>{
      await this.submit.click();
     } 
}