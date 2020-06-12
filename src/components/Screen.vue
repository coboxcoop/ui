<template>
<div class="screen">
  <div class="sticky">
    <MeHeader :back="back" />
    <header v-if="$slots.header">
      <slot name="header" />
    </header>
  </div>
  <div class="inner">
    <slot />
  </div>
</div>
</template>

<style lang="scss">
.screen header .plus {
  position: absolute;
  top: 1.2rem;
  right: 0;
}
</style>
<style lang="scss" scoped>
.screen {
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
  background: var(--bg);
  display: flex;
  flex-direction: column;
  transform: translateZ(0);
}
header {
  border-top: 1px solid var(--fg);
  padding: 0.6rem 0;
  position: relative;
}
.sticky {
  position: sticky;
  top: 0; left: 0;
  z-index: 2;
  width: 100%;
  background: var(--bg);
  padding: 1.6rem;
  padding-bottom: 0;
}
.inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.6rem;
  padding-top: 0;
}
</style>

<script>
import MeHeader from '@/components/MeHeader.vue'

export default {
  props: {
    back: Object
  },
  components: {
    MeHeader
  }
}
</script>