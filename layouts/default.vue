<template>
  <div>
    <AppHeader />
    <ComTitle>组件标题</ComTitle>
    <KeepAlive>
      <slot />
    </KeepAlive>
    <AppFooter />
  </div>
</template>

<script>
export default {

}
</script>

<style></style>