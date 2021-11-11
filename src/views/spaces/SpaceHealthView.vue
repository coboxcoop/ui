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
          <small>Status: {{ status }}</small>
          <small>Threshold: {{ thresholdString }}</small>
          <small>Tolerance: {{ toleranceString }}</small>
        </div>
        <RouterLink :to="{name: 'space-settings'}" v-shortkey="['ctrl', 't']" @shortkey.native="navigate({name: 'space-settings'})"><HealthIcon :colour="colour" /></RouterLink>
      </div>
      <div class="section">
        <div style="margin: 2rem 0 1rem 2rem;">
          <Fraction
            v-bind:numerator="syncedSeeders"
            v-bind:denominator="seederCount" />
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
        <ChevronDownIcon v-if="this.sortDirection==='desc'"/>
      </div>
    </div>
    <NavList>
      <div v-for="peer in sortedPeers" :key="peer.data.author">
          <UserIcon :address="peer.data.author" /> {{peer.data.content.name}}
          <WifiIcon v-if="peer.data.online" />
          <br />
          <div class="last-sync">{{ lastSyncString(peer) }}</div>
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
  display: block;
  font-size: 1.6rem;
  margin-bottom: 0em;
  padding: 0.2rem 0 0 0;
  text-align: right;
}
.offset {
  margin: 1rem 0 0 1rem;
}
.wifi {
  position: absolute;
  right: 0;
}
</style>

<script>
import Screen           from '@/components/Screen.vue'
import NavList          from '@/components/NavList.vue'
import Fraction         from '@/components/Fraction.vue'
import HealthIcon       from '@/components/HealthIcon.vue'
import CopyKey          from '@/components/CopyKey.vue'
import UserIcon         from '@/components/UserIcon.vue'
import {api}            from '@/api'
import ChevronUpIcon    from '@/components/ChevronUp.vue'
import ChevronDownIcon  from '@/components/ChevronDown.vue'
import WifiIcon         from '@/components/WifiIcon.vue'

export default {
  components: {
    Screen,
    NavList,
    CopyKey,
    Fraction,
    HealthIcon,
    UserIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    WifiIcon
  },
  data () {
    return {
      sortDirection: 'desc',
      sorted: [],
      colour: 'white'
    }
  },
  computed: {
    seederCount () {
      const count = this.$store.getters['spaces/peerCount'](this.space.address)
      return count
    },
    seederCountString () {
      const count = this.$store.getters['spaces/peerCount'](this.space.address)
      return `${count} seeder${count != 1 ? 's' : ''}`
    },
    toleranceString() {
      const {tolerance} = this.$store.getters['spaces/settings'](this.space.address)
      return `${tolerance || 0} day${tolerance != 1 ? 's' : ''}`
    },
    thresholdString () {
      const {threshold} = this.$store.getters['spaces/settings'](this.space.address)
      return `${threshold || 0} backup${threshold != 1 ? 's' : ''}`
    },
    lastSyncString (peer) {
      return peer => {
        if (peer.data.lastSyncAt) {
          // Vanilla javascript is DEEPLY upsetting when it comes to rendering a 24 hour clock
          const date = new Date(peer.data.lastSyncAt)
          const hour = date.getHours() >= 10 ? date.getHours() : `0${date.getHours()}`
          const minute = date.getMinutes() >= 10 ? date.getMinutes() : `0${date.getMinutes()}`
          const day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
          const month = date.getMonth()+1
          const monthzero = month >= 10 ? month : `0${month}`
          const year = date.getFullYear().toString().slice(2, 4)
          return `last sync'd at ${hour}:${minute} on ${day}/${monthzero}/${year}`
        }
      }
    },
    syncedSeeders () {
      let peers = this.$store.getters['spaces/peers'](this.space.address)
      const me = this.$store.getters['profile/myPublicKey']
      const {tolerance} = this.$store.getters['spaces/settings'](this.space.address)
      const limit = Date.now() - (tolerance * 86400000)
      if (peers) {
        peers = peers.filter(peer => peer.data.author !== me)
        peers = peers.filter(peer => peer.data.lastSyncAt > limit)
        return peers.length
      }
    },
    status () {
      let syncd = this.syncedSeeders
      let seeders = this.seederCount
      if (syncd >= seeders) { 
        this.colour = 'green'
        return "Healthy"
      } else if (syncd >= seeders/2) { 
        this.colour = 'amber'
        return "OK"
      } else if (syncd < seeders/2) { 
        this.colour = 'red'
        return "At risk"
      } else { 
        this.colour = 'white'
        return 'Unknown'
      }
    },
    space () {
      return this.$store.getters['spaces/single'](this.$route.params.address)
    },
    stat () {
      return this.$store.getters['spaces/stat'](this.space.address)
    },

    sortedPeers () {
      let peers = this.$store.getters['spaces/peers'](this.space.address)
      let me = this.$store.getters['profile/myPublicKey']
      if (peers) {
        peers = peers.filter(peer => peer.data.author !== me)
        this.sorted = peers.sort((a, b) => a.data.lastSyncAt - b.data.lastSyncAt)
        if (this.sortDirection === 'desc') {
          return this.sorted
        } else return this.sorted.reverse()
      }
      return this.sorted
    },
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    sort () {
      this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
    }
  }
}
</script>
