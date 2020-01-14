<template>
  <!-- <welcome&#45;screen v&#45;if="!$store.getters.hasBeenWelcomed" /> -->
  <!-- <div v&#45;else> -->
  <!--   <p>Hey {{ $store.state.name }}, what would you like to do?</p> -->
  <!--   <!&#45;&#45; <create&#38;#45;space @add:space="createSpace" /> &#45;&#45;> -->
  <!--   <create&#45;space /> -->
  <!--   <p>Join a space</p> -->
  <!-- </div> -->
  <Index />
</template>

<script>
// import WelcomeScreen from '@/components/WelcomeScreen.vue'
// import CreateSpace from '@/components/CreateSpace.vue'
import Index from '@/components/Index.vue'
export default {
  components: {
    // WelcomeScreen,
    // CreateSpace,
    Index,
  },
}
</script>
