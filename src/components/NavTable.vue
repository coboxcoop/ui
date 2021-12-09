<template>
  <nav class="nav">
    <div class="column">
      <slot name="left" />
    </div>
    <div class="column">
      <slot name="right" />
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.nav {
  display: flex; 
}
.nav .column {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
