<template>
  <AppHeader />
  <ComTitle>组件标题</ComTitle>

  <Transition alt="Transition包裹的必须是一个单根的组件">
    <div :key="$route.path">
      <KeepAlive>
        <slot :key="$route.fullPath" />
      </KeepAlive>
    </div>
  </Transition>
  <AppFooter />
</template>

<script>
export default {

}
</script>

<style></style>