<template>
<Screen :back="{name: 'spaces'}">

  <template v-slot:header>
    Settings
  </template>

  <NavList>
    <RouterLink :to="{name: 'acknowledgment'}" v-shortkey="['ctrl', 'alt', 'k']" @shortkey.native="navigate({name: 'acknowledgment'})">
      Acknowledgment
    </RouterLink>
    <RouterLink :to="{name: 'advanced'}" v-shortkey="['ctrl', 'alt', 'a']" @shortkey.native="navigate({name: 'advanced'})">
      Advanced
    </RouterLink>
    <RouterLink :to="{name: 'appearance'}" v-shortkey="['ctrl', 'a']" @shortkey.native="navigate({name: 'appearance'})">
      Appearance
    </RouterLink>
    <RouterLink :to="{name: 'manage-keys'}" v-shortkey="['ctrl', 'k']" @shortkey.native="navigate({name: 'manage-keys'})">
      Manage Keys
    </RouterLink>
    <RouterLink :to="{name: 'seeders'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'seeders'})">
      Operate Seeders
    </RouterLink>
    <RouterLink :to="{name: 'options'}" v-shortkey="['ctrl', 'o']" @shortkey.native="navigate({name: 'options'})">
      Options
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
