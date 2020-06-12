<template>
<Screen :back="{name: 'home'}">
  <div class="content">
    <p>Hi {{$store.getters['profile/myName']}}, what would you like to do?</p>

    <nav>
      <RouterLink :to="{name: 'admin-seeders-join'}">Join a seeder</RouterLink>
      <RouterLink :to="{name: 'admin-seeders-setup'}">Setup a seeder</RouterLink>
    </nav>

  </div>
</Screen>
</template>

<style lang="scss" scoped>
nav a {
  display: block;
  padding: 0.6rem 0;
  border-bottom: 1px solid var(--fg);
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
