<template>
<div>
  <p>Welcome to CoBox. How do you want to be known to your peers?</p>
  <form @submit.prevent="onSubmitName">
    <input v-model="name" type="text" placeholder="My name" />
    <button type="submit">Ok</button>
  </form>
</div>
</template>

<script>
export default {
  data: () => ({
    name: ''
  }),
  methods: {
    onSubmitName() {
      this.$store.dispatch('updateName', this.name)
      this.name = ''
    }
  }
}
</script>
