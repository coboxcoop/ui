<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>
    Spaces <sup>{{$store.getters['groups/count']}}</sup>
    <RouterLink :to="{name: 'groups-init'}">
      <Plus />
    </RouterLink>
  </template>
  <NavList v-for="group in groups" :key="group.address">
    <RouterLink class="group" :to="{name: 'group', params: {address: group.address}}">
      <div>
        <GroupIcon :address="group.address" /> {{group.name}} <sup>{{groupPeerCount(group.address)}}</sup>
      </div>
      <div class="stat" v-if="stat(group.address)">{{stat(group.address).size | bytes}}</div>
    </RouterLink>
  </NavList>
</Screen>
</template>

<style scoped lang="scss">
.group-icon {
  margin-right: 0.3rem;
}
.group {
  display: flex;
  justify-content: space-between;
}
</style>

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
  methods: {
    stat(address) {
      return this.$store.getters['groups/stat'](address)
    },
    groupPeerCount(address) {
      return this.$store.getters['groups/peerCount'](address)
    }
  },
  computed: {
    groups() {
      return this.$store.state.groups.data
    }
  }
}
</script>
