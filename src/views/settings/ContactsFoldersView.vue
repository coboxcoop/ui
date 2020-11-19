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
        <UserIcon :address="space.address" /> {{space.name}}
      </RouterLink>
      <CopyKey :value="space.address" />
      <h2>{{peerCountString(space.address)}}</h2>
      <NavList>
        <div v-for="peer in getPeers(space.address)" :key="peer.publicKey">
          <RouterLink
            :to="{name: 'contacts-friend', params: {address: peer.data.author, name: peer.data.content.name}}">
            <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
          </RouterLink>
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
//  * move logic from views -> store && use lodash for filter method
//  * fix linting to split RouterLink etc in all views
//  * peer name not persisting on page refresh (loses RouterLink params)
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
      return this.$store.getters['spaces/spaces']
    },
  },
  methods: {
    peerCountString(address) {
      const count = this.$store.getters['spaces/peerCount'](address)

      return `${count} friend${count != 1 ? 's' : ''}`
    },
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
