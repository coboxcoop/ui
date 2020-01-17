<template>
<div>
  <p>Welcome to CoBox. How do you want to be known to your peers?</p>
  <form @submit.prevent="onSubmitName">
    <input v-model="myName" type="text" placeholder="My name" />
    <button type="submit">Ok</button>
  </form>
</div>
</template>

<script>
export default {
  data: () => ({
    myName: ''
  }),
  methods: {
    onSubmitName() {
      this.$store.dispatch('addMyName', this.myName)
      this.myName = ''
    }
  }
}
</script>
