<template>
<Screen :back="{name: 'settings'}">
  <Modal :show="showShortKeyInfo" @close="showShortKeyInfo = false">
    <a href="https://gitlab.com/coboxcoop/readme/-/wikis/keyboard-shortcuts" target="_blank">Full list of shortcuts.</a>
  </Modal>

  <template v-slot:header>
    Accessibility
  </template>

  <NavList>
  <small>CoBox App UI is currently between A and AA standard. To find out more please visit the <a href="https://gitlab.com/coboxcoop/readme/-/wikis/Accessibility" target="_blank">accessibility section</a> of the wiki.</small>
    <div class="switch">
      <label>Shortcuts <img @click="showShortKeyInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showShortKeyInfo = true)" src="@/assets/images/icons/info.svg" /></label>
      <ToggleSwitch @input="toggleShortkey" :value="$store.state.settings.shortkey" v-shortkey="['ctrl', 's']" @shortkey.native="toggleShortkey"/>
    </div>
    <div class="switch">
      <label>Dark Theme</label>
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
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import Modal        from '@/components/Modal.vue'

export default {
  components: {
    Screen,
    NavList,
    ToggleSwitch,
    Modal
  },
  data: () => ({
    showShortKeyInfo: false
  }),
  methods: {
    toggleDark() {
      this.$store.dispatch('settings/toggleDark')
    },
    toggleShortkey() {
      this.$store.dispatch('settings/toggleShortkey')
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
