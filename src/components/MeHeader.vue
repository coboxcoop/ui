<template>
<div>
  <div class="header">
    <div class="user" @click="showUserModal = true">
      <Dot :color="$store.getters['profile/myKeyColor']" /> {{$store.getters['profile/myName']}}
    </div>
    <div class="disk">0%</div>
  </div>
  <UserModal
    v-if="showUserModal"
    @close="showUserModal = false" />
</div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 0.6rem;
}
.user {
  cursor: pointer;
}
.disk {
  color: lightgray;
}
.dot {
  margin-right: 0.3rem;
}
</style>

<script>
import Dot from '@/components/Dot.vue'
import UserModal from '@/components/UserModal.vue'

export default {
  components: {
    Dot,
    UserModal
  },
  data: () => ({
    showUserModal: false
  })
}
</script>
