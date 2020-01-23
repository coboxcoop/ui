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
    <div v-if="showCreate">
      <p>Or would you like to join a space?</p>
      <form @submit.prevent="onSubmitSpaceKey">
        <!-- <input v&#45;model="peerKeyToAdd" type="text" placeholder="Peers Key" /> -->
        <input v-model="spaceKeyToJoin" type="text" placeholder="Space address" />
        <button type="submit">Ok</button>
      </form>
    </div>
  </div>
  <GroupSection
    v-for="group in $store.state.groups"
    @toggle="toggleSection(group.address)"
    @open="open => openSection(group.address, open)"
    :key="group.address"
    :show="showSection(group.address)"
    :group="group" />
</Section>
</template>

<script>
import Section from '@/components/Section.vue'
import GroupSection from '@/components/GroupSection.vue'
import Dot from '@/components/Dot.vue'
import Plus from '@/components/Plus.vue'
import Tick from '@/components/Tick.vue'

export default {
  components: {
    Dot,
    Plus,
    Tick,
    Section,
    GroupSection
  },
  props: {
    show: Boolean
  },
  data: () => ({
    openSections: [],
    showCreate: false,
    newGroupName: '',
    groupAddressToJoin: ''
  }),
  methods: {
    onSubmitGroupAddress() {
      this.$store.dispatch('joinGroup', this.groupAddressToJoin)
      this.groupAddressToJoin = ''
      this.showCreate = false
    },
    onSubmitCreateGroup() {
      this.$store.dispatch('createGroup', this.newGroupName)
      this.newGroupName = ''
      this.showCreate = false
    },
    showSection(name) {
     return this.openSections.includes(name)
    },
    toggleSection(name) {
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
