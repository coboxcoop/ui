<template>
<Section :show="show" @toggle="$emit('toggle')">
  <template slot="heading"><Tick /> {{space.name}} {{space.members.length}} <Plus /></template>
  <div>
    <div v-for="member in space.members" :key="member.id">{{member.name}} <Dot /></div>
  </div>
</Section>
</template>

<script>
import Section from '@/components/Section.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'

export default {
  components: {
    Dot,
    Plus,
    Tick,
    Section
  },
  props: {
    show: Boolean,
    space: Object
  }
}
</script>
