<template>
  <div class="health-icon">
    <!-- TODO: fix the if else -->
    <div v-if="true">
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" src="@/assets/images/icons/health-green.png" alt="">
    </div>
    <div v-else>
      <!-- TODO: create a warning icon! -->
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" src="@/assets/images/icons/health-red.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
  }
}
</script>

