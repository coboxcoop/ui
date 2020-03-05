<template>
<div class="container">
  <p>Welcome to CoBox. How do you want to be known to your peers?</p>
  <form @submit.prevent="onSubmitName">
    <input v-model="name" type="text" placeholder="My name" />
    <button type="submit">Ok</button>
  </form>

  <div class="bottom">
    <button @click.prevent>Restore identity</button>
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
        await this.$store.dispatch('groups/create', `${this.name}'s Space`)
        this.name = ''
        if(this.$route.name !== 'home') this.$router.replace({name: 'home'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
