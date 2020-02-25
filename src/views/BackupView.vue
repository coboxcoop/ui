<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>Backup</template>
  <div class="page">
    <p>Where would you like to save your account to?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Filesystem location" v-model="path" />
      <button type="submit">Ok</button>
    </form>
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
      await this.$store.dispatch('backup/exportKeys', this.path)
      this.$router.push({name: 'home'})
    }
  }
}
</script>
