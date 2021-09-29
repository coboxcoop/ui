<template>
<Screen :back="{name: 'spaces'}" v-if="space" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    <div class="header">
      <div>
        Folder > {{space.name}}
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <NavList>
    <div class="switch">
      <label>Mount Folder</label>
      <ToggleSwitch @input="toggleMount" :value="mounted" v-shortkey="['ctrl', 'm']" @shortkey.native="toggleMount" />
    </div>
    <a href="#" @click.prevent="openMount" v-shortkey="['ctrl', 'o']" @shortkey="openMount">Open folder</a>
    <RouterLink :to="{name: 'space-health'}" v-shortkey="['ctrl', 'h']" @shortkey.native="navigate({name: 'space-health'})">Health</RouterLink>
    <RouterLink :to="{name: 'space-delete', params: {address: $route.params.address}}" v-shortkey="['ctrl', 'd']" @shortkey.native="navigate({name: 'space-delete', params: {address: $route.params.address}})">Delete</RouterLink>
  </NavList>
  
  <div style="height: 1.6rem" />

  <h2>{{peerCountString}}</h2>

  <NavList>
    <div v-for="peer in peers" :key="peer.publicKey">
      <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
      <WifiIcon v-if="peer.data.online" />
      <br />
      <div v-if="!peer.data.online && peer.data.lastSeenAt" class="last-seen"> Last seen at: {{new Date(peer.data.lastSeenAt).toString().slice(0, 21)}} 
      </div>
    </div>
    <RouterLink :to="{name: 'space-invite'}" v-shortkey="['ctrl', 'i']" @shortkey.native="navigate({name: 'space-invite'})">Invite friend</RouterLink>
  </NavList>

  <br />

</Screen>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.space-icon {
  color: green;
  margin-right: 0.3rem;
}
.switch {
  display: flex;
  align-items: center;
  label {
    flex: 1;
    img {
      margin-bottom: -0.1em;
      cursor: pointer;
      html.dark & {
        filter: invert(1);
      }
    }
  }
}
.last-seen {
  font-size: 1.6rem;
  text-align: right;
}
.wifi {
  position: absolute;
  right: 0;
}
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import UserIcon     from '@/components/UserIcon.vue'
import CopyKey      from '@/components/CopyKey.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import WifiIcon     from '@/components/WifiIcon.vue'
import {api}        from '@/api'

export default {
  components: {
    UserIcon,
    Screen,
    NavList,
    CopyKey,
    ToggleSwitch,
    WifiIcon
  },
  data: () => ({
    publicKey: '',
    inviteCode: ''
  }),
  computed: {
    peerCountString() {
      const count = this.$store.getters['spaces/peerCount'](this.space.address)

      return `${count} friend${count != 1 ? 's' : ''}`
    },
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    stat() {
      return this.$store.getters['spaces/stat'](this.space.address)
    },
    peers() {
      let peers = this.$store.getters['spaces/peers'](this.space.address)
      if (peers) {
        for (let peer of peers) {
          let peerInfo = this.$store.getters['peers/byPublicKey'](peer.data.author)
          peer.data.lastSeenAt = peerInfo.lastSeenAt
          peer.data.online = peerInfo.online
        }
      }
      // TODO: some peers in the peers array do not exist in our peer's lastSeen state object (see peer's store) - in this case their lastSeenAt & online properties will have a value of 'undefined' => why would they not exist?
      return peers
    },
    info() {
      return this.$store.state.system.info
    },
    mounted() {
      return this.$store.getters['spaces/mounted'](this.space.address)
    }
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    async toggleMount() {
      if(this.mounted) {
        await this.unmountFolder()
      } else {
        await this.mountFolder()
      }
    },
    async mountFolder() {
      try {
        await this.$store.dispatch('spaces/mount', this.space)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async unmountFolder() {
      try {
        await this.$store.dispatch('spaces/unmount', this.space)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async onSubmitInvite() {
      const {space: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('spaces/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
    },
    openMount() {
      const {space: {address}} = this
      api.get(`spaces/${address}/drive`)
    }
  }
}
</script>
