<template>
<div class="toggle-switch" :class="{on: !!value}" @click="$emit('input', !value)">
  <div class="pill-outer">
    <i class="pill" />
  </div>
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
  &.on .pill-outer {
    transform: translateX(100%);
  }
  &:not(.on) .pill {
    opacity: 0.3;
  }
  .pill {
    &-outer {
      width: 1em;
      height: 1em;
      display: block;
      transition: transform 0.3s var(--ease);
      position: relative;
    }
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: var(--fg);
    border-radius: 50%;
    transition: transform 0.3s var(--ease), opacity 0.3s var(--ease);
    transform: scale(0.8);
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