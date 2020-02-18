<template>
<SubPage>
  <p>What is the invite key of the group?</p>
  <form @submit.prevent="onSubmit">
    <input type="text" placeholder="Group invite key" v-model="groupInviteKey" />
    <button type="submit">Ok</button>
  </form>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'

export default {
  components: {
    SubPage
  },
  data: () => ({
    groupInviteKey: ''
  }),
  methods: {
    async onSubmit() {
      try {
        await this.$store.dispatch('groups/join', this.groupInviteKey)
        this.groupInviteKey = ''
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>