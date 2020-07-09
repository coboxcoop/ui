<template>
<Screen :back="{name: 'spaces'}">
  <template v-slot:header>
    Settings
  </template>

  <RouterLink :to="{name: 'settings-admin-seeders'}">
    Admin
  </RouterLink>
  <NavList>
    <div class="switch">
      <label>Dark UI</label>
      <button @click="toggleDark">
        {{$store.state.settings.dark ? 'On' : 'Off'}}
      </button>
    </div>
  </NavList>
  <RouterLink :to="{name: 'settings-manage-keys'}">
    Manage Keys
  </RouterLink>
  <div class="footer">CoBox {{info.version}}, UI {{uiVersion}}</div>
</Screen>
</template>

<style scoped lang="scss">
.switch {
  display: flex;
  label {
    flex: 1;
  }
}
.footer {
  margin-top: auto;
  font-size: var(--small);
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
  computed: {
    uiVersion() {
      return process.env.VUE_APP_VERSION
    },
    info() {
      return this.$store.state.system.info
    }
  },
  methods: {
    toggleDark() {
      this.$store.dispatch('settings/toggleDark')
    }
  }
}
</script>
