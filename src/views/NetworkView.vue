<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>Network</template>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'

export default {
  components: {
    Screen
  }
}
</script>