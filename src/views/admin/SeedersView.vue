<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>
    Seeders
    <RouterLink :to="{name: 'admin-seeders-join'}">
      <Plus />
    </RouterLink>
  </template>
  <NavList >
    <RouterLink v-for="seeder in seeders" :key="seeder.address" class="admin-seeder" :to="{name: 'admin-seeder', params: {address: seeder.address}}">
    <Dot color="magenta" :address="seeder.address" /> {{seeder.name}}
    </RouterLink>
  </NavList>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    Dot,
    Screen,
    NavList,
    Plus
  },
  computed: {
    seeders() {
      return this.$store.state.seeders.seeders
    }
  }
}
</script>
