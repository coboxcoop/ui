<template>
<Screen :back="{name: 'groups-init'}">
  <div class="page">
    <p>What would you like your Space to be called?</p>

    <form @submit.prevent="onSubmit">
      <input type="text" placeholder="Space name" v-model="groupName" class="has-ok-button" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style scoped lang="scss">
.page {
  border-top: 1px solid black;
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'

export default {
  data: () => ({
    groupName: ''
  }),
  components: {
    Screen
  },
  methods: {
    async onSubmit() {
      try {
        const {address} = await this.$store.dispatch('groups/create', this.groupName)
        this.groupName = ''
        console.warn({group: address})
        this.$router.push({name: 'group', params: {address}})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>
