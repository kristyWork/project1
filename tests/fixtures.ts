import { test as base, expect } from '@playwright/test';
import { MainPage } from '../pageObject/mainPage';
import { OrderPage } from '../pageObject/orderPage';

type Fixtures = {
    orderMock: {wasIntercepted: () => boolean;};
    mainPage: MainPage;
    orderPage: OrderPage;
};

export const test = base.extend<Fixtures>({
    orderMock: async ({ page }, use) => {
        let intercepted = false;

        await page.route('**/procces/**', async route => {
            if (route.request().method() !== 'POST') {
                await route.continue();
                return;
            }

            intercepted = true;

            await route.fulfill({
                status: 200,
                contentType: 'application/json',
                body: JSON.stringify({
                    success: true,
                    message: 'Order created successfully (MOCKED)'
                })
            });
        });

        await use({
            wasIntercepted: () => intercepted
        });
    }, 
     mainPage: async ({ page }, use) => {
      await use(new MainPage(page));
       },


  orderPage: async ({ page }, use) => {
    await use(new OrderPage(page));
  },
});

export { expect };