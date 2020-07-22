<template>
<Screen :back="{name: 'manage-keys'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <p>Click the button below to export your nickname, keys, spaces, and seeders.
      Keep this in a safe place as it includes your secret keys!</p>

    <a href="#" @click.prevent="onSubmit" v-shortkey.once="['ctrl', 'd']" @shortkey="onSubmit">Download secrets</a>
  </div>
</Screen>
</template>

<style lang="scss" scoped>
.page {
  border-top: 1px solid;
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'

export default {
  data: () => ({
    path: ''
  }),
  components: {
    Screen
  },
  methods: {
    async onSubmit() {
      const {data} = await this.$store.dispatch('backup/export')
      const a = document.createElement('a')
      a.href = data
      a.download = 'backup.cobox'
      a.click()
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
