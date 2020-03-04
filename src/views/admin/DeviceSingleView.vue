<template>
<Screen :back="{name: 'admin-devices'}" v-if="device">
  <template v-slot:header>
    <div class="header">
      <div><GroupIcon :address="device.address" /> {{device.name}}</div>
    </div>
  </template>

  <NavList>
    <a v-if="connected" href="#" @click.prevent="leaveDevice">Disconnect</a>
    <a v-else href="#" @click.prevent="joinDevice">Connect</a>
    <!-- FIXME -->
    <!-- at the moment not detecting broadcasts happening, need to check broadcast state and decide to show hide or announce -->
    <a v-if="broadcast" href="#" @click.prevent="hideDevice">Hide</a>
    <a v-else href="#" @click.prevent="announceDevice">Announce</a>
  </NavList>

  <br />
  Replicate Group:
  <p>Please get the replication key for the space which you would like to backup.</p>
  <form @submit.prevent="onSubmitReplicate">
    <input type="text" placeholder="Replication Key" v-model="address">
    <input type="text" placeholder="Name" v-model="name">
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
      <input type="text" placeholder="Public key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
  {{device.name}} Admins:
  <NavList v-for="peer in peers" :key="device.address">
    <div>
      <GroupIcon :address="peer.name" /> 
      <pre>{{peer.data.content.name}}: {{peer.data.author}}</pre>
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

export default {
  components: {
    GroupIcon,
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
    device() {
      return this.$store.getters['devices/single'](this.$route.params.address)
    },
    connected() {
      return this.$store.getters['devices/connected'](this.device.address)
    },
    broadcast() {
      return this.$store.getters['devices/broadcast'](this.device.address)
    },
    hidden() {
      return this.$store.getters['devices/hidden'](this.device.address)
    },
    peers() {
      return this.$store.getters['devices/peers'](this.device.address)
    }
  },
  methods: {
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
    async onSubmitReplicate() {
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
