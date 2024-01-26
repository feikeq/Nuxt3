// Nuxt配置 https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  //不要在app.config文件中放入任何秘密值。它暴露给用户客户端捆绑包。
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    pageTransition: { name: 'page', mode: 'out-in' } // 页面转换过渡效果
  },
  devtools: { enabled: true }
})
