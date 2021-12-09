<template>
  <div class="health-icon">
    <div v-if="validColour">
      <img style="margin: 1rem 1rem 0 0; height: 6rem;" :src="require(`@/assets/images/icons/health-${this.colour}.png`)" alt="cobox heart icon">
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
  methods: {
    validColour () {
      return ['green', 'red', 'amber', 'white'].includes(this.colour)
    }
  }
}
</script>

