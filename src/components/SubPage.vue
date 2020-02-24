<template>
<div class="subpage">
  <header v-if="$slots.header">
    <RouterLink class="back" :to="{name: 'home'}" >
      <TriangleIcon class="triangle" />
    </RouterLink>
    <slot name="header" />
  </header>
  <div class="inner">
    <slot />
  </div>
</div>
</template>

<script>
import TriangleIcon from '@/components/TriangleIcon.vue'

export default {
  components: {
    TriangleIcon
  }
}
</script>

<style lang="scss" scoped>
header {
  padding: 0.6rem 0;
  border-top: 1px solid;
  .back {
    position: relative;
    width: 1em;
    height: 0.6em;
    display: inline-block;
  }
  .triangle {
    width: 0.4em;
    height: auto;
    top: 50%; left: 37%;
    position: absolute;
    transform: translate(-50%, -50%) rotate(180deg);
    transform-origin: center center;
  }
}
.subpage {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>