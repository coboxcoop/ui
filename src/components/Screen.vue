<template>
<div class="screen">
  <MeHeader />
  <slot />
</div>
</template>

<style lang="scss" scoped>
.screen {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

<script>
import MeHeader from '@/components/MeHeader.vue'

export default {
  components: {
    MeHeader
  }
}
</script>