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

  <small>Space address</small>
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
    <p>To invite someone to join this space, please provide their public key to create their bespoke invite code.</p>

    <form @submit.prevent="onSubmitInvite">
      <input class="has-ok-button" type="text" placeholder="Public key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
  <NavList>
    <div class="switch">
      <label>Sync</label>
      <ToggleSwitch :value="connected" @input="toggleSync" />
    </div>
    <form @submit.prvent="onSubmitDelete">
      <div class="delete">
        <button type="submit">DELETE</button>
      </div>
    </form>
    <div v-if="deleteChecked">
      <p> collaborator-list: may still have copies of the data on their machines</p>
      <p> seeder-list: may still have encrypted copies of this data</p>
      <p> this action will only remove all data from this machine, are you sure, type name of space to confirm</p>
      <form @submit.prvent="onSubmitDelete">
        <div class="delete">
          <button type="submit">DELETE</button>
        </div>
      </form>
    </div>
    <div v-else>
      <form @submit.prevent="onSubmitDeleteCheck">
        <label>DELETE folder</label>
        <input class="has-ok-button" type="text" placeholder="Name of folder" v-model="space.name" />
        <button type="submit">Ok</button>
      </form>
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
  align-items: center;
}
.delete {
  display: felx;
  justify-content: space-between;
  align-items: center;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import SpaceIcon from '@/components/SpaceIcon.vue'
import UserIcon from '@/components/UserIcon.vue'
import Plus from '@/components/Plus.vue'
import CopyKey from '@/components/CopyKey.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import {api} from '@/api'

export default {
  components: {
    SpaceIcon,
    UserIcon,
    Screen,
    NavList,
    Plus,
    CopyKey,
    ToggleSwitch
  },
  data: () => ({
    publicKey: '',
    inviteCode: '',
    deleteChecked: false
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
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
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
    async onSubmitDeleteCheck() {
      const deleteChecked = true
    },
    async onSubmitDelete() {
      const {space: {address}} = this

      try {
        const data = await this.$store.dispatch('spaces/delete', {address})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
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
