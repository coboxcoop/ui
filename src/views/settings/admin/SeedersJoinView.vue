<template>
<Screen :back="{name: 'seeders'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <Modal :show="showInfo" @close="showInfo = false">
    <p>This invite will be encrypted to your CoBox key, so only you can use it. It's safe to receive it via an insecure messaging application.</p>
  </Modal>

  <p>To join a seeder, send your CoBox key to a friend that can add you as an admin.</p>

  <CopyKey :value="$store.getters['profile/myPublicKey']" />

  <div class="info">
    <p>What is the invite code to the seeder? <img @click="showInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showInfo = true)" src="@/assets/images/icons/info.svg" /></p>
  </div>
  <form @submit.prevent="onSubmit">
    <input class="has-ok-button" type="text" placeholder="Invite Code" v-model="inviteCode" />
    <button type="submit">Ok</button>
  </form>
</Screen>
</template>

<style scoped lang="scss">
.info {
  display: flex;
  align-items: center;
  p {
    flex: 1;
    img {
      margin-bottom: -0.1em;
      cursor: pointer;
      html.dark & {
        filter: invert(1);
      }
    }
  }
}
</style>

<script>
import Screen  from '@/components/Screen.vue'
import CopyKey from '@/components/CopyKey.vue'
import Modal   from '@/components/Modal.vue'

export default {
  components: {
    Screen,
    CopyKey,
    Modal
  },
  data: () => ({
    showInfo: false,
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
        await this.$router.replace({name: 'seeders'})
        window.location.reload()
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
