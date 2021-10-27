<template>
<Screen 
    :back="{name: 'space-health', params: {address: space.address}}"
    v-if="space" 
    v-shortkey="['ctrl', 'p']" 
    @shortkey.native="navigate({name: 'space-health'})">

  <template v-slot:header>
    <div class="header">
      <div>
          Folder > {{space.name}} > Health Settings
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

  <NavList>
    <form @submit.prevent="submitSettings">

        <label>Threshold:</label>
        <select v-model="threshold" class="selected">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        </select>
        <label>backups</label>
        <p class="description">Minimum number of backups</p>
    <br />
      <label>Tolerance:</label>
        <select v-model="tolerance" class="selected">
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
        <option>5</option>
        <option>6</option>
        </select>
        <label>days</label>
      <p class="description">Max days between backups</p>
    </form>
    </NavList>
    <br>
        <!-- TODO: connect submit.prevent functionality to this button -->
    <button class="button" type="submit">Save new settings</button>
 <br />
</Screen>
</template>

<style lang="scss" scoped>
.settings small {
  display: block;
  margin: 0.6rem 0;
}
.header {
  display: flex;
  justify-content: space-between;
}
// fix this shade of black
.selected {
  position: relative;
  width: 1.8em;
  text-align: center;
  background-color: #0a0a0a;
  color: #fff;
  outline-width: 57px;
  height: 1.8em;
  line-height: 2em;
}
.description {
  display: block;
  font-size: 1.6rem;
  margin-bottom: 0em;
  padding: 0.2rem 0 0 0;
  text-align: right;
}
.button {
  margin-top: auto;
  width: 100%;
}
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import UserIcon     from '@/components/UserIcon.vue'
import {api}        from '@/api'

export default {
  components: {
    UserIcon,
    Screen,
    NavList,
  },
  data: () => ({
    publicKey: '',
    inviteCode: '',
    threshold: '',
    tolerance: ''
  }),
  computed: {
    space() {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    stat() {
      return this.$store.getters['spaces/stat'](this.space.address)
    },
    info() {
      return this.$store.state.system.info
    },
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    async toggleMount() {
      if(this.mounted) {
        await this.unmountFolder()
      } else {
        await this.mountFolder()
      }
    },
    // DRAFT function - bind threshold & tolerance to select drop-down inputs
    async submitSettings() {
      const {space: {address}, threshold, tolerance} = this
      try {
        const data = await this.$store.dispatch('spaces/updateSettings', {address, threshold, tolerance})
      } catch(e) {
        this.$store.dispatch('error/handle', e)
      }
    },
  }
}
</script>
