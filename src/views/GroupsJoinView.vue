<template>
<Screen :back="{name: 'groups-init'}">
  <div class="page">
    <p>To join a group, send your public key to someone that can invite you.</p>
    <pre>{{$store.getters['profile/me'].publicKey}}</pre><br />

    <p>What is the invite code of the group?</p>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Invite code" v-model="inviteCode" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style scoped lang="scss">
.page {
  border-top: 1px solid black;
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'

export default {
  components: {
    Screen
  },
  data: () => ({
    inviteCode: ''
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('groups/acceptInvite', this.inviteCode)
        this.inviteCode = ''
        this.$router.replace({name: 'groups'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
