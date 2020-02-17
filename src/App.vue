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
  display: flex;
  flex-direction: column;
  background: white;
  margin: auto;
  width: 100%;
  max-width: 38rem;
}
</style>

<style lang="scss" src="@/global.scss" />
