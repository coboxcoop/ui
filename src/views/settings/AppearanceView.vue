<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Appearance
  </template>

  <NavList>
    <div class="switch">
      <label>Dark UI</label>
      <ToggleSwitch @input="toggleDark" :value="$store.state.settings.dark" v-shortkey="['ctrl', 'd']" @shortkey.native="toggleDark" />
    </div>
  </NavList>
</Screen>
</template>

<style scoped lang="scss">
.switch {
  display: flex;
  align-items: center;
  label {
    flex: 1;
    img {
      margin-bottom: -0.1em;
      cursor: pointer;
      html.dark & {
        filter: invert(1);
      }
    }
  }
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

export default {
  components: {
    Screen,
    NavList,
    ToggleSwitch
  },
  methods: {
    toggleDark() {
      this.$store.dispatch('settings/toggleDark')
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
