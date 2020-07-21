<template>
<Screen :back="{name: 'spaces'}">

  <template v-slot:header>
    Settings
  </template>

  <NavList>
    <RouterLink :to="{name: 'advanced'}" v-shortkey="['ctrl', 'alt', 'a']" @shortkey.native="navigate({name: 'advanced'})">
      <div class="icon">
        <img src="@/assets/images/icons/settings.svg" />
      </div>
      Advanced
    </RouterLink>
    <RouterLink :to="{name: 'appearance'}" v-shortkey="['ctrl', 'a']" @shortkey.native="navigate({name: 'appearance'})">
      <div class="icon">
        <img src="@/assets/images/icons/settings.svg" />
      </div>
      Appearance
    </RouterLink>
    <RouterLink :to="{name: 'manage-keys'}" v-shortkey="['ctrl', 'k']" @shortkey.native="navigate({name: 'manage-keys'})">
      <div class="icon">
        <img src="@/assets/images/icons/settings.svg" />
      </div>
      Manage Keys
    </RouterLink>
    <RouterLink :to="{name: 'seeders'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'seeders'})">
      <div class="icon">
        <img src="@/assets/images/icons/settings.svg" />
      </div>
      Operate Seeders
    </RouterLink>
    <RouterLink :to="{name: 'options'}" v-shortkey="['ctrl', 'o']" @shortkey.native="navigate({name: 'options'})">
      <div class="icon">
        <img src="@/assets/images/icons/settings.svg" />
      </div>
      Options
    </RouterLink>
  </NavList>
  <div class="footer">CoBox {{info.version}}, UI {{uiVersion}}</div>
</Screen>
</template>

<style scoped lang="scss">
.footer {
  margin-top: auto;
  font-size: var(--small);
}
.nav-list a {
  display: flex;
  .icon {
    width: 1em;
    position: relative;
    margin-right: 0.4rem;
    img {
      width: 85%;
      height: auto;
      position: absolute;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import Plus         from '@/components/Plus.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'

export default {
  components: {
    Screen,
    NavList,
    Plus,
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
