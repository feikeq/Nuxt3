// Nuxt配置 https://nuxt.com/docs/api/configuration/nuxt-config
/* 
  您不必使用 TypeScript 来使用 Nuxt 构建应用程序。但是，强烈建议使用.ts该nuxt.config文件的扩展名。这样，您就可以受益于 IDE 中的提示，避免在编辑配置时出现拼写错误和错误。
  const runtimeConfig = useRuntimeConfig() //用于在应用程序中公开配置变量。
*/
export default defineNuxtConfig({
  // 仅客户端渲染 - 如果您不想预渲染路由，另一种使用静态托管的方法是在nuxt.config文件中将ssr属性设置为false。然后，npm run generate命令将输出一个.output/public/index.html入口点和JavaScript捆绑包，就像经典的客户端Vue.js应用程序一样。
  ssr: false, //　关闭服务端渲染
  devServer: {
    port: 8888,//　默认为3000端口，可以由 PORT 环境变量重写
    host: "0.0.0.0", // 开发服务器监听主机
    // // 是否启用HTTPS。
    // https: {
    //   key: './server.key',
    //   cert: './server.crt'
    // }
  },

  //不要在app.config文件中放入任何秘密值。它暴露给用户客户端捆绑包。
  app: {
    // baseURL:"/", // Nuxt 应用程序的基本路径。这可以在运行时通过设置 NUXT_APP_BASE_URL 环境变量来设置。
    head: {
      title: "测试",
      htmlAttrs: {
        lang: 'zh'
      },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1, user-scalable=no, viewport-fit=cover',
      meta: [
        { name: 'description', content: '肥客是专业的网络应用技术团队。我们的团队凭借扎实的技术与优质的服务为企业、公司、政府等部门量身定制软件与网站的网络应用和用户体验。有非凡志向，才有非凡成就。' },
        { name: 'keywords', content: '肥客,废客网站,废客软件,肥客官网,废客官方,废客CS,FK,网站设计制作建设,软件定制外包开发,平面设计UI设计UX设计' },
        { hid: 'pragma', 'http-equiv': 'pragma', content: "no-cache" }, //html在meta设置不缓存
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: `/favicon.ico` }
      ],
    },
    // 全设置过渡动画效果(禁用过渡效果设置为pageTransition:false即可)
    // 页面转换过渡效果(如要支持过度动画效果 Transition包裹的必须是一个单根的组件只是不用手动加<Transition>组件了并且在同一个layout里)
    pageTransition: {
      name: 'app',
      mode: 'out-in',
    },
    layoutTransition: {
      name: 'layout', // 定义的css动画名称 page-enter-active
      mode: 'out-in', // 控制离开或进入转换的时序（'in-out' | 'out-in' | 'default'）
      //用于自定义转换类的道具在模板中使用烤肉串案例，例如从class=“xxx”输入 
      // enterFromClass: "slide-left",
      // enterActiveClass: "slide-left",
      // enterToClass: "slide-left",
      // appearFromClass: "",
      // appearActiveClass: "",
      // appearToClass: "",
      // leaveFromClass: "slide-right",
      // leaveActiveClass: "slide-right",
      // leaveToClass: "slide-right",
    },
  },
  css: [
    // 样式表将内联在 Nuxt 渲染的 HTML 中，全局注入并出现在所有页面中.
    '~/assets/main.scss',// 页面的script标签中中使用  @import "~/assets/common.scss";
    'animate.css/animate.min.css',// 官网https://animate.style/　非全局引用的话在页面添加 import 'animate.css';
  ],
  devtools: { enabled: true },
  runtimeConfig: {
    // 仅在服务器端可用的私钥,可以由 NUXT_API_SECRET 环境变量重写
    apiSecret: '256257282931',
    // 公钥中的密钥也将暴露给客户端,可以由 NUXT_PUBLIC_API_BASE 环境变量重写
    public: {
      apiBase: '/'
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
    // { src: "/xxx/ofetch", ssr: true }, // $fetch拦截器配置与token携带 - 开启服务端渲染
  ],

})
