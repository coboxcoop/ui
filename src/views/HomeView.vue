<template>
<Screen>
  <NavList>
    <div>
      <RouterLink :to="{name: 'groups'}">
        Groups <sup>{{groupsCount}}</sup>
      </RouterLink>
      <RouterLink :to="{name: 'groups-init'}">
        <Plus />
      </RouterLink>
    </div>
    <div>
      <RouterLink :to="{name: 'devices'}">
        Devices <sup>{{devicesCount}}</sup>
      </RouterLink>
      <RouterLink :to="{name: 'devices-add'}">
        <Plus />
      </RouterLink>
    </div>
    <div>
      <RouterLink :to="{name: 'network'}">
        Network <sup>{{networkCount}}</sup>
      </RouterLink>
    </div>
  </NavList>
</Screen>
</template>

<style lang="scss" scoped>
nav {
  .dot {
    position: absolute;
    top: 1.2rem;
    right: 0;
  }
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import Plus from '@/components/Plus.vue'
import NavList from '@/components/NavList.vue'

export default {
  components: {
    Screen,
    NavList,
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
      return 0
    }
  }
}
</script>
