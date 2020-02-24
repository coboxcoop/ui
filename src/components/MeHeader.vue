<template>
<div>
  <div class="header">
    <div class="left">
      <RouterLink v-if="back" :to="back" class="back">
        <TriangleIcon class="triangle" />
      </RouterLink>

      <div class="user" @click="showUserModal = true">
        <Dot :color="$store.getters['profile/myKeyColor']" /> {{$store.getters['profile/myName']}}
      </div>
    </div>

    <div class="disk">0%</div>
  </div>
  <transition name="modal">
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
  .left {
    display: flex;
  }
  .back {
    position: relative;
    width: 1em;
    height: 1em;
    display: inline-block;
    .triangle {
      width: 0.4em;
      height: auto;
      top: 55%; left: 37%;
      position: absolute;
      transform: translate(-50%, -50%) rotate(180deg);
      transform-origin: center center;
    }
  }
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
.modal-enter, .modal-leave-to {
  transform: translateY(-2rem);
  opacity: 0;
}
.modal-enter-active, .modal-leave-active {
  transition: transform 0.5s var(--ease), opacity 0.3s var(--ease);
}
</style>

<script>
import Dot from '@/components/Dot.vue'
import UserModal from '@/components/UserModal.vue'
import TriangleIcon from '@/components/TriangleIcon.vue'

export default {
  components: {
    Dot,
    UserModal,
    TriangleIcon
  },
  data: () => ({
    showUserModal: false
  }),
  props: {
    back: Object
  }
}
</script>
