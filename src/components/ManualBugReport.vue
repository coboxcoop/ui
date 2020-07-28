<template>
<div>
  <Modal :show="show" @close="close">
    <div class="inner" v-if="submitted">
      <p>Thank you for submitting a bug report for CoBox.</p>
    </div>
    <div class="inner" v-else>
      <p>Found an issue?</p>
      <form @submit.prevent="submitReport">
        <input type="email" placeholder="Email address" v-model="email" required />
        <textarea rows="7" placeholder="Enter description" v-model="description"/>
        <button class="big-button" type="submit">Submit bug</button>
      </form>
    </div>
  </Modal>
  <a class="bug-report-icon" @click.prevent="show = true" href="#">
    <img src="@/assets/images/icons/bug.svg" />
  </a>
</div>
</template>

<script>
import Modal from '@/components/Modal.vue'

export default {
  components: {
    Modal
  },
  data: () => ({
    show: false,
    submitted: false,
    description: ''
  }),
  methods: {
    close() {
      this.show = false
      this.submitted = false
      this.description = ''
    },
    submitReport() {
      this.submitted = true
      this.$store.dispatch('system/reportBug', this.description)
      this.description = ''
    }
  },
  computed: {
    email: {
      get() {
        return this.$store.state.settings.email
      },
      set(value) {
        this.$store.dispatch('settings/update', {email: value})
      }
    }
  },
}
</script>

<style scoped lang="scss">
form {
  flex: 1;
  display: flex;
  flex-direction: column;
  input[type="email"] {
    border-bottom: 1px solid;
  }
  button {
    position: relative;
  }
}
.inner {
  flex: 1;
  display: flex;
  flex-direction: column;
}
.big-button {
  margin-top: auto;
  width: 100%;
}
.bug-report-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1.6rem;
  z-index: 1;
  img {
    display: block;
    html.dark & {
      filter: invert(1);
    }
  }
}
</style>
