<template>
<Screen :back="{name: 'contacts'}">
  <template v-slot:header>
    Contacts > By Folder
  </template>
  <NavList>
    <div 
      v-for="space in spaces" 
      :key="space.address" 
      class="space" >
      <RouterLink 
        :to="{name: 'space', params: {address: space.address}}" 
        v-shortkey="['ctrl', 'enter' ]" 
        @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
        <div>{{space.name}}</div>
        <div class="address">{{space.address}}</div>
      </RouterLink>
      <NavList>
        <div v-for="peer in getPeers(space.address)" :key="peer.publicKey">
          <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
          <CopyKey :value="peer.data.author" />
        </div>
      </NavList>
      <br />
    </div>
  </NavList>
</Screen>
</template>

<style lang="scss" scoped>
// FIXME:
//      * fix styling for folder addresses
//      * rm copy key from folders peers 
//      * add link to peer profile page where peers mentioned
//      * fix route for peer profile page (remove folders)
//      * fix linting to split RouterLink etc in all views
//      * peer name not persisting on page refresh (loses RouterLink params)
//      * move logic from views -> store && use lodash for filter method
.address {
  position: relative;
  outline: none;
  // border-bottom: 1px solid var(--fg);
  width: 100%;
  padding: 0.6rem 0;
  background: linear-gradient(to right, var(--fg-0) 0, var(--fg-1) 1.2em);
  padding-right: 1em;
  padding-left: 1.5em;
  right: 0;
}
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import UserIcon     from '@/components/UserIcon.vue'
import CopyKey      from '@/components/CopyKey.vue'

export default {
  components: {
    Screen,
    NavList,
    UserIcon,
    CopyKey
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    },
  },
  methods: {
    getPeers(address) {
      return this.$store.getters['spaces/peers'](address)
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
