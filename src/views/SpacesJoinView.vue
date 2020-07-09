<template>
<Screen :back="{name: 'spaces-init'}">
  <div class="page">
    <p>To join a Space, send your public key to someone that can invite you.</p>

    <CopyKey :value="$store.getters['profile/myPublicKey']" />

    <p>What is the invite code of the Space?</p>
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
    async onSubmit() {
      try {
        await this.$store.dispatch('spaces/acceptInvite', this.inviteCode)
        this.inviteCode = ''
        this.$router.replace({name: 'home'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
