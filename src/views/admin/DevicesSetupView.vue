<template>
  <Screen :back="{name: 'admin-devices-init'}">
  <div class="page">
    <p>What would you like your device to be called?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Device name" v-model="name" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'

export default {
  data: () => ({
    name: ''
  }),
  components: {
    Screen
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('devices/setup', name)
        this.name = ''
        this.$router.replace({name: 'admin-devices'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
