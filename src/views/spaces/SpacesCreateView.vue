<template>
<Screen :back="{name: 'spaces-init'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <Modal :show="showInfo" @close="showInfo = false">
    <p>This name cannot be changed. When you add friends or your other devices to this folder they will see this name.  Being able to update the name will be added in a future release.</p>
  </Modal>

  <div class="page">
    <div class="info">
      <p>What would you like your folder to be called? <img @click="showInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showInfo = true)" src="@/assets/images/icons/info.svg" /></p>
    </div>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Folder name" v-model="spaceName" class="has-ok-button" />
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
import Screen from '@/components/Screen.vue'
import Modal  from '@/components/Modal.vue'

export default {
  components: {
    Screen,
    Modal
  },
  data: () => ({
    showInfo: false,
    spaceName: ''
  }),
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    async onSubmit() {
      try {
        const {address} = await this.$store.dispatch('spaces/create', this.spaceName)
        this.spaceName = ''
        await this.$router.push({name: 'space', params: {address}})
        window.location.reload()
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
