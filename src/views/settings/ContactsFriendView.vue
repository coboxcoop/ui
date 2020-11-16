<template>
<Screen :back="{name: 'contacts'}">
  <template v-slot:header>
    Contacts > By Friend
  </template>
  <NavList>
    <div>
      <div v-for="(peer, author) in allPeers" :key="author">
        <UserIcon :address="peer.data.author"/> {{peer.data.content.name}}
        <CopyKey :value="peer.data.author" />
        <small> Folders in common</small>
        <pre v-for="space in peer.spaces" :key="space.address">
          <RouterLink :to="{name: 'space', params: {address: space.address}}" v-shortkey="['ctrl', 'enter' ]" @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
          <div>{{space.name}}</div>
          <div>{{space.address}}</div>
          </RouterLink>
        </pre>
      </div>
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
    allPeers() {
      let peers = {}

      // unique() would allow you to pass something in
      // have a look at API
      // function uniq (array) {
      // if (!Array.isArray(array)) array = [array]
      // return Array.from(new Set(array))
      // }
      // @cobox/repository/util.js
      this.spaces.forEach(space => {
        const spacePeers = this.getPeers(space.address)

        if(Array.isArray(spacePeers)) spacePeers.forEach(peer => {
          const address = peer.data.author
          let spacePeer = peers[address] || peer

          spacePeer.spaces = spacePeer.spaces || []
          if(!spacePeer.spaces.find(({address}) => space.address == address)) spacePeer.spaces.push(space)

          peers[address] = spacePeer
        })
      })

      return peers
    },
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
