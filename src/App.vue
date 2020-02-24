<template>
<div id="app"> 
  <transition name="fade">
    <div v-if="ready" class="yield">
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
      this.$store.dispatch('groups/fetch')
    } else {
      this.$router.replace({name: 'home'})
    }
  },
  computed: {
    ready() {
      return this.$store.state.ready
    },
    hasName() {
      return this.$store.getters['profile/hasName']
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  padding: 1.6rem;
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
}
</style>

<style lang="scss" src="@/global.scss" />
