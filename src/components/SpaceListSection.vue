<template>
  <Section :show="show" @toggle="$emit('toggle')">
    <template slot="heading">Spaces <Plus /></template>
    <div v-if="showCreate">
      Hey Paul, what would you like your space to be called?
      <div><input type="text"><Plus /></div>
    </div>
    <SpaceSection v-for="space in spaces" :key="space.id" :show="showSection(space.name)" @toggle="toggleSection(space.name)" :space="space" />
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
        this.openSections = this.openSections.filter(n => n != name)
      } else {
        this.openSections.push(name)
      }
    }
  },
  data: () => ({
    openSections: [],
    showCreate: false,
    spaces: [{
      id: 0,
      name: 'public office',
      members: [{
        id: 0,
        name: 'dan'
      }, {
        id: 1,
        name: 'matt'
      },{
        id: 2,
        name: 'paul'
      }]
    }, {
      id: 1,
      name: 'magma collective',
      members: [{
        id: 0,
        name: 'daniel'
      }, {
        id: 1,
        name: 'jaya'
      }, {
        id: 2,
        name: 'mu'
      }]
    }]
  })
}
</script>
