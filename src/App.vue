<template>
<div id="app"> 
  <router-view />
</div>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch('init')
  }
}
</script>

<style lang="scss" scoped>
#app {
  padding: 1rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" src="@/global.scss" />
