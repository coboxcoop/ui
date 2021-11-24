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

  <div class="address">
    <small>Folder address</small>
    <CopyKey :value="space.address" />
  </div>

  <NavTable>
    <template v-slot:left>
      <a v-if="mounted" class="nav-item" href="#" @click.prevent="openMount" v-shortkey="['ctrl', 'o']" @shortkey="openMount">
        <label>Open</label>
        <FolderIcon />
      </a>
      <div v-else class="nav-item">
        <label style="text-decoration: line-through">Open</label>
        <FolderIcon />
      </div>
      <RouterLink
        class="nav-item"
        :to="{name: 'space-health'}"
        v-shortkey="['ctrl', 'h']"
        @shortkey.native="navigate({name: 'space-health'})">
        <label>Health</label>
        <img src="@/assets/images/icons/health-heart-small.png" alt="">
      </RouterLink>
      <RouterLink
        class="nav-item"
        :to="{name: 'space-invite'}"
        v-shortkey="['ctrl', 'i']"
        @shortkey.native="navigate({name: 'space-invite'})">
        <label>Invite</label>
        <InviteIcon />
      </RouterLink>
    </template>
    <template v-slot:right>
      <div class="nav-item switch">
        <label>Mount</label>
        <ToggleSwitch @input="toggleMount" :value="mounted" v-shortkey="['ctrl', 'm']" @shortkey.native="toggleMount" />
      </div>
      <RouterLink
        class="nav-item"
        :to="{name: 'space-delete', params: {address: $route.params.address}}"
        v-shortkey="['ctrl', 'd']" 
        @shortkey.native="navigate({name: 'space-delete', params: {address: $route.params.address}})">
        <label>Delete</label>
        <DeleteIcon />
      </RouterLink>
      <RouterLink
        class="nav-item"
        :to="{name: 'space-settings'}"
        v-shortkey="['ctrl', 's']"
        @shortkey.native="navigate({name: 'space-settings'})">
        <label>Settings</label>
        <SettingsIcon />
      </RouterLink>
    </template>
  </NavTable>

  <div style="height: 1.6rem" />

  <h2>{{peerCountString}}</h2>

  <NavList>
    <div v-for="peer in peers" :key="peer.author">
      <UserIcon :address="peer.author" /> {{peer.content.name}}
      <WifiIcon v-if="peer.online" />
      <br />
      <div v-if="!peer.online && peer.lastSeenAt" class="last-seen">{{ lastSeenString(peer) }}</div>
    </div>
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
.nav-item {
  display: flex;
  text-decoration: none;
  padding: 0.5rem 1rem 0.5rem 0;
  justify-content: space-between;
  cursor: pointer;
  label {
    cursor: pointer;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--fg);
  }
  svg {
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }
  img {
    max-height: 24px;
    position: relative;
    top: 50%;
    transform: translate(0, -50%);
  }
}
.last-seen {
  display: block;
  font-size: 1.6rem;
  margin-bottom: 0em;
  padding: 0.2rem 0 0 0;
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
import NavTable     from '@/components/NavTable.vue'
import UserIcon     from '@/components/UserIcon.vue'
import CopyKey      from '@/components/CopyKey.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import WifiIcon     from '@/components/WifiIcon.vue'
import FolderIcon   from '@/components/FolderIcon.vue'
import DeleteIcon   from '@/components/DeleteIcon.vue'
import InviteIcon   from '@/components/InviteIcon.vue'
import SettingsIcon from '@/components/SettingsIcon.vue'
import {api}        from '@/api'

export default {
  components: {
    UserIcon,
    Screen,
    NavList,
    NavTable,
    CopyKey,
    ToggleSwitch,
    WifiIcon,
    FolderIcon,
    DeleteIcon,
    InviteIcon,
    SettingsIcon
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
      const peers = []
      const me = this.$store.getters['profile/myPublicKey']
      // fetch all space members (peer/about messages in space hypercores)
      const spacePeers = this.$store.getters['spaces/peers'](this.space.address) || {}
      for (const peerId of Object.keys(spacePeers)) {
        if (peerId === me) continue
        const peer = spacePeers[peerId]
        // fetch the global peer data, containing network info, for this space member
        const peerData = this.$store.getters['peers/byPublicKey'](peerId)
        peers.push({ ...peer, ...peerData })
      }
      return peers
    },
    info() {
      return this.$store.state.system.info
    },
    mounted() {
      return this.$store.getters['spaces/mounted'](this.space.address)
    },
    lastSeenString(peer) {
      return peer => {
        if (peer.lastSeenAt) {
          const date = new Date(peer.lastSeenAt)
          const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
          const minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
          const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
          const month = date.getMonth()+1
          const monthzero = month >= 10 ? month : `0${month}`
          const year = date.getFullYear().toString().slice(2, 4)
          return `last seen at ${hour}:${minute} on ${day}/${month}/${year}`
        }
        else { return `never seen` }
      }
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
