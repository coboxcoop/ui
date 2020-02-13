<template>
<form @submit.prevent="onSubmit">
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
