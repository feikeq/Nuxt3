<script setup lang="ts">
// definePageMeta 是一个新的 API，用于在页面级别定义元数据。它可以在页面组件中使用，用于设置页面的标题、描述、关键字和其他元数据。与 useHead 不同，definePageMeta 是一种更静态的方式来定义页面的元数据，适用于那些在组件中不需要动态变化的情况。
// definePageMeta 更适合于静态定义页面级别的元数据。
definePageMeta({
  layout: 'custom',
  title: '首页pages/index'
})

const props = defineProps({
  version: {
    type: String,
    default: ""
  },
  title: {
    type: String,
    default: "热烈欢迎！"
  },
})


// useHead 是一个 Composition API 函数，用于在组件中设置和管理页面的头部元数据，例如标题、meta 标签、link 标签等。使用 useHead 可以在组件内动态地设置页面的头部信息。
// useHead 更适合于动态设置页面头部信息
useHead({
  title: `${props.title} - useHead`,
  meta: [
    { name: 'description', content: 'My amazing site.' }
  ],
  bodyAttrs: {
    class: 'gogogotest'
  },
  script: [{
    src: '/js/script.js',
    tagPosition: 'bodyClose'
  },
  { innerHTML: 'console.log(\'Hello world\')' }]
})

// useSeoMeta 是一个用于管理 SEO 相关元数据的新 API，它提供了一种更专门的方式来设置页面的 SEO 相关信息，例如标题、描述、关键字等。它是专门用于处理页面的 SEO 元数据的 API。
// useSeoMeta 则是专门用于处理页面的 SEO 相关元数据。
useSeoMeta({
  title: `${props.title} - useSeoMeta`,
  ogTitle: 'My Amazing Site',//og:title
  ogDescription: 'This is my amazing site, let me tell you all about it.',//og:description
  ogImage: 'https://test.com/image.png',
  twitterCard: 'summary_large_image',//twitter:card
})

// useHeadSafe 适合在组件中动态设置页面头部标签，而 setHead 适合在页面布局文件中静态设置页面头部标签。

const testName = ref();
const appConfig = useAppConfig()
console.log("theme", appConfig.theme)

const headers = useRequestHeaders(['cookie'])
console.log("headers", headers)
console.log("cookie", headers.cookie)


const testCookie = useCookie('testCookie', { domain: ".ccav.tv", path: "/", maxAge: 60 * 60 * 24 * 2 })
testCookie.value = testCookie.value || Math.round(Math.random() * 1000)
console.log("testCookie", testCookie.value)


const list = useCookie(
  'list',
  {
    default: () => [],
    watch: 'shallow'
  }
)

function add() {
  list.value?.push(Math.round(Math.random() * 1000))
  // list cookie not update with this change
}

function save() {
  if (list.value && list.value !== null) {
    list.value = [...list.value]
    // list cookie update with this change
  }
}

function ajax() {
  console.log("ajax",testName)
  const { data, pending, status ,error} =  useFetch('/api/item5')
}


/*
数据获取 https://nuxt.com/docs/getting-started/data-fetching
Nuxt3提供了多种方法来处理应用程序中的数据获取：
  $fetch
  useFetch
  useLazyFetch
  useAsyncData
  useLazyAsyncData

Nuxt3 不推荐也没必要使用Axios进行网络请求，Axios本来是对 XMLHttpRequest 的封装，而现如今网络请求这种功能由 XMLHttpRequest 逐渐被 Fetch API 代替，浏览器已支持原生支持fetch，Node v17.5也引入了对fetch的原生支持。Nuxt3的官方团队将fetch进一步封装，封装的项目叫做ofetch，并且将其集成到Nuxt3中，就是开头提到的$fetch方法。
*/

