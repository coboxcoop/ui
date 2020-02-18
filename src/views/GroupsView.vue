<template>
<SubPage>
  <template v-slot:header>Groups</template>
  <nav v-for="group in groups" :key="group.address">
    <RouterLink :to="{name: 'group', params: {address: group.address}}">
      <Dot color="lightseagreen" /> {{group.name}}
    </RouterLink>
  </nav>
</SubPage>
</template>

<style lang="scss" scoped>
nav {
  margin-top: -0.6rem;
  a {
    display: block;
    padding: 0.6rem 0;
    &:not(:last-child) {
      border-bottom: 1px solid;
    }
  }
}
</style>

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