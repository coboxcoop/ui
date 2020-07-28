<template>
<Screen :back="{name: 'manage-keys'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <p>Click the button below to export your nickname, keys, folders, and seeders.
      Keep this in a safe place as it includes your secret keys!</p>

    <a :href="exportUrl" :download="exportFilename" v-shortkey.once="['ctrl', 'd']" 
      @shortkey="downloadExport" ref="download">Download secrets</a>
  </div>
</Screen>
</template>

<style lang="scss" scoped>
.page {
  border-top: 1px solid;
  padding-top: 0.6rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import {baseURL} from '@/api'

export default {
  data: () => ({
    path: ''
  }),
  components: {
    Screen
  },
  computed: {
    exportUrl: function () {
      return baseURL+'/export'
    },
    exportFilename: function () {
      return 'backup.cobox'
    }
  },
  methods: {
    downloadExport() {
      this.$refs.download.click()
    }
  }
}
</script>
