// Nuxt配置 https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 仅客户端渲染 - 如果您不想预渲染路由，另一种使用静态托管的方法是在nuxt.config文件中将ssr属性设置为false。然后，npm run generate命令将输出一个.output/public/index.html入口点和JavaScript捆绑包，就像经典的客户端Vue.js应用程序一样。
  ssr: false, //　关闭服务端渲染
  devServer: {
    port: 8888,//　默认为3000端口，可以由 PORT 环境变量重写
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
  css: ['~/assets/scss/main.scss'], // 样式表将内联在 Nuxt 渲染的 HTML 中，全局注入并出现在所有页面中.
  devtools: { enabled: true },
  runtimeConfig: {
    // 仅在服务器端可用的私钥,可以由 NUXT_API_SECRET 环境变量重写
    apiSecret: '256257282931',
    // 公钥中的密钥也将暴露给客户端,可以由 NUXT_PUBLIC_API_BASE 环境变量重写
    public: {
      apiBase: '/aaaaapppppppppiiiiii'
    }
  }
})
