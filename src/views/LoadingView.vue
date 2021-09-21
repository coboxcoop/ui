<template>
  <div class="loading">
    <Spinner />
  </div>
</template>

<script>
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'Loading',
  components: {
    Spinner
  }
}
</script>

<style scoped></style>
