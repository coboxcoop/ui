<template>
<Screen :back="{name: 'settings'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    Manage Keys
  </template>

  <NavList>
    <RouterLink :to="{name: 'secrets-export'}" v-shortkey="['ctrl', 'e']" @shortkey.native="navigate({name: 'secrets-export'})" >Export secret keys...</RouterLink>
    <RouterLink :to="{name: 'secrets-import'}" class="disabled-feature">Import secrets...</RouterLink>
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
