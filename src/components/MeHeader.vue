<template>
<div v-shortkey="{profile: ['ctrl', 'p'], home: ['ctrl', 'h'], forward: ['ctrl', 'arrowright']}" @shortkey="shortKeyAction">
  <div class="header">
    <div class="left">
      <RouterLink v-if="back" :to="back" class="back" v-shortkey="['ctrl', 'arrowleft']" @shortkey.native="navigate(back)">
        <TriangleIcon class="triangle" />
      </RouterLink>
      <RouterLink :to="{name: 'profile'}" >
        <Dot :color="$store.getters['profile/myKeyColor']" /> {{$store.getters['profile/myName']}}
      </RouterLink>
    </div>

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
  },
  methods: {
    shortKeyAction(event) {
      if (this.$store.state.settings.shortkey) {
        switch (event.srcKey) {
          case 'profile':
            this.$router.push("/profile")
            break;
          case 'home':
            this.$router.push("/")
            break;
          case 'forward':
            this.$router.go(1)
            break;
          default:
            this.$router.push("/")
        }
      }
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
