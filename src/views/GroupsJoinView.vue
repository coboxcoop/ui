<template>
<SubPage>
  <p>What is the public key of the group?</p>
  <form @submit.prevent>
    <input type="text" placeholder="Group key" />
    <button type="submit">Ok</button>
  </form>
</SubPage>
</template>

<script>
import SubPage from '@/components/SubPage.vue'

export default {
  components: {
    SubPage
  }
}
</script>