<template>
  <IndexSection :show="show" @toggle="$emit('toggle')">
    <template slot="heading">Spaces <Plus /></template>
    <div>Hey Paul, what would you like your space to be called?</div>
    <div><input type="text"><Plus /></div>
    <Tick /> Public Office 3
    <div>
      <div>Dan <Dot /></div>
      <div>Matt <Dot /></div>
      <div>Paul <Dot /></div>
    </div>
  </IndexSection>
</template>

<script>
import IndexSection from '@/components/IndexSection.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'

export default {
  components: {
    Dot,
    Plus,
    Tick,
    IndexSection
  },
  props: {
    show: Boolean
  }
}
</script>
