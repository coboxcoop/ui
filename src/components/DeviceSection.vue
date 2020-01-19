<template>
<Section :show="show" @toggle="onToggleSection">
  <template slot="heading">
    <Tick /> {{device.name}} {{device.members.length + 1}}
    <Plus @click.native.stop="onClickPlus" />
  </template>
  <div v-if="showAdd">
    <p>Who are you adding to {{device.name}}?</p>
    <form @submit.prevent="onSubmit">
      <input v-model="peerKeyToAdd" type="text" placeholder="Peers Key" />
      <button type="submit">Ok</button>
    </form>
  </div>
  <div>
    <div>{{$store.state.me.name}} <Dot /></div>
    <div v-for="member in device.members" :key="member.id">{{member.name}} <Dot /></div>
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
    device: Object
  },
  data: () => ({
    showAdd: false,
    peerKeyToAdd: ''
  }),
  methods: {
    onSubmit() {
      this.$store.dispatch('addPeerToDevice', {id: this.device.id, peerKey: this.peerKeyToAdd})
      this.peerKeyToAdd = ''
      // this.showAdd = false
    },
    onClickPlus() {
      if(this.show) {
        this.showAdd = !this.showAdd
      } else {
        this.showAdd = true
        this.$emit('open', true)
      }
    },
    onToggleSection() {
      this.$emit('toggle')
      if(!this.show) {
        this.showAdd = false
      }
    }
  }
}
</script>
