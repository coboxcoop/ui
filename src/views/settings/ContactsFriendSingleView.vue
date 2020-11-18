<template>
<Screen :back="{name: 'contacts-friends'}">
  <template v-slot:header>
    Contacts > By Friend > Folders
  </template>
  <NavList>
    <div>
      <UserIcon :address="$route.params.address"/> {{$route.params.name}}
      <CopyKey :value="$route.params.address" />
      <br />
      <div v-for="(peer, author, space) in peerSpaces(allPeers)" :key="author">
        <small>{{foldersCommonCountString(peer.spaces)}}</small>
        <div v-for="sharedSpace in peer.spaces" >
            <RouterLink
              :to="{name: 'space', params: {address: sharedSpace.address}}"
              v-shortkey="['ctrl', 'enter' ]"
              @shortkey.native="navigate({name: 'space', params: {address: sharedSpace.address}})">
              <UserIcon :address="sharedSpace.address" /> {{sharedSpace.name}}
            </RouterLink>
            <CopyKey :value="sharedSpace.address" />
        </div>
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
    }
  },
  methods: {
    foldersCommonCountString(spaces) {
      const count = spaces.length 

      return `${count} folder${count != 1 ? 's' : ''} in common`
    },
    peerSpaces(allPeers) {
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
              .filter( key => predicate(obj[key]) )
              .reduce( (res,key) =>  (res[key] = obj[key], res), {});

      let filtered = Object.filter(allPeers, peer => peer.data.author === this.$route.params.address);

      return filtered
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
