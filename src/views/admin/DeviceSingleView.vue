<template>
<Screen :back="{name: 'admin-devices'}" v-if="device">
  <template v-slot:header>
    <div class="header">
      <div><GroupIcon :address="device.address" /> {{device.name}}</div>
    </div>
  </template>
  <div v-if="inviteCode">
    <p>Please send the following invite code to the new collaborator. This will make them an admin of this device.</p>
    <CopyKey :value="inviteCode" />
  </div>
  <div v-else>
    <p>To invite someone as an admin for this device, please provide their public key.</p>

    <form @submit.prevent="onSubmitInvite">
      <input type="text" placeholder="Public key" v-model="publicKey" />
      <button type="submit">Ok</button>
    </form>
  </div>
</Screen>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.group-icon {
  margin-right: 0.3rem;
}
</style>

<script>
import Screen    from '@/components/Screen.vue'
import NavList   from '@/components/NavList.vue'
import GroupIcon from '@/components/GroupIcon.vue'
import Plus      from '@/components/Plus.vue'
import CopyKey   from '@/components/CopyKey.vue'

export default {
  components: {
    GroupIcon,
    Screen,
    NavList,
    Plus,
    CopyKey
  },
  data: () => ({
    publicKey: '',
    inviteCode: ''
  }),
  computed: {
    device() {
      return this.$store.getters['devices/single'](this.$route.params.address)
    }
  },
  methods: {
    async onSubmitInvite() {
      const {device: {address}, publicKey} = this

      try {
        const data = await this.$store.dispatch('devices/createInvite', {address, publicKey})
        this.inviteCode = data.content.code
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.publicKey = ''
    }
  }
}
</script>
