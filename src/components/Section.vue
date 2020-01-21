<template>
<div class="section">
  <div class="heading" @click="$emit('toggle')">
    <slot name="heading" />
  </div>
  <div class="body" v-if="show">
    <slot />
  </div>
</div>
</template>

<script>
export default {
  props: {
    show: Boolean
  }
}
</script>

<style scoped>
.section {
  border-bottom: 1px solid;
}
.body {
}
.heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
}
</style>
