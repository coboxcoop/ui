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
  padding: 1.6rem;
  display: flex;
  flex-direction: column;
  background: white;
  margin: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  max-width: 34rem;
  max-height: 52rem;
  border-radius: 4px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
}
</style>

<style lang="scss" src="@/global.scss" />
