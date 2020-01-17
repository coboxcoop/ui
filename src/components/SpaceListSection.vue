<template>
  <Section :show="show" @toggle="$emit('toggle')">
    <template slot="heading">Spaces 
      <Plus @click.stop.native="showCreate = true" />
    </template>
    <div v-if="showCreate">
      <p>Hey {{$store.state.me.name}}, what would you like your space to be called?</p>
      <form @submit.prevent="onSubmitCreateSpace">
        <input v-model="newSpaceName" type="text" />
        <button type="submit">Ok</button>
      </form>
    </div>
    <SpaceSection 
      v-for="space in $store.state.spaces" 
      @toggle="toggleSection(space.name)" 
      @open="open => openSection(space.name, open)" 
      :key="space.id" 
      :show="showSection(space.name)" 
      :space="space" />
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
  data: () => ({
    openSections: [],
    showCreate: false,
    newSpaceName: ''
  }),
  methods: {
    onSubmitCreateSpace() {
      this.$store.dispatch('createSpace', this.newSpaceName)
      this.newSpaceName = ''
      this.showCreate = false
    },
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
  }
}
</script>
