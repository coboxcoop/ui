<template>
<Screen :back="{name: 'space', params: {address: $route.params.address}}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <Modal :show="showInfo" @close="showInfo = false">
    <p>This invite will be encrypted to your friend's CoBox key, so only they can use it. It's safe to pass to them via an insecure messaging application. Once added this friend's access to the folder cannot be revoked.</p>
  </Modal>

  <template v-slot:header>
    <div class="header">
      <div>
        Folder > {{space.name}} > Invite 
      </div>
    </div>
  </template>

  <div class="page">
    <div v-if="inviteCode">
      <p>Please send the following invite code to your friend.</p>
      <CopyKey :value="inviteCode" />
    </div>
    <div v-else>
      <div class="info">
        <p>To invite a friend provide their CoBox key to make them a secure invite code. <img @click="showInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showInfo = true)" src="@/assets/images/icons/info.svg" /></p>
      </div>

      <form @submit.prevent="onSubmitInvite">
        <input class="has-ok-button" type="text" placeholder="Friend's CoBox Key" v-model="publicKey" />
        <button type="submit">Ok</button>
      </form>

      <div>
        <div>Add existing contact</div>
      </div>
      <pre>{{ allPeers }}</pre>
      <!-- <v&#45;select peers -->
      <!--           :value.sync="selected" -->
      <!--           :options="selectOptions"> -->
      <!-- </v&#45;select> -->

    </div>
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
    inviteCode: '',
    publicKey: '',
    selected: []
  }),
  computed: {
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    allPeers() {
      return this.$store.getters['spaces/allPeers']
    },
    selectOptions() {
      return this.allPeers.map(p => ({label: p.data.content.name, value: p.data.author}))
    }
  },
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
  }
}
</script>
