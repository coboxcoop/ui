<template>
  <Screen
    :back="{name: 'space', params: {address: space.address}}"
    v-if="space"
    v-shortkey="['ctrl', 'p']"
    @shortkey.native="navigate({name: 'profile'})">

    <template v-slot:header>
      <div class="header">
        <div>
          Folder > {{space.name}} > Health
        </div>
        <div class="stat">{{stat.size | bytes}}</div>
      </div>
    </template>

    <div style="height: 0.4rem"></div>

    <span>Summary</span>
    <div class="summary">
      <div class="section">
        <div class="settings">
          <small>Status: {{ space.status || 'Unknown' }}</small>
          <small>Threshold: {{ thresholdString }}</small>
          <small>Tolerance: {{ toleranceString }}</small>
        </div>
        <HealthIcon color="healthColour" />
      </div>
      <div class="section">
        <div style="margin: 2rem 0 1rem 2rem;">
          <Fraction
            v-bind:numerator="space.syncedSeeders"
            v-bind:denominator="space.seederCount" />
        </div>
        <div style="margin: 2rem 5rem 0 0;">
          <p style="font-size: 12pt">
            seeders have sync'd<br>
            within the last {{ toleranceString }}
          </p>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between">
      <h2>{{seederCountString}}</h2>
      <div @click="sort" style="margin-bottom: -3rem;">
        <span class="sync-order">order by sync</span>
        <ChevronUpIcon v-if="this.sortDirection==='asc'"/>
        <ChevronDownIcon v-if="this.sortDirection!=='asc'"/>
      </div>
    </div>
    <NavList>
      <!-- TODO: peers here must be the list of seeders from lastSync! -->
      <div v-for="peer in sortedPeers" :key="peer.publicKey">
          <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
          <p class="last-sync">{{ lastSyncString(peer) }}</p>
        </div>
      </div>
      </NavList>
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
.summary {
  margin-top: 0.6rem;
  border-top: 1px solid var(--fg);
  padding: 0.6rem 0;
  position: relative;
}
.section {
  display: flex;
  justify-content: space-between;
}
.sync-order {
  font-size: 10pt;
  display: inline-block;
  vertical-align: top;
  margin-top: 0.5rem;
  margin-right: 0rem;
}
.sort-order {
  font-size: 36pt;
  vertical-align: top;
  cursor: pointer;
}
.last-sync {
  font-size: 10pt;
  display: block;
  padding: 0.2rem 0 0 0;
  margin-bottom: 0em;
  text-align: right;
}
.offset {
  margin: 1rem 0 0 1rem;
}
</style>

<script>
import Screen from '@/components/Screen.vue'
import NavList from '@/components/NavList.vue'
import Fraction from '@/components/Fraction.vue'
import HealthIcon from '@/components/HealthIcon.vue'
import CopyKey from '@/components/CopyKey.vue'
import UserIcon from '@/components/UserIcon.vue'
import {api} from '@/api'
import ChevronUpIcon from '@/components/ChevronUp.vue'
import ChevronDownIcon from '@/components/ChevronDown.vue'

export default {
  components: {
    Screen,
    NavList,
    CopyKey,
    Fraction,
    HealthIcon,
    UserIcon,
    ChevronUpIcon,
    ChevronDownIcon
  },
  data () {
    return {
      sortDirection: 'asc'
    }
  },
  computed: {
    seederCountString () {
      const count = this.$store.getters['spaces/seederCount'](this.space.address)
      return `${count} seeder${count != 1 ? 's' : ''}`
    },
    toleranceString() {
      const space = this.space
      return `${space.tolerance || 0} day${space.tolerance != 1 ? 's' : ''}`
    },
    thresholdString () {
      const space = this.space
      return `${space.threshold || 0} backup${space.threshold != 1 ? 's' : ''}`
    },
    sortOrderString () {
      return this.sortDirection === 'asc' ? String.fromCodePoint(0x02C7) : String.fromCodePoint(0x02C6)
    },
    lastSyncString (peer) {
      return peer => {
        // Vanilla javascript is DEEPLY upsetting when it comes to rendering a 24 hour clock
        const date = new Date(peer.lastSyncAt || Date.now())
        const hour = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`
        const minute = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`
        const day = date.getDay() > 10 ? date.getDay() : `0${date.getDay()}`
        const month = date.getMonth() > 10 ? date.getMonth() : `0${date.getMonth()}`
        const year = date.getFullYear().toString().slice(2, 4)
        return `last sync'd at ${hour}:${minute} on ${day}/${month}/${year}`
      }
    },
    space () {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    stat () {
      return this.$store.getters['spaces/stat'](this.space.address)
    },
    sortedPeers () {
      const peers = this.$store
        .getters['spaces/peers'](this.space.address) || []

      return peers.sort((a, b) => a.lastSyncAt > b.lastSyncAt ? 1 : -1)
    }
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    sort () {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc'
    }
  }
}
</script>
