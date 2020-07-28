<template>
<div class="container">

  <Modal :show="showBetaInfo" @close="showBetaInfo = false">
    <p>By signing up as a beta tester for sprout release you are agreeing to submit redacted logs to a third-party cloud error monitoring & reporting tool CoBox uses called <a href="https://www.bugsnag.com/" target="_blank">bugsnag</a>. To learn more you can visit our <a href="https://gitlab.com/coboxcoop/readme/-/wikis/Testing" target="_blank">wiki.</a> Providing an email is optional, but very helpful.</p>
  </Modal>

  <div class="header">
    <div class="left">
        <img src="@/assets/images/icons/CoBox-icon.png" class="cloud" />
        <p>Welcome to CoBox.</p>
      </RouterLink>
    </div>
  <p>How do you want to be known to your friends?</p>
  <form @submit.prevent="onSubmitName">
    <input v-model="name" class="has-ok-button" type="text" placeholder="My name" />
    <button type="submit">Ok</button>
  </form>
  <small style="margin-top: 0.6rem;">This can be changed at any time</small>

  <div style="height: 2.4rem" />

  <small>This is alpha software released for the purpose of testing. Please opt-in to help submit error logs.</small>

  <div style="height: 2.4rem" />

  <div class="switch">
    <label>Beta tester <img @click="showBetaInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showBetaInfo = true)" src="@/assets/images/icons/info.svg" /></label>
    <ToggleSwitch @input="toggleBetaTester" :value="$store.state.settings.betaTester" />
  </div>
  <input type="email" placeholder="Email address" v-model="email" v-if="$store.state.settings.betaTester" />

  <div class="bottom">
    <button @click.prevent class="disabled-feature">Import identity</button>
    </div>
  </div>
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.6rem;
  height: 3.6rem;
  .logo {
    display: flex;
    .cloud {
      height: 0.8em;
      width: auto;
      margin-top: 0.3rem;
      html.dark & {
        filter: invert(1);
      }
    }
    p {
      margin-left: 0.8rem;
      margin-top: -0.25rem;
    }
  }
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
}
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
.bottom {
  margin-top: auto;
}
</style>

<script>
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import Modal        from '@/components/Modal.vue'

export default {
  components: {
    ToggleSwitch,
    Modal
  },
  data: () => ({
    showBetaInfo: false,
    name: ''
  }),
  methods: {
    async onSubmitName() {
      try {
        this.name = this.name.trim()
        await this.$store.dispatch('profile/updateName', this.name)
        await this.$store.dispatch('spaces/create', `Home folder`)
        this.name = ''
        if(this.$route.name !== 'spaces') this.$router.replace({name: 'spaces'})
        await this.$store.dispatch('fetchAllData')
        await this.$store.dispatch('initData')
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
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
