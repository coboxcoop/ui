<template>
<Screen>
  <div class="page">
    <p>What is the invite key of the group?</p>
    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Group invite key" v-model="groupInviteKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style scoped lang="scss">
.page {
  border-top: 1px solid;
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'

export default {
  components: {
    Screen
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