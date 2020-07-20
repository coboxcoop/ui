<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Advanced
  </template>

  <NavList>
    <div class="switch">
      <label>Beta tester <img @click="showBetaInfo = true" src="@/assets/images/icons/info.svg" /></label>
      <ToggleSwitch @input="toggleBetaTester" :value="$store.state.settings.betaTester" />
    </div>
    <input type="email" placeholder="Email address" v-model="email" v-if="$store.state.settings.betaTester" />
    <div class="switch">
      <label>Error Messages</label>
      <button @click="toggleErrorMessages">
        {{$store.state.settings.errorMessages ? 'On' : 'Off'}}
      </button>
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

export default {
  components: {
    Screen,
    NavList,
    ToggleSwitch
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
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
