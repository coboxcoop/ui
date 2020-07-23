<template>
<Screen :back="{name: 'spaces'}" v-if="space" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    <div class="header">
      <div>
        {{space.name}}
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <div style="height: 1.2rem" />

  <small>Mount point</small>
  <CopyKey :value="info.mount" action="Open" @action="openMount" />

  <NavList>
    <RouterLink :to="{name: 'space-health'}" v-shortkey="['ctrl', 'h']" @shortkey.native="navigate({name: 'space-health'})">Folder health</RouterLink>
    <RouterLink :to="{name: 'space-invite'}" v-shortkey="['ctrl', 'i']" @shortkey.native="navigate({name: 'space-invite'})">Invite collaborator</RouterLink>
  </NavList>

  <h2>{{peerCountString}}</h2>

  <NavList>
    <div v-for="peer in peers" :key="peer.publicKey">
      <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
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
  margin-right: 0.3rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import UserIcon from '@/components/UserIcon.vue'
import CopyKey from '@/components/CopyKey.vue'
import {api} from '@/api'

export default {
  components: {
    UserIcon,
    Screen,
    NavList,
    CopyKey
  },
  data: () => ({
    publicKey: '',
    inviteCode: ''
  }),
  computed: {
    peerCountString() {
      const count = this.$store.getters['spaces/peerCount'](this.space.address)

      return `${count} collaborator${count != 1 ? 's' : ''}`
    },
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
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
    openMount() {
      const {space: {address}} = this
      api.get(`spaces/${address}/drive`)
    }
  }
}
</script>
