<template>
<div id="app"> 
  <transition name="fade">
    <OfflineView v-if="offline" />
    <div v-else-if="ready" class="yield">
      <div v-if="hasName">
        <transition name="route">
          <router-view />
        </transition>
      </div>
      <OnboardingView v-else />
    </div>
  </transition>
  <Errors />
</div>
</template>

<script>
import OnboardingView from '@/views/OnboardingView.vue'
import OfflineView from '@/views/OfflineView.vue'
import Errors from '@/components/Errors.vue'

export default {
  components: {
    Errors,
    OnboardingView,
    OfflineView
  },
  async mounted() {
    await this.$store.dispatch('init')

    this.setDark()

    if(this.hasName) {
      await this.$store.dispatch('fetchAllData')
      await this.$store.dispatch('initData')
    } else {
      this.$router.replace({name: 'spaces'})
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
    },
    dark() {
      return this.$store.state.settings.dark
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('error/dismiss')
    },
    dark() {
      this.setDark()
    }
  },
  methods: {
    reload() {
      window.location.reload()
    },
    setDark() {
      console.warn('set dar', this.$store.state.settings.dark)
      const act = this.$store.state.settings.dark ? 'add' : 'remove'
      document.documentElement.classList[act]('dark')
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  margin: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  max-width: 34rem;
  max-height: 52rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 1rem var(--shadow);
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
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
}
.route-enter-active, .route-leave-active {
  transition: opacity 0.3s var(--ease);
}
.route-enter, .route-leave-to {
  opacity: 0;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s var(--ease);
}
</style>

<style lang="scss" src="@/global.scss" />
