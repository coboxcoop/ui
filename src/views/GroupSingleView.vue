<template>
<Screen :back="{name: 'groups'}" v-if="group">
  <template v-slot:header>
    <Dot color="lightseagreen" />
    {{group.name}}
  </template>

  <div v-if="inviteCode">
    <p>Please send the following invite code to the new collaborator.</p>
    <pre>{{inviteCode}}</pre>
    <RouterLink :to="{name: 'groups'}">Ok</RouterLink>
  </div>
  <div v-else>
    <p>To invite someone to join this group, please provide their public key.</p>

    <form @submit.prevent="onSubmitInvite">
      <input type="text" placeholder="Public key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    Dot,
    Screen,
    NavList,
    Plus
  },
  data: () => ({
    publicKey: '',
    inviteCode: ''
  }),
  computed: {
    group() {
      return this.$store.getters['groups/single'](this.$route.params.address)
    }
  },
  methods: {
    async onSubmitInvite() {
      const {group: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('groups/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
    }
  }
}
</script>