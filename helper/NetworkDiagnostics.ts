
import type { Page } from '@playwright/test';

export function monitorNetwork(page: Page): void {
  page.on('requestfailed', request => {
    console.log(
      '[NETWORK FAILED]',
      request.method(),
      request.url(),
      request.failure()?.errorText
    );
  });

  page.on('response', response => {
    if (response.status() >= 400) {
      console.log(
        '[HTTP ERROR]',
        response.status(),
        response.url()
      );
    }
  });

  page.on('pageerror', error => {
    console.log('[JS ERROR]', error.message);
  });
}
