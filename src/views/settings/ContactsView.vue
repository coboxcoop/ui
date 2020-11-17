<template>
<Screen :back="{name: 'settings'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    Contacts
  </template>

  <NavList>
    <RouterLink :to="{name: 'contacts-folders'}" v-shortkey="['ctrl', 'f']" @shortkey.native="navigate({name: 'contacts-folders'})" >By folder</RouterLink>
    <RouterLink :to="{name: 'contacts-friends'}" v-shortkey="['ctrl', 'alt', 'f']" @shortkey.native="navigate({name: 'contacts-friends'})" >By friends</RouterLink>
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
