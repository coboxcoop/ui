<template>
<div class="container">
  <p>Welcome to CoBox. How do you want to be known to your peers?</p>
  <form @submit.prevent="onSubmitName">
    <input v-model="name" type="text" placeholder="My name" />
    <button type="submit">Ok</button>
  </form>

  <div class="bottom">Backup account</div>
</div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.bottom {
  margin-top: auto;
}
</style>

<script>
export default {
  data: () => ({
    name: ''
  }),
  methods: {
    async onSubmitName() {
      try {
        await this.$store.dispatch('profile/updateName', this.name)
        this.name = ''
        this.$router.replace({name: 'groups-init'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
