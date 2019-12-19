<template>
  <welcomeScreen v-if="!$store.getters.hasBeenWelcomed" />
  <!-- <div v&#45;else>You are welcomed</div> -->
</template>

<script>
import WelcomeScreen from '@/components/WelcomeScreen.vue'

export default {
  components: {
    WelcomeScreen
  }
}
</script>
