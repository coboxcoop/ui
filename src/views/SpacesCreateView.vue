<template>
<Screen :back="{name: 'spaces-init'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <p>What would you like your Space to be called?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Space name" v-model="spaceName" class="has-ok-button" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style scoped lang="scss">
.page {
  border-top: 1px solid var(--fg);
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'

export default {
  data: () => ({
    spaceName: ''
  }),
  components: {
    Screen
  },
  methods: {
    navigate(to) {
      this.$router.push(to)
    },
    async onSubmit() {
      try {
        const {address} = await this.$store.dispatch('spaces/create', this.spaceName)
        this.spaceName = ''
        console.warn({space: address})
        this.$router.push({name: 'space', params: {address}})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
