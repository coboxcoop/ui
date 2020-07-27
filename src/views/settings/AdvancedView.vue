<template>
<Screen :back="{name: 'settings'}">
  <Modal :show="showBetaInfo" @close="showBetaInfo = false">
    <p>By signing up as a beta tester for sprout release you are agreeing to submit redacted logs to a third-party cloud error monitoring & reporting tool CoBox uses called <a href="https://www.bugsnag.com/" target="_blank">bugsnag</a>. To learn more you can visit our <a href="https://gitlab.com/coboxcoop/readme/-/wikis/Testing" target="_blank">wiki.</a> Providing an email is optional, but very helpful.</p>
  </Modal>
  <template v-slot:header>
    Advanced
  </template>

  <NavList>
    <div class="switch">
      <label>Beta tester <img @click="showBetaInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showBetaInfo = true)" src="@/assets/images/icons/info.svg" /></label>
      <ToggleSwitch @input="toggleBetaTester" :value="$store.state.settings.betaTester" v-shortkey="['ctrl', 'b']" @shortkey.native="toggleBetaTester"/>
    </div>
    <input type="email" placeholder="Email address" v-model="email" v-if="$store.state.settings.betaTester" />
    <div class="switch" v-if="$store.state.settings.betaTester">
      <label>Bug report icon</label>
      <ToggleSwitch @input="toggleBugReportIcon" :value="$store.state.settings.bugReportIcon" />
    </div>
    <div class="switch">
      <label>Error Messages</label>
      <ToggleSwitch @input="toggleErrorMessages" :value="$store.state.settings.errorMessages" v-shortkey="['ctrl', 'e']" @shortkey.native="toggleErrorMessages"/>
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
    showBetaInfo: false,
  }),
  computed: {
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
    toggleErrorMessages() {
      this.$store.dispatch('settings/toggleErrorMessages')
    },
    toggleBetaTester() {
      this.$store.dispatch('settings/toggleBetaTester')
    },
    toggleBugReportIcon() {
      this.$store.dispatch('settings/toggleBugReportIcon')
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
