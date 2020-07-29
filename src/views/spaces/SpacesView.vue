<template>
  <Screen>
  <template v-slot:header>
    Folders
    <RouterLink :to="{name: 'spaces-init'}" v-shortkey="['ctrl', 'space']" @shortkey.native="navigate({name: 'spaces-init'})">
      <Plus />
    </RouterLink>
  </template>

  <div v-if="!spaces.length" class="help">
    Welcome to CoBox! To get started, create your first folder by cklicking the plus button above.
  </div>
  <div v-else>
    <NavList>
      <RouterLink v-for="space in spaces" :key="space.address" class="space" :to="{name: 'space', params: {address: space.address}}" v-shortkey="['ctrl', 'enter' ]" @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
        <div>{{space.name}}</div>
        <div class="stat" v-if="stat(space.address)">{{stat(space.address).size | bytes}}</div>
      </RouterLink>
    </NavList>
  </div>
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
.help {
  border-top: 1px solid;
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    Screen,
    NavList,
    Plus
  },
  methods: {
    stat(address) {
      return this.$store.getters['spaces/stat'](address)
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    }
  }
}
</script>
