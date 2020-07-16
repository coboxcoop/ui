<template>
  <Screen v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    Spaces
    <RouterLink :to="{name: 'spaces-init'}" v-shortkey="['ctrl', 'space']" @shortkey.native="navigate({name: 'spaces-init'})">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="space in spaces" :key="space.address">
  <RouterLink class="space" :to="{name: 'space', params: {address: space.address}}" v-shortkey="['f' + (space +1)]" @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
      <div>
        <SpaceIcon :address="space.address" /> {{space.name}}
      </div>
      <div class="stat" v-if="stat(space.address)">{{stat(space.address).size | bytes}}</div>
    </RouterLink>
  </NavList>

  <footer>
    <RouterLink :to="{name: 'settings'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'settings'})">
      <img src="@/assets/images/icons/settings.svg" /> Settings
    </RouterLink>
  </footer>
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
html.dark footer img {
  filter: invert(1);
}
footer {
  margin-top: auto;
  line-height: 1;
  font-size: var(--small);
  img {
    display: inline-block;
    width: auto;
    height: 0.85em;
    margin-bottom: -0.07em;
  }
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
    navigate(to) {
      this.$router.push(to)
    }
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    }
  }
}
</script>
