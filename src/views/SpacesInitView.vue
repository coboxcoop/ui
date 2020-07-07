<template>
<Screen :back="{name: 'spaces'}">
  <div class="content">
    <p>Hi {{$store.getters['profile/myName']}}, what would you like to do?</p>

    <NavList>
      <RouterLink :to="{name: 'spaces-join'}">Join a Space</RouterLink>
      <RouterLink :to="{name: 'spaces-create'}">Create a Space</RouterLink>
    </NavList>
  </div>
</Screen>
</template>

<style lang="scss" scoped>
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--fg);
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
