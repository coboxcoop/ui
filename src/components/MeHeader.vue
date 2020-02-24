<template>
<div>
  <div class="header">
    <div class="user" @click="showUserModal = true">
      <Dot :color="$store.getters['profile/myKeyColor']" /> {{$store.getters['profile/myName']}}
    </div>
    <div class="disk">0%</div>
  </div>
  <transition name="pop">
    <UserModal
      v-if="showUserModal"
      @close="showUserModal = false" />
  </transition>
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
.pop-enter, .pop-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
.pop-enter-active, .pop-leave-active {
  transition: transform 0.5s var(--ease), opacity 0.3s var(--ease);
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
