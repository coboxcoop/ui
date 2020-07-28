<template>
  <Screen :back="{name: 'seeder', params: {address: $route.params.address}}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div v-if="inviteCode">
    <p>Please send the following invite code to your friend. This will make them an admin of this seeder.</p>
    <CopyKey :value="inviteCode" />
  </div>
  <div v-else>
    <p>To invite your friend to be an admin of this seeder, please provide their CoBox key.</p>

    <form @submit.prevent="onSubmitInvite">
      <input class="has-ok-button" type="text" placeholder="Friends CoBox address" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style scoped lang="scss">
.page {
  border-top: 1px solid var(--fg);
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import CopyKey from '@/components/CopyKey.vue'

export default {
  components: {
    Screen,
    CopyKey
  },
  data: () => ({
    inviteCode: ''
  }),
  computed: {
    seeder() {
      return this.$store.getters['seeders/single'](this.$route.params.address)
    }
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    async onSubmit() {
      try {
        await this.$store.dispatch('spaces/acceptInvite', this.inviteCode)
        this.inviteCode = ''
        this.$router.replace({name: 'spaces'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  },
  computed: {
    space() {
      return this.$store.state.spaces.data
    }
  }
}
</script>
