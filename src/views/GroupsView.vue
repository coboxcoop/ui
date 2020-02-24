<template>
<SubPage>
  <template v-slot:header>Groups</template>
  <NavList v-for="group in groups" :key="group.address">
    <RouterLink :to="{name: 'group', params: {address: group.address}}">
      <Dot color="lightseagreen" /> {{group.name}}
    </RouterLink>
  </NavList>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'
import NavList from '@/components/NavList.vue'
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot,
    SubPage,
    NavList
  },
  computed: {
    groups() {
      return this.$store.state.groups.data
    }
  }
}
</script>