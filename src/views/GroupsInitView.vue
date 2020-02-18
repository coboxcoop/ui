<template>
<SubPage>
  <div class="content">
    <p>Hi {{$store.state.profile.name}}, what would you like to do?</p>

    <nav>
      <RouterLink :to="{name: 'groups-join'}">Join a group</RouterLink>
      <RouterLink :to="{name: 'groups-create'}">Create a group</RouterLink>
    </nav>

    <div class="bottom">or set up a new device</div>
  </div>
</SubPage>
</template>

<style lang="scss" scoped>
nav a {
  display: block;
  padding: 0.6rem 0;
  border-bottom: 1px solid;
}
.content {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.bottom {
  margin-top: auto;
}
</style>

<script>
import SubPage from '@/components/SubPage.vue'

export default {
  components: {
    SubPage
  }
}
</script>