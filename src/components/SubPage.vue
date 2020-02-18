<template>
<div>
  <header>
    <RouterLink class="back" :to="{name: 'home'}">
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
  border-bottom: 1px solid;
  padding: 0.6rem 0;
  margin-bottom: 0.6rem;
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
</style>