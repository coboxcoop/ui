<template>
<div class="header">
  <div><Dot :color="$store.getters['myKeyColor']"/> {{$store.state.profile.name}}</div>
  <div class="disk">0%</div>
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid;
}
.disk {
  color: lightgray;
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
