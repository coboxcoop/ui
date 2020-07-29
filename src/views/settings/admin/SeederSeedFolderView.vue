<template>
  <Screen :back="{name: 'seeder', params: {address: seeder.address}}" v-if="seeder">
  <Modal :show="showNameInfo" @close="showNameInfo = false">
    <p>This is the name the seed will be known as on this seeder. It can't be changed. Other seeder admins also use this name. Making this name editable will be included in a future release.</p>
  </Modal>

  <template v-slot:header>
    <div class="header">
      Seeder > {{seeder.name}} > Seed folder
    </div>
  </template>

  <br />
  <div class="info">
    <p>The peer needs to give the CoBox address for the folder which they'd like you to seed. Assign a name. <img @click="showNameInfo = true" v-shortkey="['ctrl', 'i']" @shortkey="navigate(showNameInfo = true)" src="@/assets/images/icons/info.svg" /></p>
  </div>
  <form @submit.prevent="onSubmitAddReplicate">
    <input type="text" placeholder="Folder address" v-model="address">
    <input class="has-ok-button" type="text" placeholder="Name" v-model="name">
    <button type="submit">Ok</button>
  </form>
</Screen>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.space-icon {
  margin-right: 0.3rem;
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
import Screen    from '@/components/Screen.vue'
import NavList   from '@/components/NavList.vue'
import Modal        from '@/components/Modal.vue'

export default {
  components: {
    Screen,
    NavList,
    Modal
  },
  data: () => ({
    showNameInfo: false,
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
    async onSubmitAddReplicate() {
      const {address, name} = this
      const seeder = this.seeder.address

      try {
        const data = await this.$store.dispatch('seeders/replicate', {address, name, seeder})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.address = ''
      this.name = ''
      this.$router.replace({name: 'seeders'})
    }
  }
}
</script>
