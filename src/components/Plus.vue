<template>
<Dot color="var(--fg)" class="plus" :class="{minus}">
  <span v-if="minus">&ndash;</span>
  <span v-else>+</span>
</Dot>
</template>

<script>
import Dot from '@/components/Dot.vue'

export default {
  props: {
    minus: Boolean
  },
  components: {
    Dot
  }
}
</script>

<style scoped>
span {
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  vertical-align: middle;
  font-size: 75%;
  color: var(--bg);
}
.minus span {
  top: 40%;
}
</style>
