<template>
<Screen :back="{name: 'seeder', params: {address: $route.params.address}}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <Modal :show="showInfo" @close="showInfo = false">
    <p>This invite will be encrypted to your friends CoBox key, so only they can use it. It's safe to pass to them via an insecure messaging application.</p>
  </Modal>

  <div v-if="inviteCode">
    <p>Please send the following invite code to your friend. This will make them an admin of this seeder.</p>
    <CopyKey :value="inviteCode" />
  </div>
  <div v-else>
    <div class="info">
      <p>To invite your friend to be an admin of this seeder, please provide their CoBox key. <img @click="showInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showInfo = true)" src="@/assets/images/icons/info.svg" /></p>
    </div>

    <form @submit.prevent="onSubmitInvite">
      <input class="has-ok-button" type="text" placeholder="Friends CoBox Key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
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
import Screen from '@/components/Screen.vue'
import CopyKey from '@/components/CopyKey.vue'
import Modal        from '@/components/Modal.vue'

export default {
  components: {
    Screen,
    CopyKey,
    Modal
  },
  data: () => ({
    showInfo: false,
    inviteCode: '',
    publicKey: '',
    address: '',
    name: ''
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
    async onSubmitInvite() {
      const {seeder: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('seeders/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
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
