<template>
  <!-- 
    可有可无的 app.vue 文件,可以删除它没什么用
    为了减少应用程序的包大小，这意味着如果您仅使用app.vue页面系统则不会包含vue路由器 vue-router .
    若要强制页面系统，请在nuxt.config中设置pages:true或具有app/router.options.ts。
   -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>