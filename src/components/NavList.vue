<template>
<nav class="nav-list">
  <slot />
</nav>
</template>

<style scoped lang="scss">
nav {
  border-top: 1px solid;
  > * {
    display: block;
    padding: 0.6rem 0;
    position: relative;
    &:not(:last-child) {
      border-bottom: 1px solid;
    }
  }
}
</style>