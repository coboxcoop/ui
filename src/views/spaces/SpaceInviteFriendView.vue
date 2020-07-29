<template>
<Screen :back="{name: 'space', params: {address: $route.params.address}}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <div v-if="inviteCode">
      <p>Please send the following invite code to your friend.</p>
      <CopyKey :value="inviteCode" />
    </div>
    <div v-else>
      <p>To invite a friend provide their CoBox key to make them a secure invite code.</p>

      <form @submit.prevent="onSubmitInvite">
        <input class="has-ok-button" type="text" placeholder="Friends CoBox key" v-model="publicKey" />
        <button type="submit">Ok</button>
      </form>
    </div>
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
    inviteCode: '',
    publicKey: ''
  }),
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
      return this.$store.getters['spaces/single'](this.$route.params.address)
    }
  }
}
</script>
