<template>
<div class="profile-switcher">
  <div v-for="alt in alternates" :key="alt.publicKey" class="alt" @click="selectProfile(alt.publicKey)">
    <div class="avatar" :style="{color: keyColor(alt.publicKey)}" />
    {{alt.name}}
  </div>
</div>
</template>

<style scoped lang="scss">
.profile-switcher {
  position: absolute;
  bottom: 0; left: 0;
  width: 100%;
  padding: 1.2rem 1.6rem 4.4rem;
  box-shadow: 0 0 1rem var(--shadow);
}
.alt {
  display: flex;
  align-items: center;
  padding: 0.6rem 0;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 1px solid;
  }
}
.avatar {
  width: 0.75em;
  height: 0.75em;
  background: currentColor;
  border-radius: 50%;
  margin-right: 0.8rem;
}
</style>

<script>
export default {
  computed: {
    alternates() {
      return this.$store.state.profile.alternates
    }
  },
  methods: {
    keyColor(key) {
      return this.$store.getters['profile/keyColor'](key)
    },
    selectProfile(key) {
      this.$store.dispatch('profile/switchProfile', key)
    }
  }
}
</script>