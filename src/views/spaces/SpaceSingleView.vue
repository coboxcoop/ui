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
    <a href="#" @click.prevent="openMount" v-shortkey="['ctrl', 'o']" @shortkey="openMount">Open folder</a>
    <RouterLink :to="{name: 'space-health'}" v-shortkey="['ctrl', 'h']" @shortkey.native="navigate({name: 'space-health'})">Health</RouterLink>
    <RouterLink :to="{name: 'space-delete', params: {address: $route.params.address}}" v-shortkey="['ctrl', 'd']" @shortkey.native="navigate({name: 'space-delete', params: {address: $route.params.address}})">Delete</RouterLink>
    <div class="switch">
      <label>Mount Folder</label>
      <!--  FIXME: toggle should emit GET to mount -->
      <!--  need error handling for checking if a folder is mounted already or not -->
      <!-- // GET /api/spaces/mounts -->
      <!-- // POST /api/spaces/:id/mounts -->
      <!-- // DELETE /api/spaces/:id/mounts -->
      <ToggleSwitch @input="toggleFolderMount" :value="$store.state.settings.mount" v-shortkey="['ctrl', 'm']" @shortkey.native="toggleFolderMount" />
    </div>
  </NavList>
  
  <div style="height: 1.6rem" />

  <h2>{{peerCountString}}</h2>

  <NavList>
    <div v-for="peer in peers" :key="peer.publicKey">
      <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
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
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import UserIcon     from '@/components/UserIcon.vue'
import CopyKey      from '@/components/CopyKey.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import {api}        from '@/api'

export default {
  components: {
    UserIcon,
    Screen,
    NavList,
    CopyKey,
    ToggleSwitch
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
    toggleFolderMount() {
      this.$store.dispatch('spaces/mount')
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
