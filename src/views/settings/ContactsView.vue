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
        <div v-for="space in spaces" :key="space.address">
          <div v-for="peer in getPeers(space.address)" :key="peer.publicKey">
            {{uniquePeers(peer.data, space)}}
          </div>
        </div>
        <li v-for="peer in contacts.peers">
        <!--  FIXME:
              2. List folders shared with this friend (with links to folders)-->
          {{ peer.content.name }}
          {{ peer.author }}
        </li>
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
      // FIXME:
      // contacts aggregates information with peer as primary key
      // gathers space info under peer 
      contacts: {
        peers: {
          author: '',
          name: '',
          spaces : {
            name: '',
            address: ''
          }
        }
      }
    }
  },
  computed: {
    spaces() {
      return this.$store.state.spaces.data
    },
    uniquePeers() {
      // FIXME:
      // gather which spaces (name, address) a peer belongs to
      // each peer should have a single entry, with many spaces 
      // method should check if peer exists. if yes, then check if entry for address.
      // if peer doesn't yet exist then create new entry
      // https://stackoverflow.com/questions/30578254/does-vue-js-have-a-built-in-way-to-add-a-copy-of-a-persistent-object-to-a-repeat
      return function (peer, space) {
        if(peer.author in this.contacts) {
        } else {
          this.contacts = {
            ...this.contacts,
            contacts[peers][author] : 'somethingi'
            console.log(space.name)
            console.log(space.address)
            console.log(peer.content.name)
            console.log(peer.author)
          }
        }
      }
    }
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
