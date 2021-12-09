<template>
<Screen :back="{name: 'spaces-init'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <Modal :show="showInfo" @close="showInfo = false">
    <p>This invite will be encrypted to your CoBox key, so only you can use it. It's safe to receive it via an insecure messaging application.</p>
    <small>When first joining the folder CoBox will start syncing the files directly from your friend or Seeders. This may take a while depending on the size of the folder. Keep CoBox running on initial sync.</small>
  </Modal>

  <div class="page">
    <p>To join a folder, send your CoBox key to a friend that can invite you.</p>

    <small>Your CoBox key</small>
    <CopyKey :value="$store.getters['profile/myPublicKey']" />

    <div class="info">
      <p>What is the invite code of the folder? <img @click="showInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showInfo = true)" src="@/assets/images/icons/info.svg" /></p>
    </div>
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
        const {address} = await this.$store.dispatch('spaces/acceptInvite', this.inviteCode)
        this.inviteCode = ''
        await this.$router.push({name: 'space', params: {address}})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
