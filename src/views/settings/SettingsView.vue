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
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import Plus         from '@/components/Plus.vue'
import Modal        from '@/components/Modal.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

export default {
  components: {
    Screen,
    NavList,
    Plus,
    Modal,
    ToggleSwitch
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
