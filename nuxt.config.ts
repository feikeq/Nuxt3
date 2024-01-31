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
      title:"测试",
      // htmlAttrs: {
      //   lang: 'zh'
      // },  
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover',
      meta: [
        { name: 'description', content: '肥客是专业的网络应用技术团队。我们的团队凭借扎实的技术与优质的服务为企业、公司、政府等部门量身定制软件与网站的网络应用和用户体验。有非凡志向，才有非凡成就。' },
        { name: 'keywords', content: '肥客,废客网站,废客软件,肥客官网,废客官方,废客CS,FK,网站设计制作建设,软件定制外包开发,平面设计UI设计UX设计' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `/favicon.ico` }
      ],  
    },
    // pageTransition: { name: 'page', mode: 'out-in' } // 页面转换过渡效果
  },
  css: [
    // 样式表将内联在 Nuxt 渲染的 HTML 中，全局注入并出现在所有页面中.
    '~/assets/main.scss',// 页面中使用  @import "~/assets/common.scss";
    'animate.css/animate.min.css',// 官网https://animate.style/　非全局引用的话在页面添加 import 'animate.css';
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    // 仅在服务器端可用的私钥,可以由 NUXT_API_SECRET 环境变量重写
    apiSecret: '256257282931',
    // 公钥中的密钥也将暴露给客户端,可以由 NUXT_PUBLIC_API_BASE 环境变量重写
    public: {
      apiBase: '/aaaaapppppppppiiiiii'
    }
  },
  vite: {
    css: {
      // 带有颜色变量的sass 部分，可以使用 vite预处理器选项来执行此操作。
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/_colors.scss" as *;'
        }
      }
    }
  },
  //Configuration for Nitro. See: https://nitro.unjs.io/config/
  nitro: {
    // 打包路径设置
    output: {
      dir: ".output/app_dist/",
      // publicDir:".output/app_dist/public2",
      // serverDir:".output/app_dist/server2"
    }
  },
  plugins: [
    { src: "@/compotables/ofetch", ssr: true }, // $fetch拦截器配置与token携带 - 开启服务端渲染
  ],

})
