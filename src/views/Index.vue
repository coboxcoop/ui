<template>
<div>
  <MeHeader />
  <Section :show="showSection('network')" @toggle="toggleSection('network')">
    <template slot="heading">
      <div>Network <sup>1</sup></div>
      <Dot />
    </template>
  </Section>
  <GroupListSection
    :show="showSection('spaces')"
    @toggle="toggleSection('spaces')" />
  <DeviceListSection
    :show="showSection('devices')"
    @toggle="toggleSection('devices')" />
  <ProfileModal
    v-if="$store.state.showProfileModal" />
</div>
</template>

<script>
import MeHeader from '@/components/MeHeader.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'
import Section from '@/components/Section.vue'
import GroupListSection from '@/components/GroupListSection.vue'
import DeviceListSection from '@/components/DeviceListSection.vue'
import ProfileModal from '@/components/ProfileModal.vue'

export default {
  components: {
    MeHeader,
    Dot,
    Plus,
    Tick,
    Section,
    GroupListSection,
    DeviceListSection,
    ProfileModal
  },
  data: () => ({
    openSections: []
  }),
  methods: {
    showSection(name) {
     return this.openSections.includes(name)
    },
    toggleSection(name) {
      if(this.showSection(name)) {
        this.openSections = this.openSections.filter(n => n != name)
      } else {
        this.openSections.push(name)
      }
    }
  }
}
</script>
