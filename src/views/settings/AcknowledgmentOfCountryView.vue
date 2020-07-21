<template>
<Screen :back="{name: 'acknowledgment'}">

  <template v-slot:header>
    Acknowledgment of Country
  </template>
    <div> 
      <p> This interface has been built on the lands of the Boon Wurrung and Wurundjeri peoples of the Eastern Kulin Nations, whose lands have been under ongoing illegal occupation by the settler state known as Australia since 1788.</p>
      <p> Their sovereignty was never ceeded and resistance has been fertile and ongoing.</p>
      <p> We pay our respects to their leaders and elders, past and present.<p>
      <p>1% of funds used to build this interface will be passed to <a href="https://paytherent.net.au/" target="_blank">Pay The Rent</a> and <a href="https://www.indigitek.org.au" target="_blank">Indigitek</a> on an ongoing basis.</p>
      <p> Whose land are you on? Do you know? Do you acknowledge their right to it? If you live on colonised - stolen - land it is important you realise this.</p>
    </div>
</Screen>
</template>

<style scoped lang="scss">
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
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import ToggleSwitch from '@/components/ToggleSwitch.vue'
import Modal        from '@/components/Modal.vue'

export default {
  components: {
    Screen,
    NavList,
    ToggleSwitch,
    Modal
  },
  data: () => ({
    showShortKeyInfo: false
  }),
  methods: {
    toggleShortkey() {
      this.$store.dispatch('settings/toggleShortkey')
    }
  }
}
</script>
