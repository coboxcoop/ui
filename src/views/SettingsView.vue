<template>
<Screen :back="{name: 'home'}">
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
  methods: {
    toggleDark() {
      this.$store.dispatch('settings/toggleDark')
    }
  }
}
</script>
