<template>
<Screen :back="{name: 'space', params: {address: space.address}}" v-if="space" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <template v-slot:header>
    <div class="header">
      <div>
        Folder > {{space.name}} > Health
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <div style="height: 1.2rem" />

  <small>Folder address</small>
  <CopyKey :value="space.address" />
  <small>When you close your laptop, your CoBox app will stop syncronizing data.
  To make sure your data is always available, it needs more seeders. Provide this
  CoBox folder address to a seeder admin so they can seed your folder.</small>


  <br />

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
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import CopyKey from '@/components/CopyKey.vue'
import {api} from '@/api'

export default {
  components: {
    Screen,
    NavList,
    CopyKey
  },
  data: () => ({
    publicKey: '',
    inviteCode: ''
  }),
  computed: {
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
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
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
