<template>
<SubPage>
  <div class="page">
    <p>What would you like your device to be called?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Device name" v-model="deviceName" />
      <button type="submit">Ok</button>
    </form>
  </div>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'

export default {
  data: () => ({
    deviceName: ''
  }),
  components: {
    SubPage
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('devices/setup', this.deviceName)
        this.deviceName = ''
        this.$router.replace({name: 'devices'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
