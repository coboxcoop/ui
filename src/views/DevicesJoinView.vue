<template>
<SubPage>
  <p>What is the invite key of the device?</p>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="Device invite key" v-model="deviceInviteKey" />
    <button type="submit">Ok</button>
  </form>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'

export default {
  components: {
    SubPage
  },
  data: () => ({
    deviceInviteKey: ''
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('devices/join', this.deviceInviteKey)
        this.deviceInviteKey = ''
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
