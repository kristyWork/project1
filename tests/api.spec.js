import { test, expect } from '@playwright/test';

test('api test one', async ({ request }) => {
  const response = await request.get('https://cehgrodno.by/page59497089.html');

  console.log('Status:', response.status());
  expect(response.status()).toBe(200); 
});