// $fetch 基于用户交互发出网络请求非常有用
// Nuxt3 使用 ofetch 全局公开 $fetch 助手来发出 HTTP 请求。-$fetch是在 Nuxt 中进行 HTTP 调用的首选方式，
// 在SSR过程中，数据会被提取两次，一次在服务器上，另一次在客户端上。
// const dataTwice = await $fetch('/api/item')
const dataTwice = await $fetch('/api/item1', {
  method: 'patch',
  body: { hello: 'world ' }
})


// useAsyncData 适合在服务器端渲染时预取数据  -useAsyncData与 结合使用$fetch，可提供更细粒度的控制。
// 在SSR期间，数据仅在服务器端获取并传输到客户端。
const { data: res } = await useAsyncData('api_item2', () => $fetch('/api/item2'))
//呼叫useAsyncData（）并不是直接帮我们送出HTTP请求，而是在handler内使用$fetch来打API，只是useAsyncData（）组合式函数，封装了更多打API时可以使用的方法与参数，来因应不同的使用情境。当然如果想要，你也可以使用其他套件来替换$fetch但可能就没办法享受它所带来的好处。

// useFetch 适合在客户端渲染时动态获取数据 - 您也可以用useFetch作为useAsyncData+$fetch的快捷方式
// useFetch 是对 useAsyncData 的一层包装，可以理解为所有的都选择默认配置的useAsyncData 方法，useFetch(url)几乎等同于useAsyncData(url, () => $fetch(url))——它是最常见用例的开发人员语法糖。
// useFetch 是在组件设置函数中处理数据获取的最直接方法。
const { data, pending, status ,error} = await useFetch('/api/item3')
const { refresh } = await useRequest('/api/item4')

// const { data, pending, status} = await getFetchData({url:'/api/item4'})


const url = useRequestURL() // 返回一个在服务器端和客户端都工作的URL 对象。
// const router = useRouter() // 返回路由器实例(不用定义，模版里也可以直接使用$router.back())


const runtimeConfig = useRuntimeConfig() // 访问运行时配置变量
if (process.server) {
  console.log('API secret（服务端才能印出来）:', runtimeConfig.apiSecret)
}
console.log(runtimeConfig, "apiSecret（客户端打印不出）", runtimeConfig.apiSecret)
console.log("public.apiBase", runtimeConfig.public.apiBase)
console.log(process.env, "process.env.NUXT_PUBLIC_API_BASE", process.env.NUXT_PUBLIC_API_BASE)


// 使用“useState”可组合项在组件之间创建响应式且 SSR 友好的共享状态。
// 创建状态并设置默认值
const states = useState('states', () => Math.round(Math.random() * 100))
console.log(states.value);
const sameStates = useState('states')


const jsColor = ref("#E53935")

</script>

<template>
  <div alt="Transition包裹的必须是一个单根的组件。">
    <button @click="$router.back()">Back</button>
    <button @click="$router.push({ path: '/user-admin/678/' })">/678/</button>

    <div @click="ajax">{{testName}} - {{ $route.meta.title }}</div>
    <div class="example">
      <p class="animate__animated animate__bounce animate__delay-2s">{{ formatNumber(46123456.789212) }}</p>
      <p class="animate__animated animate__bounceInDown animate__faster">{{ tools.typeOf({}) }}</p>
      <p class="text">(动态样式v-bind) URL is: {{ url }}</p>
      <p>Path is: {{ url.pathname }}</p>
      ｜<NuxtLink to="/user-admin/234/" transition="fade">我来看看/user-admin/234/</NuxtLink>｜
    </div>
    <button @click="add">CookieAdd</button>
    <button @click="save">CookieSave</button>

    <p>状态管理 States: {{ states }}</p>
    <div class="flex gap-2 my-4">
      <button @click="states--">-</button>
      <button @click="states++">+</button>
    </div>
    <p>Same States: {{ sameStates }}</p>
  </div>
</template>
 

<style lang="scss" scoped>
.example {
  p {
    color: $primary
  }

  .text {
    color: v-bind(jsColor);
  }
}
</style>