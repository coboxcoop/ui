<template>
<div id="create-group">
  <button v-on:click.prevent="onClick" v-model="group">Create Group</button>
</div>
</template>

<script>
export default {
  name: 'create-group',
  data: () => ({
    group: '',
  }),
  methods: {
    onClick() {
      console.log("testing onClick {this.group}")
      this.$store.dispatch('startCreateGroup', this.group)
    }
  }
}
</script>
