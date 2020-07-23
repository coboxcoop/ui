<template>
  <Screen :back="{name: 'seeders'}" v-if="seeder">
  <template v-slot:header>
    <div class="header">
      <div><Dot :color="connected ? 'lightseagreen' : 'lightgray'" /> {{seeder.name}}</div>
    </div>
  </template>

  <br />
  Replicate folder:
  <p>Please get the address for the folder which you would like to backup.</p>
  <form @submit.prevent="onSubmitAddReplicate">
    <input type="text" placeholder="Folder address" v-model="address">
    <input class="has-ok-button" type="text" placeholder="Name" v-model="name">
    <button type="submit">Ok</button>
  </form>

  <br />

  <div v-if="inviteCode">
    <p>Please send the following invite code to the new collaborator. This will make them an admin of this seeder.</p>
    <CopyKey :value="inviteCode" />
  </div>
  <div v-else>
    <p>To invite someone as an admin for this seeder, please provide their cobox address.</p>

    <form @submit.prevent="onSubmitInvite">
      <input class="has-ok-button" type="text" placeholder="collaborator's cobox address" v-model="publicKey" />
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

  Encrypted backups you're seeding:
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
.space-icon {
  margin-right: 0.3rem;
}
</style>

<script>
import Screen    from '@/components/Screen.vue'
import NavList   from '@/components/NavList.vue'
import SpaceIcon from '@/components/SpaceIcon.vue'
import Plus      from '@/components/Plus.vue'
import CopyKey   from '@/components/CopyKey.vue'
import Dot       from '@/components/Dot.vue'
import UserIcon  from '@/components/UserIcon.vue'

export default {
  components: {
    SpaceIcon,
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
    seeder() {
      return this.$store.getters['seeders/single'](this.$route.params.address)
    },
    connected() {
      return this.$store.getters['seeders/connected'](this.seeder.address)
    },
    peers() {
      return this.$store.getters['seeders/peers'](this.seeder.address)
    },
    replicates() {
      return this.$store.getters['seeders/replicates'](this.seeder.address)
    }
  },
  methods: {
    replicateAuthor(replicate) {
      return this.$store.getters['seeders/replicateAuthor'](this.seeder.address, replicate)
    },
    async onSubmitInvite() {
      const {seeder: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('seeders/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
    },
    async onSubmitAddReplicate() {
      const {address, name} = this
      const seeder = this.seeder.address

      try {
        const data = await this.$store.dispatch('seeders/replicate', {address, name, seeder})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.address = ''
      this.name = ''
    },
    async onSubmitReplicate(replicate) {
      const seeder = this.seeder.address
      const {address, name} = replicate.value.content

      try {
        const data = await this.$store.dispatch('seeders/replicate', {address, name, seeder})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async onSubmitUnreplicate(replicate) {
      const seeder = this.seeder.address
      const {address, name} = replicate.value.content

      try {
        await this.$store.dispatch('seeders/unreplicate', {address, name, seeder})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async joinSeeder() {
      try {
        await this.$store.dispatch('seeders/join', this.seeder)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async leaveSeeder() {
      try {
        await this.$store.dispatch('seeders/leave', this.seeder)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
