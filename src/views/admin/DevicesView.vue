<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>
    Devices
    <RouterLink :to="{name: 'admin-devices-init'}">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="device in devices" :key="device.address">
    <RouterLink class="admin-device" :to="{name: 'admin-device', params: {address: device.address}}">
      <Dot color="magenta" :address="device.address" /> {{device.name}}
    </RouterLink>
  </NavList>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    Dot,
    Screen,
    NavList,
    Plus
  },
  computed: {
    devices() {
      return this.$store.state.devices.data
    }
    // localDevice() {
    //   return this.$store.state.device.data
    // }
  }
}
</script>
