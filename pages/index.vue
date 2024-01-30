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
  ogImage: 'https://example.com/image.png',
  twitterCard: 'summary_large_image',//twitter:card
})

// useHeadSafe 适合在组件中动态设置页面头部标签，而 setHead 适合在页面布局文件中静态设置页面头部标签。

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

// useFetch 适合在客户端渲染时动态获取数据
// const { data: count } = await useFetch('/api/count')
// useAsyncData 适合在服务器端渲染时预取数据
// const { data, error } = await useAsyncData('/api/count', () => myGetFunction('users'))


const url = useRequestURL() // 返回一个在服务器端和客户端都工作的URL 对象。
// const router = useRouter() // 返回路由器实例(不用定义，模版里也可以直接使用$router.back())


const runtimeConfig = useRuntimeConfig() // 访问运行时配置变量
if (process.server) {
  console.log('API secret（服务端才能印出来）:', runtimeConfig.apiSecret)
}
console.log("apiSecret（客户端打印不出）",runtimeConfig.apiSecret)
console.log("public.apiBase",runtimeConfig.public.apiBase)
console.log("process.env.OTHER_VARIABLE",process.env.OTHER_VARIABLE)


// 使用“useState”可组合项在组件之间创建响应式且 SSR 友好的共享状态。
// 创建状态并设置默认值
const states = useState('states', () => Math.round(Math.random() * 100))
console.log(states.value);
const sameStates = useState('states')

</script>

<template>
  <button @click="$router.back()">Back</button>
  <button @click="$router.push({ path:'/user-admin/678/' })">/678/</button>
  
  <div>{{ $route.meta.title }}</div>
  <div class="example">
    <p>{{ formatNumber(46123456.789212) }}</p>
    <p>{{ tools.typeOf({}) }}</p>
    <p>URL is: {{ url }}</p>
    <p>Path is: {{ url.pathname }}</p>
    ｜<NuxtLink to="/user-admin/234/">我来看看/user-admin/234/</NuxtLink>｜
  </div>
  <button @click="add">CookieAdd</button>
  <button @click="save">CookieSave</button>

  <p>状态管理 States: {{ states }}</p>
  <div class="flex gap-2 my-4">
    <button @click="states--">-</button>
    <button @click="states++">+</button>
  </div>
  <p>Same States: {{ sameStates }}</p>
</template>
 

<style lang="scss">
.example {
  p {
    color: red;
  }
}
</style>