<template>
<Dot color="#f2f2f2">
  <span>+</span>
</Dot>
</template>

<script>
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot
  }
}
</script>

<style scoped>
span {
  position: absolute;
  top: 55%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  vertical-align: middle;
  font-size: 75%;
}
</style>
