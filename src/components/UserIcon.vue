<template>
  <Dot class="user-icon" :color="color" />
</template>

<script>
import Dot from '@/components/Dot.vue'

export default {
  props: {
    peerId: String
  },
  components: {
    Dot
  },
  computed: {
    color() {
      return this.$store.getters['profile/keyColor'](this.peerId)
    }
  }
}
</script>
