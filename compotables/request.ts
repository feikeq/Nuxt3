// composables是官方默认的插件目录，官方描述：Nuxt 3使用composables/目录使用auto-imports自动将Vue组合导入到应用中!

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
