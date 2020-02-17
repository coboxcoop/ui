<template>
<form @submit.prevent="onSubmit">
  <h2>ProfileModal</h2>
  <p>Update name</p>
  <input type="text" placeholder="My name" v-model="name" />
  <button type="submit">Submit</button>
</form>
</template>

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
