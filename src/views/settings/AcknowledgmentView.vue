<template>
<Screen :back="{name: 'settings'}">

  <template v-slot:header>
    Acknowledgment
  </template>

  <NavList>
    <RouterLink :to="{name: 'acknowledgment-of-country'}" v-shortkey="['ctrl', 'c']" @shortkey.native="navigate({name: 'acknowledgment-of-country'})">
      Of Country
    </RouterLink>
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

export default {
  components: {
    Screen,
    NavList,
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
