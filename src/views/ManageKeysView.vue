<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Manage Keys
  </template>

  <NavList>
  <RouterLink :to="{name: 'settings-keys-backup'}" v-shortkey="['b']" @shortkey.native="navigate({name: 'settings-keys-backup'})" >Backup identity</RouterLink>
    <a href="#" class="disabled-feature">Restore</a>
  </NavList>
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
    },
    navigate(to) {
      this.$router.push(to)
    }
  }
}
</script>
