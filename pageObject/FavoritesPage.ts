
import { Page, Locator, expect } from '@playwright/test';

export class FavoritesPage {
  readonly page: Page;
  readonly favoritesWindow: Locator;
  readonly favoriteItems: Locator;

  constructor(page: Page) {
    this.page = page;

    this.favoritesWindow = page.locator(
      '.t1002__wishlistwin:visible'
    );

    this.favoriteItems = this.favoritesWindow.locator(
      '.t1002__product'
    );
  }

  async getFavoriteNames(): Promise<string[]> {
    await expect(this.favoritesWindow).toBeVisible();

    return this.favoriteItems.locator(
      '.t1002__product-title'
    ).allTextContents().then(names =>
      names.map(name => name.trim())
    );
  }

  async checkFavorite(expectedName: string): Promise<void> {
    await expect.poll(
      async () => {
        const names = await this.getFavoriteNames();

        return names.some(name =>
          name === expectedName ||
          name.startsWith(expectedName + ' ')
        );
      },
      {
        message: `Десерт "${expectedName}" не найден в избранном`
      }
    ).toBe(true);
  }
}
