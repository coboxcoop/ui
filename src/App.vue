<template>
<div id="app"> 
  <transition name="fade">
    <NoUiView/>
  </transition>
</div>
</template>

<script>
import NoUiView from '@/views/NoUiView.vue'

export default {
  components: {
    NoUiView,
  },
  methods: {
    reload() {
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  margin: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  max-width: 34rem;
  max-height: 52rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 1rem var(--shadow);
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s var(--ease);
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
.yield {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  position: absolute;
  top: 0; left: 0;
  width: 100%;
  height: 100%;
}
.route-enter-active, .route-leave-active {
  transition: opacity 0.3s var(--ease);
}
.route-enter, .route-leave-to {
  opacity: 0;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s var(--ease);
}
</style>

<style lang="scss" src="@/global.scss" />
