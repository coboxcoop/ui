<template>
<div id="app"> 
  <transition name="fade">
    <div v-if="offline" class="offline">
      <img src="@/assets/images/icons/CoBox-icon.png" />
      <p>
        Could not connect<br />to CoBox API server.<br />
        <a @click.prevent="reload" href="#">Reload</a>
      </p>
    </div>
    <div v-else-if="ready" class="yield">
      <RouterView v-if="hasName" />
      <OnboardingView v-else />
    </div>
  </transition>
  <Errors />
</div>
</template>

<script>
import OnboardingView from '@/views/OnboardingView.vue'
import Errors from '@/components/Errors.vue'

export default {
  components: {
    Errors,
    OnboardingView
  },
  async mounted() {
    await this.$store.dispatch('init')
    if(this.hasName) {
      await this.$store.dispatch('groups/fetch')
      await this.$store.dispatch('devices/fetch')
      await this.$store.dispatch('groups/joinAll')
      await this.$store.dispatch('devices/joinAll')
      await this.$store.dispatch('devices/getAllPeers')
    } else {
      this.$router.replace({name: 'home'})
    }
  },
  computed: {
    ready() {
      return this.$store.state.ready
    },
    offline() {
      return this.$store.state.system.offline
    },
    hasName() {
      return this.$store.getters['profile/hasName']
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('error/dismiss')
    }
  },
  methods: {
    reload() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  background: white;
  margin: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  max-width: 34rem;
  max-height: 52rem;
  border-radius: 4px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
}
.offline {
  text-align: center;
  margin: auto;
  font-size: 70%;
  img {
    width: auto;
    height: 3em;
    margin-bottom: 1em;
  }
  a {
    text-decoration: underline;
  }
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s var(--ease);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.yield {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  padding: 1.6rem;
}
</style>

<style lang="scss" src="@/global.scss" />
