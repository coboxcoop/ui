<template>
<Screen :back="{name: 'settings-admin-seeders'}">
  <p>To join a seeder, send your public key to someone that can add you as an admin.</p>

  <CopyKey :value="$store.getters['profile/myPublicKey']" />

  <p>What is the invite code of the seeder?</p>
  <form @submit.prevent="onSubmit">
    <input class="has-ok-button" type="text" placeholder="Invite Code" v-model="inviteCode" />
    <button type="submit">Ok</button>
  </form>
</Screen>
</template>

<script>
import Screen  from '@/components/Screen.vue'
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
        await this.$store.dispatch('seeders/acceptInvite', this.inviteCode)
        this.inviteCode = ''
        this.$router.replace({name: 'admin-seeders'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
