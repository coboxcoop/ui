<template>
<Screen :back="{name: 'spaces'}">

  <template v-slot:header>
    Settings
  </template>

  <NavList>
    <RouterLink :to="{name: 'accessibility'}" v-shortkey="['ctrl', 'a']" @shortkey.native="navigate({name: 'accessibility'})">
      Accessibility
    </RouterLink>
    <RouterLink :to="{name: 'advanced'}" v-shortkey="['ctrl', 'shift', 'a']" @shortkey.native="navigate({name: 'advanced'})">
      Advanced
    </RouterLink>
    <RouterLink :to="{name: 'manage-keys'}" v-shortkey="['ctrl', 'k']" @shortkey.native="navigate({name: 'manage-keys'})">
      Manage Keys
    </RouterLink>
    <RouterLink :to="{name: 'seeders'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'seeders'})">
      Seeders
    </RouterLink>
    <RouterLink :to="{name: 'profile'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
      Profile
    </RouterLink>
  </NavList>
  <div class="footer">CoBox {{info.version}}, UI {{uiVersion}}</div>
</Screen>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  font-size: var(--small);
}
</style>

<script>
import Screen   from '@/components/Screen.vue'
import NavList  from '@/components/NavList.vue'

export default {
  components: {
    Screen,
    NavList
  },
  computed: {
    uiVersion() {
      return process.env.VUE_APP_VERSION
    },
    info() {
      return this.$store.state.system.info
    }
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
