<template>
<div class="modal">
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="My name" v-model="name" />
    <button type="submit">Ok</button>
  </form>
</div>
</template>

<style scoped lang="scss">
</style>

<script>
export default {
  name: 'profile-modal',
  data: () => ({
    name: '',
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch('updateName', this.name)
    }
  }
}
</script>
