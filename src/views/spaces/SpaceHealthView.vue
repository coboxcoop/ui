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
            v-bind:numerator="syncedSeederPeers.length"
            v-bind:denominator="seederPeerCount" />
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
      <h2>{{seederPeerCountString}}</h2>
      <div @click="sort" style="margin-bottom: -3rem;">
        <span class="sync-order">order by sync</span>
        <ChevronUpIcon v-if="this.sortDirection===1"/>
        <ChevronDownIcon v-if="this.sortDirection===-1"/>
      </div>
    </div>
    <NavList>
      <div v-for="seederPeer in sortedSeederPeers" :key="seederPeer.peerId">
          <UserIcon :address="seederPeer.peerId" /> {{seederPeer.content && seederPeer.content.name ? seederPeer.content.name : seederPeer.peerId.slice(0,8)}}
          <WifiIcon v-if="seederPeer.online" />
          <br />
          <div class="last-sync">{{ lastSyncString(seederPeer) }}</div>
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
import {formatTimestamp}from '@/utils'

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
      sortDirection: 1,
      sorted: [],
      colour: 'white'
    }
  },
  computed: {
    // TODO: in future using mapToGetters would remove this kind of code entirely
    // we only then need to define the relevant getters and make them available using
    // mapToGetters, so many computed properties can be refactored into getters
    seederPeerCount () {
      const count = this.$store.getters['spaces/seederPeerCount'](this.space.address)
      return count
    },
    seederPeerCountString () {
      const count = this.$store.getters['spaces/seederPeerCount'](this.space.address)
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
    lastSyncString (seederPeer) {
      return seederPeer => {
        if (seederPeer.lastSyncAt) {
          const timestamp = formatTimestamp(seederPeer.lastSyncAt)
          return `last sync'd at ${timestamp}`
        }
        else return `never sync'd`
      }
    },
    seederPeers () {
      // fetch all space/last-sync messages for this address
      const seeders = this.$store.getters['spaces/seederPeers'](this.space.address)
      // fetch all peer/about messages for this address
      const spacePeers = this.$store.getters['spaces/peers'](this.space.address)
      // create a new object to return
      const merged = {}
      // first we iterate over all those we know have a name
      // there will be less of these and will blend with existing record if exists
      for (const [peerId, peer] of Object.entries(spacePeers)) {
        const seeder = seeders[peerId]
        if (seeder) {
          merged[peerId] = Object.assign({}, seeders[peerId], peer)
        } else {
          merged[peerId] = peer
        }
      }
      // then we iterate only those we haven't seen, (we continue if it exists)
      for (const [peerId, seeder] of Object.entries(seeders)) {
        if (merged[peerId]) continue
        merged[peerId] = seeder
      }
      return merged
    },
    syncedSeederPeers () {
      // sync'ed seeder peers does not contain peer/about messages
      // this is only peer's we've actually met!
      const seederPeers = this.$store.getters['spaces/seederPeers'](this.space.address) || {}
      const me = this.$store.getters['profile/myPublicKey']
      const {tolerance} = this.$store.getters['spaces/settings'](this.space.address)
      const limit = Date.now() - (tolerance * 86400000)
      const synced = []
      for (const [peerId, peer] of Object.entries(seederPeers)) {
        if (peerId === me) continue
        if (peer.lastSyncAt > limit) {
          synced.push(peer)
        }
      }
      return synced
    },
    status () {
      let syncd = this.syncedSeederPeers.length
      let seederPeers = this.seederPeerCount
      if (seederPeers < 1) {
        this.colour = 'red'
        return "At risk"
      } else if (syncd >= seederPeers) {
        this.colour = 'green'
        return "Healthy"
      } else if (syncd >= seederPeers/2) {
        this.colour = 'amber'
        return "OK"
      } else if (syncd < seederPeers/2) {
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
    sortedSeederPeers () {
      let me = this.$store.getters['profile/myPublicKey']
      const seeders = []
      for (const [peerId, peer] of Object.entries(this.seederPeers)) {
        if (peerId === me) continue
        const peerData = this.$store.getters['peer/byPublicKey']
        seeders.push({ ...peerData, ...peer })
      }
      return seeders.sort((a, b) => a.lastSyncAt < b.lastSyncAt ? this.sortDirection : -this.sortDirection)
    }
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    sort () {
      this.sortDirection = -this.sortDirection
    }
  }
}
</script>
