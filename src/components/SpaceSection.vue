<template>
<Section :show="show" @toggle="$emit('toggle')">
  <template slot="heading"><Tick /> {{space.name}} {{space.members.length}} <Plus @click.native.stop="onClickPlus" /></template>
  <div v-if="showAdd"> 
    <p>What is the name of the person that you want to add?</p>
    <form @submit.prevent="onSubmit"><input type="text" v-model="peerKeyToAdd" /><button type="submit">Ok</button></form>
  </div>
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
  },
  data: () => ({
    showAdd: false,
    peerKeyToAdd: ''
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch('addPeerToSpace', {id: this.space.id, peerKey: this.peerKeyToAdd})
      this.peerKeyToAdd = ''
    },
    onClickPlus() {
      this.showAdd = true
      this.$emit('open', true)
    }
  }
}
</script>
