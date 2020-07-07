<template>
<Screen>
  <NavList>
    <div>
      <RouterLink :to="{name: 'spaces'}">
        Spaces
      </RouterLink>
      <RouterLink :to="{name: 'spaces-init'}">
        <Plus />
      </RouterLink>
    </div>
    <div>
      <RouterLink :to="{name: 'admin-seeders'}">
        Seeders
      </RouterLink>
      <RouterLink :to="{name: 'admin-seeders-join'}">
        <Plus />
      </RouterLink>
    </div>
  </NavList>

  <footer>
    <RouterLink :to="{name: 'settings'}">
      <img src="@/assets/images/icons/settings.svg" /> Settings
    </RouterLink>
  </footer>
</Screen>
</template>

<style scoped lang="scss">
.space-icon {
  margin-right: 0.3rem;
}
.space {
  display: flex;
  justify-content: space-between;
}
html.dark footer img {
  filter: invert(1);
}
footer {
  margin-top: auto;
  line-height: 1;
  font-size: var(--small);
  img {
    display: inline-block;
    width: auto;
    height: 0.85em;
    margin-bottom: -0.07em;
  }
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import Plus from '@/components/Plus.vue'
import NavList from '@/components/NavList.vue'

export default {
  components: {
    Screen,
    NavList,
    Plus
  }
}
</script>

