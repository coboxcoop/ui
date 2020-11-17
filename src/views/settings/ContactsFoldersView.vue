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
        <div>{{space.address}}</div>
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
