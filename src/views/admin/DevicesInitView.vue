<template>
<Screen :back="{name: 'home'}">
  <div class="content">
    <p>Hi {{$store.getters['profile/myName']}}, what would you like to do?</p>

    <nav>
      <RouterLink :to="{name: 'admin-devices-join'}">Join a device</RouterLink>
      <RouterLink :to="{name: 'admin-devices-setup'}">Setup a device</RouterLink>
    </nav>

  </div>
</Screen>
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
import Screen from '@/components/Screen.vue'

export default {
  components: {
    Screen
  }
}
</script>
