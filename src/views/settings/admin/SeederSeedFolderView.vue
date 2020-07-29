<template>
  <Screen :back="{name: 'seeders'}" v-if="seeder">
  <template v-slot:header>
    <div class="header">
      Seeder: {{seeder.name}}
    </div>
  </template>

  <br />
  <p>Please get the CoBox address for the folder which you would like to seed.</p>
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
</style>

<script>
import Screen    from '@/components/Screen.vue'
import NavList   from '@/components/NavList.vue'

export default {
  components: {
    Screen,
    NavList
  },
  data: () => ({
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
