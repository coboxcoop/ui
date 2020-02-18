<template>
<SubPage>
  <template v-slot:header>Groups</template>
  <div v-for="group in groups" :key="group.address">
    <Dot color="lightseagreen" /> {{group.name}}
  </div>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot,
    SubPage
  },
  computed: {
    groups() {
      return this.$store.state.groups.data
    }
  }
}
</script>