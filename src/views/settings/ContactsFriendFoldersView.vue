<template>
<Screen :back="{name: 'contacts'}">
  <template v-slot:header>
    Contacts > By Friend > Folders
  </template>
  <NavList>
    <div :peer="peer">
      <!-- <div v&#45;for="(peer, author) in allPeers" :key="author"> -->
        peer: {{ peer }}
        <!-- <UserIcon :address="author.peer.data.author"/> {{author.peer.data.content.name}} -->
        <!-- <CopyKey :value="author.peer.data.author" /> -->
        <!-- <pre v&#45;for="space in peer.spaces" :key="space.address"> -->
        <!--   <RouterLink :to="{name: 'space', params: {address: space.address}}" v&#45;shortkey="['ctrl', 'enter' ]" @shortkey.native="navigate({name: 'space', params: {address: space.address}})"> -->
        <!--   <div>{{space.name}}</div> -->
        <!--   <div>{{space.address}}</div> -->
        <!--   </RouterLink> -->
        <!-- </pre> -->
      <!-- </div> -->
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
  props: {
    peer: Object
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
