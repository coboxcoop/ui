<template>
  <div class="health-icon">
    <div v-if="colour === 'green'">
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" src="@/assets/images/icons/health-green.png" alt="green cobox heart icon">
    </div>
    <div v-else-if="colour === 'amber'">
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" src="@/assets/images/icons/health-amber.png" alt="amber cobox heart icon">
    </div>
    <div v-else-if="colour === 'red'">
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" src="@/assets/images/icons/health-red.png" alt="red cobox heart icon">
    </div>
    <div v-else-if="colour === 'white'">
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" src="@/assets/images/icons/health-white.png" alt="white cobox heart icon">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    colour: {
      type: String,
      default: 'white'
    }
  },
}
</script>

