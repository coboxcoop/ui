<template>
<Screen :back="{name: 'spaces-init'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <p>To join a folder, send your cobox address to someone that can invite you.</p>

    <small>Your cobox address:</small>
    <CopyKey :value="$store.getters['profile/myPublicKey']" />

    <p>What is the invite code of the folder?</p>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Invite code" v-model="inviteCode" class="has-ok-button" />
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
  }
}
</script>
