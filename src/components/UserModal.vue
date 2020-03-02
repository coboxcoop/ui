<template>
<div class="modal">
  <a class="close" href="#" @click.prevent="$emit('close')">&times;</a>
  <div class="profile">
    <Dot :color="$store.getters['profile/myKeyColor']" />
    <form class="name" @submit.prevent="onSubmit">
      <input v-model="name" type="text" placeholder="Your name" ref="nameInput" @focus="editName = true" @blur="saveName" />
    </form>
  </div>

  <NavList>
    <RouterLink :to="{name: 'backup'}">Backup keys</RouterLink>
    <RouterLink :to="{name: 'restore'}" class="disabled-feature">Restore</RouterLink>
    <p>My Public Key:<CopyKey :value="$store.getters['profile/myPublicKey']" /></p>
  </NavList>

  <div class="footer">CoBox {{info.version}}, UI {{uiVersion}}</div>
</div>
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
  background: white;
  z-index: 5;
  padding: 1.6rem;
  padding-bottom: 1.2rem;
  margin: 0.8rem;
  border-radius: 4px;
  box-shadow: 0 0 1rem rgba(0, 0, 0, 0.2);
  display: flex;
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
  margin-top: 3rem;
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
</style>
