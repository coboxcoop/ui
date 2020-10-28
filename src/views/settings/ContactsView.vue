<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Contacts
  </template>
  <NavList>
    <RouterLink v-for="space in spaces" :key="space.address" class="space" :to="{name: 'space', params: {address: space.address}}" v-shortkey="['ctrl', 'enter' ]" @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
      <div>{{space.name}}</div>
      <div>Contacts list here.</div>
    </RouterLink>
  </NavList>

  <!-- <h2>{{peerCountString}}</h2> -->

  <!-- <NavList> -->
  <!--   <div v&#45;for="peer in peers" :key="peer.publicKey"> -->
  <!--     <UserIcon :address="peer.data.author" /> {{peer.data.content.name}} -->
  <!--     <CopyKey :value="peer.data.author" /> -->
  <!--   </div> -->
  <!-- </NavList> -->

  <br />
  
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
import UserIcon     from '@/components/UserIcon.vue'

export default {
  components: {
    Screen,
    NavList,
    UserIcon
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    }
    // peerCountString() {
    //   const count = this.$store.getters['spaces/peerCount'](this.space.address)
    //
    //   return `${count} friend${count != 1 ? 's' : ''}`
    // },
    // peers() {
    //   return this.$store.getters['spaces/peers'](this.space.address)
    // }
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
