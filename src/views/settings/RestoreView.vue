<template>
<Screen :back="{name: 'manage-keys'}" v-shortkey="['ctrl', 'p']" @shortkey.native="navigate({name: 'profile'})">
  <div class="page">
    <p>Restore identity</p>

    <p>Use the button below to select a CoBox backup file to restore from.</p>

    <div class="file-wrap">
      <a href="#">Select file</a>
      <input type="file" name="export" />
    </div>
  </div>
</Screen>
</template>

<style lang="scss" scoped>
.page {
  border-top: 1px solid;
  padding-top: 0.6rem;
}
.file-wrap {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  &:hover a {
    opacity: 0.6;
  }
  input {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    opacity: 0;
  }
}
</style>

<script>
import Screen from '@/components/Screen.vue'

export default {
  components: {
    Screen
  }
}
</script>
