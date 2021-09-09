<template>
  <div class="fraction">
    <span class="numerator">{{ numerator }}</span>
    <span class="divide">&frasl;</span>
    <span class="denominator">{{ denominator }}</span>
    <div></div>
  </div>
</template>

<script>
export default {
  props: {
    numerator: {
      type: Number,
      default: () => 0
    },
    denominator: {
      type: Number,
      default: () => 0
    }
  }
}
</script>

<style>
.fraction {
  display: flex;
  justify-content: center;
}

.denominator, .numerator {
}

.denominator {
  display: flex;
  align-items: flex-end;
}

.divide {
  font-size: 6rem;
}
</style>
