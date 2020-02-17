<template>
<div class="header">
  <div><Dot :color="$store.getters['myKeyColor']"/> {{$store.state.profile.name}}</div>
  <div>0%</div>
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
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
