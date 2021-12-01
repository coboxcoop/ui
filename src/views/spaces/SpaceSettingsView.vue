<template>
<Screen 
    :back="{name: 'space', params: {address: space.address}}"
    v-if="space"
    v-shortkey="['ctrl', 'p']"
    @shortkey.native="navigate({name: 'profile'})">

  <template v-slot:header>
    <div class="header">
      <div>
          Folder > {{space.name}} > Settings
      </div>
      <div class="stat">{{stat.size | bytes}}</div>
    </div>
  </template>

    <div class="settings">
      <form class="form" @submit.prevent="onSave">
        <p class="title">Threshold:</p>
        <div class="line">
          <span><input v-model.number="threshold" type="text" placeholder="no." ref="thresholdInput" @focus="editThreshold = true" @change="onSave()"/></span>
          <span class="blind"><img src="@/assets/images/icons/edit.svg" /> {{threshold}} <img src="@/assets/images/icons/edit.svg" /></span>
          <span class="type">{{backupString(this.threshold)}}</span>
        </div>
        <p class="description">Min. number of backups; each peer or seeder count as one backup. You cannot choose a threshold that is higher than the number of seeders seeing your space. You currently have {{ seederString(this.seeders )}}</p>
      </form>
      <br />
      <form class="form" @submit.prevent="onSave">
        <p class="title">Tolerance:</p>
        <div class="line">
          <span><input v-model.number="tolerance" type="text" placeholder="no." ref="toleranceInput" @focus="editTolerance = true" @change="onSave()"/></span>
          <span class="blind"><img src="@/assets/images/icons/edit.svg" /> {{tolerance}} <img src="@/assets/images/icons/edit.svg" /></span>
          <span class="type">{{daysString(this.tolerance)}}</span>
        </div>
        <p class="description">Max. number of days since last backup</p>
      </form>
    </div>

 <br />
</Screen>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
}
.settings {
  display: inline-block;
  text-align: left;
}
form {
  margin-top: 2rem;
  display: inline-block;
  position: relative;
  &:hover .blind img:last-of-type {
    visibility: visible;
  }
  input {
    border-bottom: transparent;
  }
}
.title {
  font-size: 1em;
  margin-bottom: 0;
}
.line {
  display: flex;
  box-sizing: border-box;
}
input {
  display: inline-block;
  text-align: right;
  vertical-align: bottom;
  margin: 0.4rem;
  border: 1rem;
  width: 100%;
  &:focus + .blind, &:active + .blind {
    opacity: 0;
  }
}
.blind {
  color: transparent;
  pointer-events: none;
  margin: 0.4rem;
  border: 1rem;
  padding: 1rem;
  padding-right: 2rem;
  padding-left: 0;
  img {
    position: absolute;
    visibility: hidden;
    html.dark & {
      filter: invert(1);
    }
  }
}
.type {
  margin: 0.4rem;
  border: 1rem;
  padding: 0.6rem;
  width: 100%;
  text-align: left;
  vertical-align: bottom;
}
.description {
  display: block;
  width: 100%;
  font-size: 1.6rem;
  margin-bottom: 0em;
  padding: 0.2rem 0 0 0;
  text-align: left;
}
</style>

<script>
import Screen       from '@/components/Screen.vue'
import NavList      from '@/components/NavList.vue'
import UserIcon     from '@/components/UserIcon.vue'
import {api}        from '@/api'

export default {
  components: {
    Screen,
  },
  data: () => ({
    editThreshold: false,
    editTolerance: false,
    threshold: '',
    tolerance: '',
    seeders: ''
  }),
  mounted() {
    this.setValues()
  },
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
    seederString(seeders) {
      return seeders => {
        if (seeders) {
        return `${seeders} seeder${seeders != 1 ? 's.' : '.'}`
        }
      }
    },
    daysString(tolerance) {
      return tolerance => {
        return `day${tolerance != 1 ? 's' : ''}`
      }
    },
    backupString(threshold) {
      return threshold => {
        return `backup${threshold != 1 ? 's' : ''}`
      }
    }
  },
  methods: {
    navigate(to) {
      if (this.$store.state.settings.shortkey) {
        this.$router.push(to)
      }
    },
    setValues () {
      this.threshold = this.space.threshold
      this.tolerance = this.space.tolerance / 86400000
      this.seeders = this.$store.getters['spaces/seederCount'](this.space.address)

    },
    async onSave() {
      this.editThreshold = false
      this.editTolerance = false
      if (typeof this.threshold === "number"
          && this.threshold <= this.seeders
          && typeof this.tolerance === "number"
          ) {
        await this.$store.dispatch('spaces/changeSettings', {
          address: this.space.address,
          threshold: this.threshold,
          tolerance: this.tolerance
        })
      } else {
        this.setValues()
      }
    }
  }
}
</script>
