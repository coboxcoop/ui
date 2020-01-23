<template>
<Section :show="show" @toggle="onToggleSection">
  <template slot="heading">
    <div>
      <Tick /> {{group.name}} <sup>{{0}}</sup>
    </div>
    <Plus @click.native.stop="onClickPlus" />
  </template>
  <div v-if="showAdd">
    <p>Who are you adding to {{group.name}}?</p>
    <form @submit.prevent="onSubmit">
      <input v-model="peerKeyToAdd" type="text" placeholder="Peers Key" />
      <button type="submit">Ok</button>
    </form>
  </div>
  <div>
    <div class="group-member">{{$store.state.me.name}} <Dot /></div>
    <div class="group-member" v-for="member in []" :key="member.id">{{member.name}} <Dot /></div>
  </div>
</Section>
</template>

<style scoped lang="scss">
.group-member {
  display: flex;
  justify-content: space-between;
}
</style>

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
    group: Object
  },
  data: () => ({
    showAdd: false,
    peerKeyToAdd: ''
  }),
  methods: {
    onSubmitSpaceKey() {
      this.$store.dispatch('joinSpace', this.spaceKeyToJoin)
      this.spaceKeyToJoin = ''
      // this.showAdd = false
    },
    onSubmit() {
      this.$store.dispatch('addPeerToSpace', {id: this.space.id, peerKey: this.peerKeyToAdd})
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
