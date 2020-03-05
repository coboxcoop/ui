<template>
<form class="copy-key" @submit.prevent="copyValue" action="#">
  <input disabled class="value" type="text" :value="value" @click.prevent="copyValue" />
  <button type="submit" v-if="copied">Copied</button>
  <button type="submit" v-else>Copy</button>
</form>
</template>

<style lang="scss" scoped>
.copy-key {
  margin-bottom: 1em;
  cursor: pointer;
  // &:not(:hover) {
  //   button {
  //     display: none;
  //   }
  // }
}
.copy {
  font-size: var(--small);
  line-height: 1;
}
</style>

<script>
import copyToClipboard from 'clipboard-copy' 

export default {
  props: {
    value: String
  },
  data: () => ({
    copied: false
  }),
  beforeDestroy() {
    if(this.timeout) clearTimeout(this.timeout)
  },
  methods: {
    copyValue() {
      copyToClipboard(this.value)
      this.copied = true
      this.$emit('copy')
      this.timeout = setTimeout(() => {
        this.copied = false
      }, 5000)
    }
  }
}
</script>