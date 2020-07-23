<template>
<div class="container">
  <p>Welcome to CoBox. How do you want to be known to your peers?</p>
  <form @submit.prevent="onSubmitName">
    <input v-model="name" class="has-ok-button" type="text" placeholder="My name" />
    <button type="submit">Ok</button>
  </form>
  <small>You can change it anytime via your profile</small>

  <div class="bottom">
    <button @click.prevent>Import identity</button>
  </div>
</div>
</template>

<style scoped lang="scss">
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
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
        this.name = this.name.trim()
        await this.$store.dispatch('profile/updateName', this.name)
        await this.$store.dispatch('spaces/create', `${this.name}'s space`)
        this.name = ''
        if(this.$route.name !== 'spaces') this.$router.replace({name: 'spaces'})
        await this.$store.dispatch('fetchAllData')
        await this.$store.dispatch('initData')
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
