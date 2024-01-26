<template>
  <!-- 
    可有可无的 app.vue 文件,可以删除它没什么用，对于 Nuxt 3，该目录是可选的。如果不存在，Nuxt 将不会包含vue-router依赖项。
    为了减少应用程序的包大小，这意味着如果您仅使用app.vue页面系统则不会包含vue路由器 vue-router .
    若要强制页面系统，请在nuxt.config中设置pages:true或具有app/router.options.ts。
    请记住，它app.vue是 Nuxt 应用程序的主要组件。您添加到其中的任何内容（JS 和 CSS）都将是全局的并包含在每个页面中。
   -->
  <NuxtLayout>
    <!-- 如果您有目录要显示当前页面 NuxtPage 与页面一起使用 -->
    <NuxtPage />
  </NuxtLayout>
</template>