<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Seeders
    <RouterLink :to="{name: 'seeders-join'}" v-shortkey="['ctrl', 'space']" @shortkey.native="navigate({name: 'seeders-join'})">
      <Plus />
    </RouterLink>
  </template>
  <NavList>
    <RouterLink v-for="seeder in seeders" :key="seeder.address" class="seeder" :to="{name: 'seeder', params: {address: seeder.address}}">
    <Dot color="magenta" :address="seeder.address" /> {{seeder.name}}
    </RouterLink>
    <small style="margin-top: 0.8rem">If you would like to join as a backbone peer in the CoBox network, do get in touch! <a href="mailto:info@magmacollective.com">info@magmacollective.com</a></small>
  </NavList>
</Screen>
</template>

<script>
import Screen  from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Dot     from '@/components/Dot.vue'
import Plus    from '@/components/Plus.vue'

export default {
  components: {
    Dot,
    Screen,
    NavList,
    Plus
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  },
  computed: {
    seeders() {
      return this.$store.state.seeders.seeders
    }
  }
}
</script>
