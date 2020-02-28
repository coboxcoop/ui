<template>
  <Screen :back="{name: 'admin-devices-init'}">
  <div class="page">
    <p>What would you like your device to be called?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Device name" v-model="deviceName" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'

export default {
  data: () => ({
    deviceName: ''
  }),
  components: {
    Screen
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('admin/devices/setup', this.deviceName)
        this.deviceName = ''
        this.$router.replace({name: 'devices'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
