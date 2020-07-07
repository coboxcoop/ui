<template>
<div>
  <div class="header">
    <div class="left">
      <RouterLink v-if="back" :to="back" class="back">
        <TriangleIcon class="triangle" />
      </RouterLink>
      <RouterLink :to="{name: 'profile'}">
        <Dot :color="$store.getters['profile/myKeyColor']" /> {{$store.getters['profile/myName']}}
      </RouterLink>
    </div>

    <div class="disk">0%</div>
  </div>
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  .left {
    display: flex;
  }
  .back {
    position: relative;
    width: 1em;
    height: 1em;
    display: inline-block;
    .triangle {
      width: 0.4em;
      height: auto;
      top: 55%; left: 37%;
      position: absolute;
      transform: translate(-50%, -50%) rotate(180deg);
      transform-origin: center center;
    }
  }
}
.user {
  cursor: pointer;
  display: block;
}
.disk {
  color: lightgray;
}
.dot {
  margin-right: 0.3rem;
}
</style>

<script>
import Dot from '@/components/Dot.vue'
import TriangleIcon from '@/components/TriangleIcon.vue'

export default {
  components: {
    Dot,
    TriangleIcon
  },
  props: {
    back: Object
  }
}
</script>
