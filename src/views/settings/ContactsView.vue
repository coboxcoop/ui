<template>
<Screen :back="{name: 'settings'}">
  <template v-slot:header>
    Contacts
  </template>
  <NavList>
    <div>By Folder:</div>
    <!--  FIXME:
          1. fix router links, should only be clickable for folder name, not friends
          2. general fixes required for CopyKey styling in this context-->
    <RouterLink v-for="space in spaces" :key="space.address" class="space" :to="{name: 'space', params: {address: space.address}}" v-shortkey="['ctrl', 'enter' ]" @shortkey.native="navigate({name: 'space', params: {address: space.address}})">
      <div>{{space.name}}</div>
      <div>{{space.address}}</div>
      <NavList>
        <div v-for="peer in getPeers(space.address)" :key="peer.publicKey">
          <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
          <CopyKey :value="peer.data.author" />
        </div>
      </NavList>
      <br />
    </RouterLink>
    <div>By Friend:</div>
      <div>
        <!--  FIXME:
              1. Show list of friends (like in single folder view)
              2. List folders shared with this friend (with links to folders)-->
        <div v-for="space in spaces" :key="space.address">
          <div v-for="peer in getPeers(space.address)" :key="peer.publicKey">
            {{uniquePeers(peer.data.author)}}
          </div>
        </div>
        {{peers}}
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
  data: function() {
    return {
      peers: []
    }
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    },
    uniquePeers: function() {
      return function (peer) {
        if(this.peers.includes(peer)) {
        } else {
          this.peers.push(peer)
        }
      }
    }
  },
  methods: {
    getSpace(address) {
      return this.$store.getters['spaces/single'](address)
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
