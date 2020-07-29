<template>
  <Screen :back="{name: 'seeder', params: {address: seeder.address}}" v-if="seeder">
  <template v-slot:header>
    <div class="header">
      Seeder > {{seeder.name}} > Seeds
    </div>
  </template>

  Encrypted folders you're seeding:
  <NavList>
    <div v-for="replicate in replicates" :key="replicate.value.content.address">
      {{replicate.value.content.name}}
      <div v-if="author = replicateAuthor(replicate)">
        Added by {{author.data.content.name}}
      </div>
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
