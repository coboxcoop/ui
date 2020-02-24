<template>
<div class="screen">
  <MeHeader :back="back" />
  <header v-if="$slots.header">
    <slot name="header" />
  </header>
  <slot />
</div>
</template>

<style lang="scss" scoped>
header {
  border-top: 1px solid;
  padding: 0.6rem 0;
}
.screen {
  flex: 1;
  display: flex;
  flex-direction: column;
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