<template>
<div>
  <header>
    <RouterLink :to="{name: 'home'}"><slot name="header" /></RouterLink>
  </header>
  <div class="inner">
    <slot />
  </div>
</div>
</template>

<style lang="scss" scoped>
header {
  border-bottom: 1px solid;
  padding: 0.6rem 0;
  margin-bottom: 0.6rem;
}
</style>