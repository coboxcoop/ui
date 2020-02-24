<template>
<Screen :back="{name: 'home'}">
  <div class="content">
    <p>Hi {{$store.getters['profile/myName']}}, what would you like to do?</p>

    <NavList>
      <RouterLink :to="{name: 'groups-join'}">Join a group</RouterLink>
      <RouterLink :to="{name: 'groups-create'}">Create a group</RouterLink>
    </NavList>

    <div class="bottom">or set up a new device</div>
  </div>
</Screen>
</template>

<style lang="scss" scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid;
  padding-top: 0.6rem;
}
.bottom {
  margin-top: auto;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'

export default {
  components: {
    Screen,
    NavList
  }
}
</script>