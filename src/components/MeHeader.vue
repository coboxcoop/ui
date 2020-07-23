<template>
<div v-shortkey="{profile: ['ctrl', 'p'], home: ['ctrl', 'h'], forward: ['ctrl', 'arrowright']}" @shortkey="shortKeyAction">
  <div class="header">
    <div class="left">
      <RouterLink v-if="back" :to="back" class="back" v-shortkey="['ctrl', 'arrowleft']" @shortkey.native="navigate(back)">
        <TriangleIcon class="triangle" />
      </RouterLink>
      <RouterLink to="/" class="logo">
        <img src="@/assets/images/icons/CoBox-icon.png" class="cloud" />
        <h1>CoBox</h1>
      </RouterLink>
    </div>

    <RouterLink :to="{name: 'settings'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'settings'})" class="settings">
      <img src="@/assets/images/icons/settings.svg" />
    </RouterLink>
  </div>
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  height: 3.6rem;
  .logo {
    display: flex;
    .cloud {
      height: 0.8em;
      width: auto;
      margin-top: 0.3rem;
      html.dark & {
        filter: invert(1);
      }
    }
    h1 {
      margin-left: 0.8rem;
      margin-top: -0.25rem;
    }
  }
  .settings {
    margin-left: auto;
    img {
      html.dark & {
        filter: invert(1);
      }
    }
  }
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
import TriangleIcon from '@/components/TriangleIcon.vue'

export default {
  components: {
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
            this.$router.push("/settings/profile")
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
