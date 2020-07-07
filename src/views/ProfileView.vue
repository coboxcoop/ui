<template>
<transition name="pop">
<div class="modal">
  <div class="sheet">
    <RouterLink :to="{name: 'spaces'}">
      <a class="close" href="#">&times;</a>
    </RouterLink>
    <div class="profile">
      <Dot :color="$store.getters['profile/myKeyColor']" />
      <form class="name" @submit.prevent="onSubmit">
        <input v-model="name" type="text" placeholder="Your name" ref="nameInput" @focus="editName = true" @blur="saveName" />
      </form>
    </div>

    <br />

    <small>Public key</small>
    <CopyKey :value="$store.getters['profile/myPublicKey']" />

    <NavList>
      <RouterLink :to="{name: 'backup'}">Backup identity</RouterLink>
      <a href="#" class="disabled-feature">Restore</a>
    </NavList>

    <div class="footer">CoBox {{info.version}}, UI {{uiVersion}}</div>
  </div>
</div>
</transition>
</template>

<script>
import Dot     from '@/components/Dot.vue'
import NavList from '@/components/NavList.vue'
import CopyKey from '@/components/CopyKey.vue'

export default {
  components: {
    NavList,
    Dot,
    CopyKey
  },
  data: () => ({
    editName: false,
    name: ''
  }),
  mounted() {
    this.resetName()
  },
  computed: {
    uiVersion() {
      return process.env.VUE_APP_VERSION
    },
    info() {
      return this.$store.state.system.info
    }
  },
  methods: {
    resetName() {
      this.name = this.$store.getters['profile/myName']
    },
    onClickEdit() {
      this.editName = true
      this.name = ''
      this.$refs.nameInput.focus()
    },
    onSubmit() {
      this.$refs.nameInput.blur()
    },
    async saveName() {
      this.editName = false
      await this.$store.dispatch('profile/updateName', this.name)
      this.resetName()
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  top: 0; left: 0;
  bottom: 0; right: 0;
  background: var(--modal-bg);
  z-index: 5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.sheet {
  position: relative;
  border-radius: 4px;
  box-shadow: 0 0 1rem var(--shadow);
  background: var(--bg);
  display: flex;
  height: calc(100% - 3.2rem);
  width: calc(100% - 3.2rem);
  padding: 1.6rem;
  padding-bottom: 1.4rem;
  flex-direction: column;
}
.close {
  position: absolute;
  top: 0; right: 0;
  width: 1em;
  height: 1em;
  text-align: center;
  font-size: 120%;
  &:not(:hover) {
    color: lightgray;
  }
}
.nav-list  {
  border-top: none;
}
.profile {
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  text-align: center;
  .dot {
    margin: auto;
    width: 8rem;
    height: 8rem;
  }
  .name {
    margin-top: 0.6rem;
    input {
      text-align: center;
      width: 100%;
      border: none;
    }
  }
  .name-edit {
    font-size: var(--small);
  }
}
.footer {
  margin-top: auto;
  font-size: var(--small);
}
.copy-key {
  margin-bottom: 0;
}
</style>
