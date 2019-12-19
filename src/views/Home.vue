<template>
  <welcome-screen v-if="!$store.getters.hasBeenWelcomed" />
  <div v-else>
    <p>Hey {{ $store.state.name }}, what would you like to do?</p>
    <!-- <create&#45;space @add:space="createSpace" /> -->
    <create-space />
    <p>Join a space</p>
  </div>
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen.vue'
import CreateSpace from '@/components/CreateSpace.vue'

export default {
  components: {
    WelcomeScreen,
    CreateSpace,
  },
}
</script>
