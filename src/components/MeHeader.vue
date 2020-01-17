<template>
<div>
  <Dot color="green"/> {{$store.state.me.name}} 0%
</div>
</template>

<script>
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot
  }
}
</script>
