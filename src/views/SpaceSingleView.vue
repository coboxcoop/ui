<template>
<Screen :back="{name: 'home'}" v-if="space">
  <template v-slot:header>
    <div class="header">
      <div>
        <a href="#" @click.prevent="toggleConnect">
          <SpaceIcon :address="space.address" />
        </a>
        {{space.name}}
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <NavList>
    <a v-if="connected" href="#" @click.prevent="leaveSpace">Disconnect</a>
    <a v-else href="#" @click.prevent="joinSpace">Connect</a>
    <!-- <a v&#45;if="mounted" href="#" @click.prevent="unmountSpace">Unmount</a> -->
    <!-- <a v&#45;else href="#" @click.prevent="mountSpace">Mount</a> -->
  </NavList>
  <small>Mounted at: {{info.mount}}</small>

  <br />

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
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import SpaceIcon from '@/components/SpaceIcon.vue'
import UserIcon from '@/components/UserIcon.vue'
import Plus from '@/components/Plus.vue'
import CopyKey from '@/components/CopyKey.vue'

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
    mounted() {
      return this.$store.getters['spaces/mounted'](this.space.address)
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
    async toggleConnect() {
      if(this.connected) {
        await this.leaveSpace()
      } else {
        await this.joinSpace()
      }
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
    async mountSpace() {
      try {
        await this.$store.dispatch('spaces/mount', this.space)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async unmountSpace() {
      try {
        await this.$store.dispatch('spaces/unmount', this.space)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
