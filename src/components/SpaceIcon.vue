<template>
<Dot class="space-icon" :color="color" />
</template>

<script>
import Dot from '@/components/Dot.vue'

export default {
  props: {
    address: String
  },
  components: {
    Dot
  },
  computed: {
    color() {
      if(this.connected) return 'lightseagreen'
      return 'lightgray'
    }
  }
}
</script>
