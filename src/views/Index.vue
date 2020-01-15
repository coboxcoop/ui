<template>
<div>
  <MeHeader />
  <IndexSection :show="showSection('network')">
  <template slot="heading">Network 1 <Dot /></template>
  </IndexSection>
  <IndexSection :show="showSection('spaces')">
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
  <IndexSection :show="showSection('devices')">
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

export default {
  components: {
    MeHeader,
    Dot,
    Plus,
    Tick,
    IndexSection
  },
  data: () => ({
    openSections: []
  }),
  methods: {
    showSection(name) {
     return this.openSections.includes(name)
    },
    toggleSection(name) {
      if(this.showSections(name)) {
        this.openSections = this.openSections.filter(n => n != name)
      } else {
        this.openSections.push(name)
      }
    }
  }
}
</script>
