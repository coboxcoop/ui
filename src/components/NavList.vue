<template>
<nav class="nav-list">
  <slot />
</nav>
</template>


<style lang="scss">
.nav-list .plus {
  position: absolute;
  top: 1.2rem;
  right: 0;
}
</style>

<style scoped lang="scss">
nav {
  border-top: 1px solid var(--fg);
  > * {
    display: block;
    padding: 0.6rem 0;
    position: relative;
    &:not(:last-child) {
      border-bottom: 1px solid var(--fg);
    }
  }
}
</style>