<template>
<Dot :color="color" />
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
    connected() {
      return this.$store.getters['groups/connected'](this.address)
    },
    color() {
      if(this.connected) return 'lightseagreen'
      return 'lightgray'
    }
  }
}
</script>
