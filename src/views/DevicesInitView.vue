<template>
<SubPage>
  <div class="content">
    <p>Hi {{$store.getters['profile/myName']}}, what would you like to do?</p>

    <nav>
      <RouterLink :to="{name: 'devices-join'}">Join a device</RouterLink>
      <RouterLink :to="{name: 'devices-setup'}">Setup a device</RouterLink>
    </nav>

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
