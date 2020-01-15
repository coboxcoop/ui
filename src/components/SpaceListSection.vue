<template>
  <Section :show="show" @toggle="$emit('toggle')">
    <template slot="heading">Spaces <Plus /></template>
    <div v-if="showCreate">
      Hey Paul, what would you like your space to be called?
      <div><input type="text"><Plus /></div>
    </div>
    <Section v-for="space in spaces" :key="space.id" :show="showSection(space.name)" @toggle="toggleSection(space.name)">
      <template slot="heading"><Tick /> {{space.name}} {{space.members.length}} <Plus /></template>
      <div>
        <div v-for="member in space.members" :key="member.id">{{member.name}} <Dot /></div>
      </div>
    </Section>
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
