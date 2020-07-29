<template>
  <Screen :back="{name: 'seeders'}" v-if="seeder">
  <template v-slot:header>
    <div class="header">
      Seeder > {{seeder.name}}
    </div>
  </template>

  <br />
  <NavList>
    <RouterLink :to="{name: 'seeder-add-seed'}" v-shortkey="['ctrl', 's']" @shortkey.native="navigate({name: 'seeder-add-seed'})">Seed a folder</RouterLink>
    <RouterLink :to="{name: 'seeder-folders'}" v-shortkey="['ctrl', 'f']" @shortkey.native="navigate({name: 'seeder-folders'})">Seeds</RouterLink>
  </NavList>

  <br />

  <RouterLink :to="{name: 'seeder-invite'}" v-shortkey="['ctrl', 'a']" @shortkey.native="navigate({name: 'seeder-invite'})">Add admin</RouterLink>

  Seeder admins:
  <NavList>
    <div v-for="peer in peers" :key="peer.data.author">
      <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
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
import Dot       from '@/components/Dot.vue'
import UserIcon  from '@/components/UserIcon.vue'

export default {
  components: {
    SpaceIcon,
    Screen,
    NavList,
    Plus,
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
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
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
    }
  }
}
</script>
