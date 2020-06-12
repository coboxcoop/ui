<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>
    Network <sup>{{$store.getters['network/count']}}</sup>
  </template>
  <div class="container" ref="container">
    <svg class="network" :width="width" :height="height" />
  </div>
  <div class="footer">
  </div>
</Screen>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
}
.network {
  position: absolute;
  top: 53%; left: 50%;
  transform: translate(-50%, -50%);
}
.footer {
  position: absolute;
  bottom: 0; left: 0;
  font-size: var(--small);
  margin: 1.6rem;
  margin-bottom: 1.2rem;
}
</style>

<script>
import * as d3 from 'd3'
import crypto from 'crypto'
import Screen from '@/components/Screen.vue'
import uniq from 'lodash/uniq'

function fakeKey() {
  return crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex')
}

export default {
  components: {
    Screen
  },
  data: () => ({
    width: 0,
    height: 0
  }),
  computed: {
    network() {
      return this.$store.state.network
    },
    nodes() {
      const spaces = Object.keys(this.network.spaces).map(k => parseInt(k))

      return uniq(
        Object.values(this.network.spaces)
          .flatMap(g => g.members)
          .concat(spaces)
      ).map(n => {
        const key = fakeKey()
        const color = this.$store.getters['profile/keyColor'](key)
        return {
          id: n,
          color
        }
      })
    },
    links() {
      const {network} = this

      return Object.keys(network.spaces).map(n => parseInt(n))
        .flatMap(gid => {
          const {members} = network.spaces[gid]

          return members.map(mid => {
            return {source: mid, target: gid}
          })
        })
    }
  },
  methods: {
    measure() {
      const $container = this.$refs.container
      const rect = $container.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    },
  },
  mounted() {
    this.measure()

    const links = this.links.map(d => Object.create(d))
    const nodes = this.nodes.map(d => Object.create(d))

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))

    const svg = d3.select('.network')
        .attr('viewBox', [0, 0, this.width, this.height])

    const link = svg.append('g')
        .attr('stroke', '#bbb')
        .attr('stroke-width', 1.5)
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg.append('g')
        .attr('stroke', 'var(--bg)')
        .attr('stroke-width', 4)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
        .attr('r', 6)
        .attr('fill', d => d.color)
        .call(d3.drag(simulation))

    simulation.on('tick', () => {
      link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y)

      node
          .attr('cx', d => d.x)
          .attr('cy', d => d.y)
    })
  }
}
</script>
