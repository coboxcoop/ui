<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>
    Groups
    <RouterLink :to="{name: 'groups-init'}">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="group in groups" :key="group.address">
    <RouterLink :to="{name: 'group', params: {address: group.address}}">
      <GroupIcon :address="group.address" /> {{group.name}}
    </RouterLink>
  </NavList>
</Screen>
</template>

<style scoped lang="scss">
.group-icon {
  margin-right: 0.3rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import GroupIcon from '@/components/GroupIcon.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    GroupIcon,
    Screen,
    NavList,
    Plus
  },
  computed: {
    groups() {
      return this.$store.state.groups.data
    }
  }
}
</script>