<template>
<Screen>
  <NavList>
    <div>
      <RouterLink :to="{name: 'spaces'}">
        Spaces <sup>{{spacesCount}}</sup>
      </RouterLink>
      <RouterLink :to="{name: 'spaces-init'}">
        <Plus />
      </RouterLink>
    </div>
    <div>
      <RouterLink :to="{name: 'admin-seeders'}">
        Seeders <sup>{{seedersCount}}</sup>
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
  },
  computed: {
    spacesCount() {
      return this.$store.getters['spaces/count']
    },
    seedersCount() {
      return this.$store.getters['seeders/count']
    }
  }
}
</script>

