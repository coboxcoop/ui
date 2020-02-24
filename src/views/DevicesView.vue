<template>
<SubPage>
  <template v-slot:header>Devices</template>
  <nav v-for="device in devices" :key="device.address">
    <RouterLink :to="{name: 'device', params: {address: device.address}}">
      <Dot color="magenta" /> {{device.name}}
    </RouterLink>
  </nav>
</SubPage>
</template>

<style lang="scss" scoped>
nav {
  margin-top: -0.6rem;
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
import SubPage from '@/components/SubPage.vue'
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot,
    SubPage
  },
  computed: {
    devices() {
      return this.$store.state.devices.data
    }
  }
}
</script>
