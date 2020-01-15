<template>
<div>
  <MeHeader />
  <IndexSection :show="showSection('network')" @toggle="toggleSection('network')">
    <template slot="heading">Network 1 <Dot /></template>
  </IndexSection>
  <SpaceIndexSection :show="showSection('spaces')" @toggle="toggleSection('spaces')" />
  <IndexSection :show="showSection('devices')" @toggle="toggleSection('devices')">
    <template slot="heading">Devices <Plus /></template>
    <div><Tick /> Magma 20%</div>
  </IndexSection>
</div>
</template>

<script>
import MeHeader from '@/components/MeHeader.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'
import IndexSection from '@/components/IndexSection.vue'
import SpaceIndexSection from '@/components/SpaceIndexSection.vue'

export default {
  components: {
    MeHeader,
    Dot,
    Plus,
    Tick,
    IndexSection,
    SpaceIndexSection
  },
  data: () => ({
    openSections: []
  }),
  methods: {
    showSection(name) {
     return this.openSections.includes(name)
    },
    toggleSection(name) {
      console.log(name)
      if(this.showSection(name)) {
        this.openSections = this.openSections.filter(n => n != name)
      } else {
        this.openSections.push(name)
      }
    }
  }
}
</script>
