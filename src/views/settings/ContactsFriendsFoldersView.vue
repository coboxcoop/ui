<template>
<Screen :back="{name: 'contacts-friends'}">
  <template v-slot:header>
    Contacts > By Friend > Folders
  </template>
  <NavList>
    <div>
      <UserIcon :address="$route.params.address"/> {{$route.params.name}}
      <CopyKey :value="$route.params.address" />
      <small>Folders in common</small>
      <div v-for="(peer, author) in allPeers" :key="author">
        <div v-for="space in peerSpaces(allPeers)" :key="author">
            <RouterLink 
              :to="{name: 'space', params: {address: space.address}}" 
              v-shortkey="['ctrl', 'enter' ]" 
              @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
              <pre>{{Object.entries(space.spaces)}}</pre>
            </RouterLink>
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
    peerSpaces(allPeers) {
      // FIXME:
      // filter allPeers to display folders of an individual peer
      // https://stackoverflow.com/questions/5072136/javascript-filter-for-objects/37616104#37616104
      console.log(allPeers)
      Object.filter = (obj, predicate) =>
        Object.keys(obj)
              .filter( key => predicate(obj[key]) )
              .reduce( (res,key) =>  (res[key] = obj[key], res), {});

      let filtered = Object.filter(allPeers, peer => peer.data.author === this.$route.params.address);

      console.warn( typeof filtered)
      console.warn(filtered)
      // function uniq (array) {
      //   if (!Array.isArray(array)) array = [array]
      //   return Array.from(new Set(array))
      // }
      //
      // return uniq(filtered)
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
