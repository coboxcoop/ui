<template>
  <Screen :back="{name: 'admin-seeders-init'}">
  <div class="page">
    <p>What would you like your seeder to be called?</p>

    <form @submit.prevent="onSubmit">
      <input class="has-ok-button" type="text" placeholder="Seeder name" v-model="name" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'

export default {
  data: () => ({
    name: ''
  }),
  components: {
    Screen
  },
  methods: {
    async onSubmit() {
      try {
        const {address} = await this.$store.dispatch('seeders/setup', this.name)
        this.name = ''
        this.$router.replace({name: 'admin-seeders'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
