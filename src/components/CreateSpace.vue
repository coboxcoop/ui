<template>
  <div id="create-space">
    <button v-on:click.prevent="handleClick">Create Space</button>
  </div>
</template>

<script>
export default {
  name: 'create-space',
  data: () => ({
  }),
  methods: {
  // https://www.taniarascia.com/getting-started-with-vue/#methods
  // onSubmit() {
  //   this.store.dispatch('submitClick')
  // },
    handleClick() {
      console.log('testing handleClick')
    }
  }
}
</script>
