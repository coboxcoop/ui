<template>
<Section :show="show" @toggle="$emit('toggle')">
  <template slot="heading">Devices
    <Plus @click.stop.native="showCreate = true" />
  </template>
  <div v-if="showCreate">
    <p>Hey {{$store.state.me.name}}, what would you like your device to be called?</p>
    <form @submit.prevent="onSubmitCreateDevice">
      <input v-model="newDeviceName" type="text" />
      <button type="submit">Ok</button>
    </form>
  </div>
  <DeviceSection
    v-for="device in $store.state.devices"
    @toggle="toggleSection(device.name)"
    @open="open => openSection(device.name, open)"
    :key="device.id"
    :show="showSection(device.name)"
    :device="device" />
</Section>
</template>

<script>
import Section from '@/components/Section.vue'
import DeviceSection from '@/components/DeviceSection.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'

export default {
  components: {
    Dot,
    Plus,
    Tick,
    Section,
    DeviceSection
  },
  props: {
    show: Boolean
  },
  data: () => ({
    openSections: [],
    showCreate: false,
    newDeviceName: ''
  }),
  methods: {
    onSubmitCreateDevice() {
      this.$store.dispatch('createDevice', this.newDeviceName)
      this.newDeviceName = ''
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
