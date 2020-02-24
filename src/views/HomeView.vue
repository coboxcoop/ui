<template>
<nav>
  <div>
    <RouterLink :to="{name: 'groups'}">
      Groups {{groupsCount}}
    </RouterLink>
    <RouterLink :to="{name: 'groups-init'}">
      <Plus />
    </RouterLink>
  </div>
  <div>
    <RouterLink :to="{name: 'devices'}">
      Devices {{devicesCount}}
    </RouterLink>
    <RouterLink :to="{name: 'devices-init'}">
      <Plus />
    </RouterLink>
  </div>
  <div>
    <RouterLink :to="{name: 'network'}">
      Network {{networkCount}}
    </RouterLink>
  </div>
</nav>
</template>

<style lang="scss" scoped>
nav {
  > div {
    display: block;
    padding: 0.6rem 0;
    position: relative;
    &:not(:last-child) {
      border-bottom: 1px solid;
    }
  }
  .dot {
    position: absolute;
    top: 1.2rem;
    right: 0;
  }
}
</style>

<script>
import Plus from '@/components/Plus.vue'

export default {
  components: {
    Plus
  },
  computed: {
    groupsCount() {
      return this.$store.getters['groups/count']
    },
    networkCount() {
      return 1
    },
    devicesCount() {
      return this.$store.getters['devices/count']
    }
  }
}
</script>
