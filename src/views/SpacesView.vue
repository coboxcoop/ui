<template>
<Screen :back="{name: 'spaces'}">
  <template v-slot:header>
    Spaces <sup>{{$store.getters['spaces/count']}}</sup>
    <RouterLink :to="{name: 'spaces-init'}">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="space in spaces" :key="space.address">
    <RouterLink class="space" :to="{name: 'space', params: {address: space.address}}">
      <div>
        <SpaceIcon :address="space.address" /> {{space.name}} <sup>{{spacePeerCount(space.address)}}</sup>
      </div>
      <div class="stat" v-if="stat(space.address)">{{stat(space.address).size | bytes}}</div>
    </RouterLink>
  </NavList>
</Screen>
</template>

<style scoped lang="scss">
.space-icon {
  margin-right: 0.3rem;
}
.space {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import SpaceIcon from '@/components/SpaceIcon.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    SpaceIcon,
    Screen,
    NavList,
    Plus
  },
  methods: {
    stat(address) {
      return this.$store.getters['spaces/stat'](address)
    },
    spacePeerCount(address) {
      return this.$store.getters['spaces/peerCount'](address)
    }
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    }
  }
}
</script>
