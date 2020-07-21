<template>
<Screen :back="{name: 'settings'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    Manage Keys
  </template>

  <NavList>
    <RouterLink :to="{name: 'keys-backup'}" v-shortkey="['ctrl', 'b']" @shortkey.native="navigate({name: 'keys-backup'})" >Backup identity</RouterLink>
    <RouterLink :to="{name: 'keys-restore'}" v-shortkey="['ctrl', 'r']" @shortkey.native="navigate({name: 'keys-restore'})" >Restore identity</RouterLink>
  </NavList>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'

export default {
  components: {
    Screen,
    NavList
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
