<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>
    Seeders <sup>{{$store.getters['seeders/count']}}</sup>
    <RouterLink :to="{name: 'admin-seeders-join'}">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="seeder in seeders" :key="seeder.address">
    <RouterLink class="admin-seeder" :to="{name: 'admin-seeder', params: {address: seeder.address}}">
    <Dot color="magenta" :address="seeder.address" /> {{seeder.name}} <sup>{{seederPeerCount(seeder.address)}}</sup>
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
  },
  methods: {
    seederPeerCount(address) {
      return this.$store.getters['seeders/peerCount'](address)
    }
  }
}
</script>
