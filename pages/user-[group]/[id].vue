<script setup lang="ts">
const route = useRoute()
console.log('警告确保用户已通过身份验证！')
console.log(route.params.group, '-', route.params.id)
definePageMeta({
  pageTransition: {
    name: 'rotate'
  }
})
</script>

<template>
    <!-- 
        如果访问　/user-admin/234
        <p>admin - 234</p>
     -->
    <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
    ｜<NuxtLink to="/">返回首页</NuxtLink>｜
</template>
  