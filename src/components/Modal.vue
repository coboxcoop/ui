<template>
<transition name="pop">
<div class="modal" v-if="show">
  <div class="sheet">
    <a class="close" href="#" @click.prevent="$emit('close')" v-shortkey="['esc']" @shortkey="navigate($emit('close'))">&times;</a>

    <div class="content">
      <slot />
    </div>
  </div>
</div>
</transition>
</template>

<style scoped lang="scss">
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
</style>

<script>
export default {
  props: {
    show: Boolean
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    }
  }
}
</script>
