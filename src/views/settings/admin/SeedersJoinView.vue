<template>
<Screen :back="{name: 'seeders'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <p>To join a seeder, send your CoBox key to a friend that can add you as an admin.</p>

  <CopyKey :value="$store.getters['profile/myPublicKey']" />

  <p>What is the invite code to the seeder?</p>
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
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    async onSubmit() {
      try {
        await this.$store.dispatch('seeders/acceptInvite', this.inviteCode)
        this.inviteCode = ''
        this.$router.replace({name: 'seeders'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
