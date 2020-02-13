<template>
<div class="header">
  <div><Dot color="green"/> {{$store.state.profile.name}}</div>
  <div>0%</div>
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot
  }
}
</script>
