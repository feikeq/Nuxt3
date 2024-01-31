// composables是官方默认的插件目录，官方描述：Nuxt 3使用composables/目录使用auto-imports自动将Vue组合导入到应用中!
// https://github.com/unjs/ofetch#%EF%B8%8F-interceptors


import { ofetch } from 'ofetch'

export default defineNuxtPlugin((_nuxtApp) => {
  console.log('--------defineNuxtPlugin--------')
  globalThis.$fetch = ofetch.create({
    onRequest ({ request, options }) {
      options.headers = { Authorization: `Bearer token121212121212121212` }
      console.log("ofetch",options)
    },
    onRequestError ({ error }) {
      console.error(error)
    }
  })
})