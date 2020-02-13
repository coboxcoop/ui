<template>
<Index v-if="$store.getters['onboardingComplete']" />
<Onboarding v-else />
</template>

<script>
import Index from '@/views/Index.vue'
import Onboarding from '@/views/Onboarding.vue'

export default {
  components: {
    Index,
    Onboarding
  }
}
</script>
