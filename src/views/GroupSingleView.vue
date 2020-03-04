<template>
<Screen :back="{name: 'groups'}" v-if="group">
  <template v-slot:header>
    <div class="header">
      <div><GroupIcon :address="group.address" /> {{group.name}}</div>
      <!-- FIXME -->
      <!-- make group address copyable -->
      <CopyKey :value="groupAddress" />
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <NavList>
    <a v-if="connected" href="#" @click.prevent="leaveGroup">Disconnect</a>
    <a v-else href="#" @click.prevent="joinGroup">Connect</a>
    <a v-if="mounted" href="#" @click.prevent="unmountGroup">Unmount</a>
    <a v-else href="#" @click.prevent="mountGroup">Mount</a>
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
  {{group.name}} Peers:
  <NavList v-for="peer in peers" :key="group.address">
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
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import GroupIcon from '@/components/GroupIcon.vue'
import Plus from '@/components/Plus.vue'
import CopyKey from '@/components/CopyKey.vue'

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
    group() {
      return this.$store.getters['groups/single'](this.$route.params.address)
    },
    connected() {
      return this.$store.getters['groups/connected'](this.group.address)
    },
    mounted() {
      return this.$store.getters['groups/mounted'](this.group.address)
    },
    stat() {
      return this.$store.getters['groups/stat'](this.group.address)
    },
    peers() {
      return this.$store.getters['groups/peers'](this.group.address)
    },
  },
  methods: {
    async onSubmitInvite() {
      const {group: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('groups/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
    },
    async joinGroup() {
      try {
        await this.$store.dispatch('groups/join', this.group)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async leaveGroup() {
      try {
        await this.$store.dispatch('groups/leave', this.group)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async mountGroup() {
      try {
        await this.$store.dispatch('groups/mount', this.group)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async unmountGroup() {
      try {
        await this.$store.dispatch('groups/unmount', this.group)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
