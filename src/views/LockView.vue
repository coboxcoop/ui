<template>
  <div class="container">
    <MeHeader class="me-header" heading="Welcome to CoBox" :settings="false" />
    <p>Enter your password to register or login:</p>
    <form @submit.prevent="submit">
      <input type="text" placeholder="Password" v-model="password" class="has-ok-button" />
      <button type="submit">Ok</button>
    </form>
  </div>
</template>

<script>
import Modal        from '@/components/Modal.vue'
import MeHeader     from '@/components/MeHeader.vue'

export default {
  name: 'LockView',
  components: {
    Modal,
    MeHeader
  },
  data: function () {
    return {
      password: ''
    }
  },
  methods: {
    submit: function (event) {
      this.$store.dispatch('auth/create', this.password)
    }
  }
}
</script>

<style scoped>
.me-header {
  margin-bottom: 0.8rem;
}
.container {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 1.6rem;
}
.switch {
  display: flex;
  align-items: center;
  label {
    flex: 1;
    img {
      margin-bottom: -0.1em;
      cursor: pointer;
      html.dark & {
        filter: invert(1);
      }
    }
  }
}
.bottom {
  margin-top: auto;
}
</style>
