<template>
<div class="layout">
  <MeHeader />
  <RouterView />
</div>
</template>

<style lang="scss" scoped>
.layout {
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