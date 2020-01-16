<template>
  <Section :show="show" @toggle="$emit('toggle')">
    <template slot="heading">Spaces <Plus /></template>
    <div v-if="showCreate">
      Hey Paul, what would you like your space to be called?
      <div><input type="text"><Plus /></div>
    </div>
    <SpaceSection v-for="space in $store.state.spaces" :key="space.id" :show="showSection(space.name)" @toggle="toggleSection(space.name)" @open="open => openSection(space.name, open)" :space="space" />
  </Section>
</template>

<script>
import Section from '@/components/Section.vue'
import SpaceSection from '@/components/SpaceSection.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'

export default {
  components: {
    Dot,
    Plus,
    Tick,
    Section,
    SpaceSection
  },
  props: {
    show: Boolean
  },
  methods: {
    showSection(name) {
     return this.openSections.includes(name)
    },
    toggleSection(name) {
      console.log(name)
      if(this.showSection(name)) {
        this.openSection(name, false)
      } else {
        this.openSection(name, true)
      }
    },
    openSection(name, open) {
      if(open) {
        this.openSections.push(name)
      } else {
        this.openSections = this.openSections.filter(n => n != name)
      }
    }
  },
  data: () => ({
    openSections: [],
    showCreate: false,
  })
}
</script>
