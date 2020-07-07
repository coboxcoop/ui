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
</Screen>
</template>

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

