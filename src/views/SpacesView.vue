<template>
  <Screen>
  <template v-slot:header>
    <div v-shortkey="{profile: ['ctrl', 'p'], home: ['ctrl', 'h'], forward: ['ctrl', 'arrowright']}" @shortkey="shortKeyAction">Spaces</div>
    <RouterLink :to="{name: 'spaces-init'}" v-shortkey="['ctrl', 'space']" @shortkey.native="navigate({name: 'spaces-init'})">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="(space, index) in spaces" :key="space.address">
  <RouterLink class="space" :to="{name: 'space', params: {address: space.address}}" v-shortkey="['o']" @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
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
    shortKeyAction(event) {
      switch (event.srcKey) {
        case 'profile':
          this.$router.push("/profile")
          break;
        case 'home':
          this.$router.push("/")
          break;
        case 'forward':
          this.$router.go(1)
          break;
        default:
          this.$router.push("/")
      }
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
