<template>
<nav>
  <RouterLink :to="{name: 'network'}">Network</RouterLink>
  <RouterLink :to="{name: 'groups'}">Groups</RouterLink>
  <RouterLink :to="{name: 'devices'}">Devices</RouterLink>
</nav>
</template>

<style lang="scss" scoped>
nav {
  a {
    display: block;
    padding: 0.6rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid;
    }
  }
}
</style>

<script>
export default {}
</script>
