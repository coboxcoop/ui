<template>
<Screen :back="{name: 'admin-devices'}" v-if="device">
  <template v-slot:header>
    <div class="header">
      <div><Dot :color="connected ? 'lightseagreen' : 'lightgray'" /> {{device.name}}</div>
    </div>
  </template>

  <NavList>
    <a v-if="connected" href="#" @click.prevent="leaveDevice">Disconnect</a>
    <a v-else href="#" @click.prevent="joinDevice">Connect</a>
    <a href="#" v-if="broadcast" @click.prevent="hideDevice">Hide</a>
    <a href="#" v-else @click.prevent="announceDevice">Announce</a>
  </NavList>

  <br />
  Replicate Space:
  <p>Please get the address for the space which you would like to backup.</p>
  <form @submit.prevent="onSubmitAddReplicate">
    <input type="text" placeholder="Space address" v-model="address">
    <input class="has-ok-button" type="text" placeholder="Name" v-model="name">
    <button type="submit">Ok</button>
  </form>

  <br />

  <div v-if="inviteCode">
    <p>Please send the following invite code to the new collaborator. This will make them an admin of this device.</p>
    <CopyKey :value="inviteCode" />
  </div>
  <div v-else>
    <p>To invite someone as an admin for this device, please provide their public key.</p>

    <form @submit.prevent="onSubmitInvite">
      <input class="has-ok-button" type="text" placeholder="Public key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>

  <br />

  Admins:
  <NavList>
    <div v-for="peer in peers" :key="peer.data.author">
      <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
    </div>
  </NavList>

  <br />

  Blind Replicating:
  <NavList>
    <div v-for="replicate in replicates" :key="replicate.value.content.address">
      <Dot :color="replicate.value.type === 'command/unreplicate' ? 'orangered' : 'lightseagreen'" />
      {{replicate.value.content.name}}
      <div v-if="author = replicateAuthor(replicate)">
        Added by <UserIcon :address="author.data.author" /> {{author.data.content.name}}
      </div>
      <button v-if="replicate.value.type === 'command/replicate'" @click="() => onSubmitUnreplicate(replicate)">Unreplicate</button>
      <button v-else @click="() => onSubmitReplicate(replicate)">Replicate</button>
    </div>
  </NavList>
</Screen>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.group-icon {
  margin-right: 0.3rem;
}
</style>

<script>
import Screen    from '@/components/Screen.vue'
import NavList   from '@/components/NavList.vue'
import GroupIcon from '@/components/GroupIcon.vue'
import Plus      from '@/components/Plus.vue'
import CopyKey   from '@/components/CopyKey.vue'
import Dot       from '@/components/Dot.vue'
import UserIcon  from '@/components/UserIcon.vue'

export default {
  components: {
    GroupIcon,
    Screen,
    NavList,
    Plus,
    CopyKey,
    Dot,
    UserIcon
  },
  data: () => ({
    publicKey: '',
    inviteCode: '',
    address: '',
    name: ''
  }),
  computed: {
    device() {
      return this.$store.getters['devices/single'](this.$route.params.address)
    },
    connected() {
      return this.$store.getters['devices/connected'](this.device.address)
    },
    broadcast() {
      return this.$store.getters['devices/broadcast'](this.device.address)
    },
    peers() {
      return this.$store.getters['devices/peers'](this.device.address)
    },
    replicates() {
      return this.$store.getters['devices/replicates'](this.device.address)
    }
  },
  methods: {
    replicateAuthor(replicate) {
      return this.$store.getters['devices/replicateAuthor'](this.device.address, replicate)
    },
    async onSubmitInvite() {
      const {device: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('devices/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
    },
    async onSubmitAddReplicate() {
      const {address, name} = this
      const device = this.device.address

      try {
        const data = await this.$store.dispatch('devices/replicate', {address, name, device})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.address = ''
      this.name = ''
    },
    async onSubmitReplicate(replicate) {
      const device = this.device.address
      const {address, name} = replicate.value.content

      try {
        const data = await this.$store.dispatch('devices/replicate', {address, name, device})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async onSubmitUnreplicate(replicate) {
      const device = this.device.address
      const {address, name} = replicate.value.content

      try {
        await this.$store.dispatch('devices/unreplicate', {address, name, device})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async joinDevice() {
      try {
        await this.$store.dispatch('devices/join', this.device)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async leaveDevice() {
      try {
        await this.$store.dispatch('devices/leave', this.device)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async announceDevice() {
      try {
        await this.$store.dispatch('devices/announce', this.device)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async hideDevice() {
      try {
        await this.$store.dispatch('devices/hide', this.device)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
