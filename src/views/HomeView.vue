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
      <RouterLink :to="{name: 'admin-devices'}">
        Devices <sup>{{devicesCount}}</sup>
      </RouterLink>
      <RouterLink :to="{name: 'admin-devices-init'}">
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
      return this.$store.getters['network/count']
    },
    devicesCount() {
      return this.$store.getters['devices/count']
    }
  }
}
</script>

