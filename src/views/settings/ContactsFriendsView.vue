<template>
<Screen :back="{name: 'contacts'}">
  <template v-slot:header>
    Contacts > By Friend
  </template>
  <NavList>
    <div>
      <div
        v-for="(peer, author) in allPeers" 
        :key="author">
        <RouterLink
          :to="{name: 'contacts-friend', params: {address: peer.data.author, name: peer.data.content.name}}">
          <UserIcon :address="peer.data.author"/> {{peer.data.content.name}}
        </RouterLink>
        <CopyKey type="text" :value="peer.data.author" />
        <RouterLink
          :to="{name: 'contacts-friend', params: {address: peer.data.author, name: peer.data.content.name}}">
        <small>{{foldersCommonCountString(peer.spaces)}}</small>
        </RouterLink>
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
