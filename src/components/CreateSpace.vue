<template>
<div id="create-space">
  <button v-on:click.prevent="onClick" v-model="space">Create Space</button>
</div>
</template>

<script>
export default {
  name: 'create-space',
  data: () => ({
    space: '',
  }),
  methods: {
    onClick() {
      console.log("testing onClick {this.space}")
      this.$store.dispatch('startCreateSpace', this.space)
    }
  }
}
</script>
