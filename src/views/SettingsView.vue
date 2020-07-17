<template>
<Screen :back="{name: 'spaces'}">
  <Modal :show="showBetaInfo" @close="showBetaInfo = false">
    <p>We write some details about beta testing here...</p>
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
      <button @click="toggleDark">
        {{$store.state.settings.dark ? 'On' : 'Off'}}
      </button>
    </div>
    <div class="switch">
      <label>Keyboard Shortcuts <img @click="showShortKeyInfo = true" src="@/assets/images/icons/info.svg" /></label>
      <button @click="toggleShortkey">
        {{$store.state.settings.shortkey ? 'On' : 'Off'}}
      </button>
    </div>
    <div class="switch">
      <label>Beta tester <img @click="showBetaInfo = true" src="@/assets/images/icons/info.svg" /></label>
      <button @click="toggleBetaTester">
        {{$store.state.settings.betaTester ? 'On' : 'Off'}}
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

export default {
  components: {
    Screen,
    NavList,
    Plus,
    Modal
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
