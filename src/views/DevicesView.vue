<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>Devices</template>
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