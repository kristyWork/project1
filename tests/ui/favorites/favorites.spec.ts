import { BombMakaron,Traifl, Musse} from '../../../pages/dessert/desserts';
import { MainPage } from '../../../pages/mainPage';
import { OrderPage } from '../../../pages/orderPage';
import { test, expect } from '../../../fixtures/index';
import { FavoritesPage } from '../../../pages/favoritesPage';

test.beforeEach(async({page})=> {
  await page.goto('',{ waitUntil: 'domcontentloaded'});
  await expect(page).toHaveTitle(/ЦЕХ/);
})


test('add macaron to favorites', async ({page,mainPage}) => {
  const macaronPage = new BombMakaron(page);
  const favoritesPage = new FavoritesPage(page);

  await mainPage.chooseDessert(mainPage.macaron);
  const dessertName = (await macaronPage.name.innerText()).trim();

  console.log('Выбранный десерт:', dessertName);

  await macaronPage.addToFavorites();

  await page.goto('');

  await mainPage.openWishList();

  await favoritesPage.checkFavorite(dessertName);
});
