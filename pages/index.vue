<script setup lang="ts">
definePageMeta({
  layout: 'custom'
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
// definePageMeta 是一个新的 API，用于在页面级别定义元数据。它可以在页面组件中使用，用于设置页面的标题、描述、关键字和其他元数据。与 useHead 不同，definePageMeta 是一种更静态的方式来定义页面的元数据，适用于那些在组件中不需要动态变化的情况。
// definePageMeta 更适合于静态定义页面级别的元数据。
definePageMeta({
  title: '首页pages/index'
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

const appConfig = useAppConfig()
console.log("theme", appConfig.theme)

// const headers = useRequestHeaders(['cookie'])
// console.log("headers", headers)
// console.log("cookie", headers.cookie)

const { data: count } = await useFetch('/api/count')
const { data, error } = await useAsyncData('/api/count', () => myGetFunction('users'))

</script>

<template>
  <div>{{ $route.meta.title }}</div>
  <div class="example">
    <p>{{ formatNumber(46123456.789212) }}</p>
    ｜<NuxtLink to="/user-admin/234/">我来看看/user-admin/234/</NuxtLink>｜
  </div>
</template>
 

<style lang="scss">
.example {
  p {
    color: red;
  }
}
</style>