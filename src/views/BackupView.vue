<template>
<SubPage>
  <template v-slot:header>Backup</template>
  <div class="page">
    <p>Where would you like to save your account to?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="filesystem location" />
      <button type="submit">Ok</button>
    </form>
  </div>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'

export default {
  components: {
    SubPage
  },
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('groups/create', this.groupName)
        this.groupName = ''
        this.$router.replace({name: 'groups'})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
