<template>
<div id="app"> 
  <div v-if="ready" class="yield">
    <Layout v-if="hasName" />
    <OnboardingView v-else />
  </div>
  <div v-else>Please wait...</div>
</div>
</template>

<script>
import Layout from '@/components/Layout.vue'
import OnboardingView from '@/views/OnboardingView.vue'

export default {
  components: {
    Layout,
    OnboardingView
  },
  mounted() {
    this.$store.dispatch('init')
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
.yield {
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>

<style lang="scss" src="@/global.scss" />
