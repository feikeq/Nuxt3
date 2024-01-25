<script setup lang="ts">
definePageMeta({
  title: '首页pages/index'
})
const appConfig = useAppConfig()

console.log("theme",appConfig.theme)

</script>

<template>
  <div>{{$route.meta.title}}</div>
  <p>{{ formatNumber(46123456.789212) }}</p>
  <div>
      <NuxtWelcome />
    </div>
</template>
 