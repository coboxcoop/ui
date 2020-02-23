<template>
<SubPage>
  <template v-slot:header>Backup</template>
  <div class="page">
    <p>Where would you like to save your account to?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="filesystem location" v-model="filesystemLocation" />
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
    onSubmit() {
      this.$store.dispatch('profile/backupProfile', this.filesystemLocation)
    }
  }
}
</script>
