<template>
<transition name="pop">
<div class="modal">
  <div class="sheet">
    <a class="close" v-shortkey="{home: ['ctrl', 'h'], esc: ['esc'], back: ['ctrl', 'arrowleft'], p: ['ctrl', 'p']}" @shortkey="shortKeyAction" href="#" @click.prevent="closeProfile">&times;</a>
    <div class="profile">
      <Dot :color="$store.getters['profile/myKeyColor']" />
      <form class="name" @submit.prevent="onSubmit">
        <input v-model="name" type="text" placeholder="Your name" ref="nameInput" @focus="editName = true" @blur="saveName" />
        <div class="blind"><img src="@/assets/images/icons/edit.svg" /> {{name}} <img src="@/assets/images/icons/edit.svg" /></div>
      </form>
    </div>

    <br />

    <small>Your CoBox key</small>
    <CopyKey :value="$store.getters['profile/myPublicKey']" />

    <transition name="slide-up">
      <ProfileSwitcher v-if="showSwitcher" />
    </transition>

    <footer class="switcher" v-if="$store.getters['profile/alternates'].length">
      <a href="#" @click.prevent="showSwitcher = !showSwitcher" v-shortkey="['ctrl', 's']" @shortkey="showSwitcher = !showSwitcher">
        <span v-if="showSwitcher">Close</span>
        <span v-else >Switch profile</span>
      </a>
    </footer>
  </div>
</div>
</transition>
</template>

<script>
import Dot             from '@/components/Dot.vue'
import NavList         from '@/components/NavList.vue'
import CopyKey         from '@/components/CopyKey.vue'
import ProfileSwitcher from '@/components/ProfileSwitcher.vue'

export default {
  components: {
    NavList,
    Dot,
    CopyKey,
    ProfileSwitcher
  },
  data: () => ({
    editName: false,
    name: '',
    showSwitcher: false
  }),
  mounted() {
    this.resetName()
  },
  methods: {
    shortKeyAction(event) {
      switch (event.srcKey) {
        case 'home':
          this.$router.push("/")
          break;
        case 'esc':
          this.closeProfile()
          break;
        case 'p':
          this.closeProfile()
          break;
        case 'back':
          this.closeProfile()
          break;
        default:
          this.closeProfile()
      }
    },
    closeProfile() {
      this.$router.back()
    },
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
  overflow: hidden;
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
    position: relative;
    &:hover .blind img:last-of-type {
      visibility: visible;
    }
    .blind {
      color: transparent;
      pointer-events: none;
      position: absolute;
      top: 0; left: 0; width: 100%;
      pointer-events: none;
      img {
        position: relative;
        top: 0.3rem;
        visibility: hidden;
        html.dark & {
          filter: invert(1);
        }
      }
    }
    input {
      text-align: center;
      width: 100%;
      border: none;
      padding: 0;
      &:focus + .blind, &:active + .blind {
        opacity: 0;
      }
    }
  }
  .name-edit {
    font-size: var(--small);
  }
}
.copy-key {
  margin-bottom: 0;
}
footer {
  position: absolute;
  bottom: 0; left: 0;
  padding: 1.6rem;
  padding-bottom: 1.4rem;
  font-size: var(--small);
  z-index: 3;
}
</style>
