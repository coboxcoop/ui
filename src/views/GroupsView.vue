<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>Groups</template>
  <NavList v-for="group in groups" :key="group.address">
    <RouterLink :to="{name: 'group', params: {address: group.address}}">
      <Dot color="lightseagreen" /> {{group.name}}
    </RouterLink>
  </NavList>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Dot from '@/components/Dot.vue'

export default {
  components: {
    Dot,
    Screen,
    NavList
  },
  computed: {
    groups() {
      return this.$store.state.groups.data
    }
  }
}
</script>