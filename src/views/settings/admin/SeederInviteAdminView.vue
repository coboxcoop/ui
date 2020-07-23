<template>
  <Screen :back="{name: 'space', params: {address: space.address}}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
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
