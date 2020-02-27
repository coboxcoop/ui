<template>
<Screen :back="{name: 'groups'}" v-if="group">
  <template v-slot:header>
    <GroupIcon :address="group.address" />
    {{group.name}}
  </template>

  <NavList>
    <a v-if="$store.getters['groups/connected'](group.address)" href="#" @click.prevent="leaveGroup">Disconnect</a>
    <a v-else href="#" @click.prevent="joinGroup">Connect</a>
  </NavList>

  <br />

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
import GroupIcon from '@/components/GroupIcon.vue'
import Plus from '@/components/Plus.vue'

export default {
  components: {
    GroupIcon,
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
    },
    async joinGroup() {
      try {
        await this.$store.dispatch('groups/join', this.group)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
    async leaveGroup() {
      try {
        await this.$store.dispatch('groups/leave', this.group)
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    }
  }
}
</script>