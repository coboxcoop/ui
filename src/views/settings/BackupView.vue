<template>
<Screen :back="{name: 'manage-keys'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <p>Click the button below to export your keys to downloadable PDF file</p>

    <a href="#" @click.prevent="onSubmit" v-shortkey.once="['ctrl', 'd']" @shortkey="onSubmit">Download paper keys</a>
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
      const {data} = await this.$store.dispatch('backup/exportKeys')
      const a = document.createElement('a')
      a.href = data
      a.download = 'key-backup.pdf'
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
