// Nuxt配置 https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devServer: {
    port: process.env.PORT ? Number(process.env.PORT) : 8888,
    host: "0.0.0.0",
  },

  //不要在app.config文件中放入任何秘密值。它暴露给用户客户端捆绑包。
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
    // pageTransition: { name: 'page', mode: 'out-in' } // 页面转换过渡效果
  },
  devtools: { enabled: true },
  runtimeConfig: {
    // 仅在服务器端可用的私钥,可以由 NUXT_API_SECRET 环境变量重写
    apiSecret: process.env.NUXT_API_SECRET || '256257282931',
    // 公钥中的密钥也将暴露给客户端,可以由 NUXT_PUBLIC_API_BASE 环境变量重写
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/aaaaapppppppppiiiiii'
    }
  }
})
