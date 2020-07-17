<template>
<Screen :back="{name: 'spaces'}" v-if="space" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    <div class="header">
      <div>
        <SpaceIcon :address="space.address" /> {{space.name}}
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <div style="height: 1.2rem" />

  <small>Mount point</small>
  <CopyKey :value="info.mount" action="Open" @action="openMount" />

  <small>Address</small>
  <CopyKey :value="space.address" />

  <h2>{{peerCountString}}</h2>

  <NavList>
    <div v-for="peer in peers" :key="peer.publicKey">
      <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
    </div>
  </NavList>

  <br />

  <div v-if="inviteCode">
    <p>Please send the following invite code to the new collaborator.</p>
    <CopyKey :value="inviteCode" />
  </div>
  <div v-else>
    <p>To invite someone to join this Space, please provide their public key.</p>

    <form @submit.prevent="onSubmitInvite">
      <input class="has-ok-button" type="text" placeholder="Public key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
  <NavList>
    <div class="switch">
      <label>Sync</label>
      <button @click="toggleSync">
        {{connected ? 'On' : 'Off'}}
      </button>
    </div>
  </NavList>
</Screen>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.space-icon {
  margin-right: 0.3rem;
}
.switch {
  display: flex;
  justify-content: space-between;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import SpaceIcon from '@/components/SpaceIcon.vue'
import UserIcon from '@/components/UserIcon.vue'
import Plus from '@/components/Plus.vue'
import CopyKey from '@/components/CopyKey.vue'
import {api} from '@/api'

export default {
  components: {
    SpaceIcon,
    UserIcon,
    Screen,
    NavList,
    Plus,
    CopyKey
  },
  data: () => ({
    publicKey: '',
    inviteCode: ''
  }),
  computed: {
    peerCountString() {
      const count = this.$store.getters['spaces/peerCount'](this.space.address)

      return `${count} peer${count != 1 ? 's' : ''}`
    },
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    connected() {
      return this.$store.getters['spaces/connected'](this.space.address)
    },
    stat() {
      return this.$store.getters['spaces/stat'](this.space.address)
    },
    peers() {
      return this.$store.getters['spaces/peers'](this.space.address)
    },
    info() {
      return this.$store.state.system.info
    }
  },
  methods: {
    navigate(to) {
      this.$router.push(to)
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
    async joinSpace() {
      try {
        await this.$store.dispatch('spaces/join', this.space)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async leaveSpace() {
      try {
        await this.$store.dispatch('spaces/leave', this.space)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    openMount() {
      const {space: {address}} = this
      api.get(`spaces/${address}/drive`)
    },
    toggleSync() {
      if(this.connected) {
        this.leaveSpace()
      } else {
        this.joinSpace()
      }
    }
  }
}
</script>
