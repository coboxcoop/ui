<template>
  <form @submit.prevent="onSubmit">
    <p>Welcome to CoBox. How do you want to be known to your peers?</p>
    <input type="text" placeholder="My name" v-model="name" />
    <button type="submit">Submit</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    name: '',
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch('submitName', this.name)

      this.name = ''
    }
  }
}
</script>
