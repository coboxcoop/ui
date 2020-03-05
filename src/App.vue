<template>
<div id="app"> 
  <transition name="fade">
    <div v-if="offline" class="offline">
      <img src="@/assets/images/icons/CoBox-icon.png" />
      <p>
        Could not connect<br />to CoBox API server.<br />
        <a @click.prevent="reload" href="#">Reload</a>
      </p>
    </div>
    <div v-else-if="ready" class="yield">
      <div v-if="hasName">
        <transition name="route">
          <router-view />
        </transition>
      </div>
      <OnboardingView v-else />
    </div>
  </transition>
  <transition name="modal">
    <UserModal
      v-if="$store.state.showUserModal"
      @close="$store.dispatch('hideUserModal')" />
  </transition>
  <Errors />
</div>
</template>

<script>
import UserModal from '@/components/UserModal.vue'
import OnboardingView from '@/views/OnboardingView.vue'
import Errors from '@/components/Errors.vue'

export default {
  components: {
    Errors,
    UserModal,
    OnboardingView
  },
  async mounted() {
    await this.$store.dispatch('init')
    if(this.hasName) {
      await this.$store.dispatch('groups/fetch')
      await this.$store.dispatch('groups/joinAll')
      await this.$store.dispatch('devices/fetch')
      await this.$store.dispatch('devices/joinAll')
      await this.$store.dispatch('devices/getAllPeers')
      await this.$store.dispatch('devices/getAllReplicates')
    } else {
      this.$router.replace({name: 'home'})
    }
  },
  computed: {
    ready() {
      return this.$store.state.ready
    },
    offline() {
      return this.$store.state.system.offline
    },
    hasName() {
      return this.$store.getters['profile/hasName']
    }
  },
  watch: {
    $route() {
      this.$store.dispatch('error/dismiss')
      this.$store.dispatch('hideUserModal')
    }
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
  background: white;
  margin: auto;
  width: 100%;
  height: 100%;
  flex: 1;
  max-width: 34rem;
  max-height: 52rem;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.15);
}
.offline {
  text-align: center;
  margin: auto;
  font-size: 70%;
  img {
    width: auto;
    height: 3em;
    margin-bottom: 1em;
  }
  a {
    text-decoration: underline;
  }
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
