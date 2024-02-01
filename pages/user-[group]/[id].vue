<script setup lang="ts">
useHead({
    title: `标题`,
    titleTemplate: '%s - Meta Tags Example'
})

const route = useRoute()
console.log('警告确保用户已通过身份验证！')
console.log(route.params.group, '-', route.params.id)

// 使用“useState”可组合项在组件之间创建响应式且 SSR 友好的共享状态。
const sameStates = useState('states')
console.log(sameStates.value);
</script>

<template>
    <div>
        <!-- 
        如果访问　/user-admin/234
        <p>admin - 234</p>
     -->
        <p>{{ $route.params.group }} - {{ $route.params.id }}</p>
        ｜<NuxtLink to="/" transition="fade">返回首页</NuxtLink>｜
    </div>
</template>
  