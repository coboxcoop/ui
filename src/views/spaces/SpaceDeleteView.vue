<template>
<Screen :back="{name: 'space', params: {address: $route.params.address}}" v-if="space">
  <template v-slot:header>
    <div class="header">
      <div>
        <SpaceIcon :address="space.address" /> {{space.name}}
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <div style="height: 1.2rem" />

  <small>
    <p>This action will remove the folder data from this machine.</p>
    <p>However collaborators may still have copies of the data, and seeders may still retain encrypted copies.</p>
    <p>To continue, enter the folder name below to confirm.</p>
  </small>


  <form @submit.prevent>
    <input type="text" placeholder="Confirm name" v-model="nameConfirm" />
  </form>

  <a class="big-button danger" href="#" @click.prevent="deleteSpace" v-if="nameConfirm == space.name">Delete folder</a>
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
.danger {
  margin-top: auto;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import SpaceIcon from '@/components/SpaceIcon.vue'
import UserIcon from '@/components/UserIcon.vue'
import Plus from '@/components/Plus.vue'
import CopyKey from '@/components/CopyKey.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import {api} from '@/api'

export default {
  components: {
    SpaceIcon,
    UserIcon,
    Screen,
    NavList,
    Plus,
    CopyKey,
    ToggleSwitch
  },
  data: () => ({
    publicKey: '',
    inviteCode: '',
    nameConfirm: ''
  }),
  computed: {
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    connected() {
      return this.$store.getters['spaces/connected'](this.space.address)
    },
    stat() {
      return this.$store.getters['spaces/stat'](this.space.address)
    },
    peers() {
      return this.$store.getters['spaces/peers'](this.space.address)
    },
    info() {
      return this.$store.state.system.info
    }
  },
  methods: {
    async deleteSpace() {
      try {
        const data = await this.$store.dispatch('spaces/delete', {address})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }

      this.$router.replace({name: 'spaces'})
    }
  }
}
</script>
