<template>
<div class="toggle-switch" :class="{on: !!value}" @click="$emit('input', !value)">
  <i class="pill" />
  <div class="bg" />
</div>
</template>

<style scoped lang="scss">
.toggle-switch {
  width: 2em;
  height: 1em;
  position: relative;
  overflow: hidden;
  border-radius: 1em;
  cursor: pointer;
  .bg {
    position: absolute;
    background: var(--fg);
    opacity: 0.1;
    top: 0; left: 0;
    width: 100%;
    height: 100%;
  }
  &.on .pill {
    transform: translateX(100%);
  }
  .pill {
    width: 1em;
    height: 1em;
    display: block;
    background: var(--fg);
    border-radius: 50%;
    transition: transform 0.3s var(--ease);
  }
}
</style>

<script>
export default {
  props: {
    value: true
  }
}
</script>