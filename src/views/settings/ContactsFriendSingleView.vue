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
      <!-- <pre>{{allPeers}}</pre> -->
      <div v-for="(peer, author, space) in peerSpaces" :key="author">
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
      return this.$store.getters['spaces/allPeers']
    }
  },
  methods: {
    peerSpaces() {
      return this.$store.getters['spaces/peerSpaces'](this.$route.params.address)
    },
    foldersCommonCountString(spaces) {
      const count = spaces.length 

      return `${count} folder${count != 1 ? 's' : ''} in common`
    },
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
