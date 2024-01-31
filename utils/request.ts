import { defineNuxtPlugin } from 'nuxt3';
import { createFetch } from 'ofetch';

export default defineNuxtPlugin((nuxtApp) => {
  const fetch = createFetch({
    baseURL: 'https://api.example.com',
    headers: {
      Authorization: `Bearer your-token-value`
    }
  });

  nuxtApp.provide('http', fetch);
});
