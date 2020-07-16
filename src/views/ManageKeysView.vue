<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Manage Keys
  </template>

  <NavList>
  <RouterLink :to="{name: 'settings-keys-backup'}" v-shortkey="['b']" @shortkey.native="navigate({name: 'settings-keys-backup'})" >Backup identity</RouterLink>
    <a href="#" class="disabled-feature">Restore</a>
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
      this.$router.push(to)
    }
  }
}
</script>
