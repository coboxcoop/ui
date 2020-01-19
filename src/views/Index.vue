<template>
<div>
  <MeHeader />
  <Section :show="showSection('network')" @toggle="toggleSection('network')">
    <template slot="heading">Network 1 <Dot /></template>
  </Section>
  <SpaceListSection
    :show="showSection('spaces')"
    @toggle="toggleSection('spaces')" />
  <DeviceListSection
    :show="showSection('devices')"
    @toggle="toggleSection('devices')" />
</div>
</template>

<script>
import MeHeader from '@/components/MeHeader.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'
import Section from '@/components/Section.vue'
import SpaceListSection from '@/components/SpaceListSection.vue'
import DeviceListSection from '@/components/DeviceListSection.vue'

export default {
  components: {
    MeHeader,
    Dot,
    Plus,
    Tick,
    Section,
    SpaceListSection,
    DeviceListSection
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
