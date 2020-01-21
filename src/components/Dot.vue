<template>
  <div class="dot" :style="{background: color}">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    color: String
  }
}
</script>

<style scoped>
.dot {
  border-radius: 50%;
  width: 0.75em;
  height: 0.75em;
  background: black;
  display: inline-block;
  position: relative;
}
</style>
