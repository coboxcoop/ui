<template>
<Screen :back="{name: 'spaces'}">
  <Modal :show="showBetaInfo" @close="showBetaInfo = false">
  <p>By signing up as a beta tester for sprout release you are agreeing to submit redacted logs to a third-party cloud error monitoring & reporting tool CoBox uses called <a href="https://www.bugsnag.com/" target="_blank">bugsnag</a>. To learn more you can visit our <a href="https://gitlab.com/coboxcoop/readme/-/wikis/Testing" target="_blank">wiki. Providing an email is optional, but very helpful.</a></p>
  </Modal>
  <Modal :show="showShortKeyInfo" @close="showShortKeyInfo = false">
  <a href="https://gitlab.com/coboxcoop/ui/-/merge_requests/9" target="_blank">Shortcuts</a>
  </Modal>

  <template v-slot:header>
    Settings
  </template>

  <NavList>
    <div class="switch">
      <label>Dark UI</label>
      <ToggleSwitch @input="toggleDark" :value="$store.state.settings.dark" />
    </div>
    <div class="switch">
      <label>Shortcuts <img @click="showShortKeyInfo = true" src="@/assets/images/icons/info.svg" /></label>

      <ToggleSwitch @input="toggleShortkey" :value="$store.state.settings.shortkey" />
    </div>
    <div class="switch">
      <label>Beta tester <img @click="showBetaInfo = true" src="@/assets/images/icons/info.svg" /></label>
      <ToggleSwitch @input="toggleBetaTester" :value="$store.state.settings.betaTester" />
    </div>
    <div class="switch">
      <label>Error Messages</label>
      <button @click="toggleErrorMessages">
        {{$store.state.settings.errorMessages ? 'On' : 'Off'}}
      </button>
    </div>
    <input type="email" placeholder="Email address" v-model="email" v-if="$store.state.settings.betaTester" />
    <RouterLink :to="{name: 'settings-admin-seeders'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'settings-admin-seeders'})">
      Operate Seeders
    </RouterLink>
    <RouterLink :to="{name: 'settings-manage-keys'}" v-shortkey="['ctrl', 'k']" @shortkey.native="navigate({name: 'settings-manage-keys'})">
      Manage Keys
    </RouterLink>
  </NavList>
  <div class="footer">CoBox {{info.version}}, UI {{uiVersion}}</div>
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
.footer {
  margin-top: auto;
  font-size: var(--small);
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Plus from '@/components/Plus.vue'
import Modal from '@/components/Modal.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

export default {
  components: {
    Screen,
    NavList,
    Plus,
    Modal,
    ToggleSwitch
  },
  data: () => ({
    showBetaInfo: false,
    showShortKeyInfo: false
  }),
  computed: {
    uiVersion() {
      return process.env.VUE_APP_VERSION
    },
    info() {
      return this.$store.state.system.info
    },
    email: {
      get() {
        return this.$store.state.settings.email
      },
      set(value) {
        this.$store.dispatch('settings/update', {email: value})
      }
    }
  },
  methods: {
    toggleDark() {
      this.$store.dispatch('settings/toggleDark')
    },
    toggleShortkey() {
      this.$store.dispatch('settings/toggleShortkey')
    },
    toggleErrorMessages() {
      this.$store.dispatch('settings/toggleErrorMessages')
    },
    toggleBetaTester() {
      this.$store.dispatch('settings/toggleBetaTester')
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
