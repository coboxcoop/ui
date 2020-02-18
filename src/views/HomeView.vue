<template>
<nav>
  <RouterLink :to="{name: 'network'}">Network ({{networkCount}})</RouterLink>
  <RouterLink :to="{name: 'groups'}">Groups ({{groupsCount}})</RouterLink>
  <RouterLink :to="{name: 'devices'}">Devices ({{devicesCount}})</RouterLink>
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
export default {
  computed: {
    groupsCount() {
      return this.$store.getters['groups/count']
    },
    networkCount() {
      return 1
    },
    devicesCount() {
      return 0
    }
  }
}
</script>
