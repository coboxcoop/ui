<template>
<Screen :back="{name: 'manage-keys'}">
  <div class="page">
    <p>Click the button below to export your keys to downloadable PDF file</p>

    <a href="#" @click.prevent="onSubmit">Download paper keys</a>
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
    }
  }
}
</script>
