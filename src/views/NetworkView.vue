<template>
<Screen :back="{name: 'home'}">
  <template v-slot:header>Network</template>
  <div class="container" ref="container">
    <svg class="network" :width="width" :height="height" />
  </div>
  <div class="footer">
    {{data.nodes.length}} nodes, {{data.links.length}} links
  </div>
</Screen>
</template>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
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

export default {
  components: {
    Screen
  },
  data: () => ({
    width: 0,
    height: 0,
    data: {nodes: [], links: []}
  }),
  methods: {
    measure() {
      const $container = this.$refs.container
      const rect = $container.getBoundingClientRect()
      this.width = rect.width
      this.height = rect.height
    },
    createData() {
      return {
        nodes: Array.from(new Array(24)).map((_, n) => {
          const address = crypto.createHash('sha256').update(crypto.randomBytes(32)).digest('hex')
          const color = this.$store.getters['profile/keyColor'](address)
          return ({id: n, address, color})
        }),
        links: [
          {source: 0, target: 1},
          {source: 0, target: 2},
          {source: 0, target: 3},
          {source: 0, target: 4},
          {source: 0, target: 5},

          {source: 1, target: 6},
          {source: 1, target: 7},
          {source: 1, target: 8},

          {source: 2, target: 9},
          {source: 2, target: 10},

          {source: 0, target: 11},
          {source: 12, target: 11},
          {source: 13, target: 12},
          {source: 12, target: 14},
          {source: 12, target: 15},
          {source: 12, target: 16},
          {source: 12, target: 17},
          {source: 12, target: 18},

          {source: 19, target: 20},
          {source: 21, target: 20}
        ]
      }
    }
  },
  mounted() {
    this.measure()
    this.data = this.createData()

    const data = this.data

    const links = data.links.map(d => Object.create(d))
    const nodes = data.nodes.map(d => Object.create(d))

    const simulation = d3.forceSimulation(nodes)
        .force('link', d3.forceLink(links).id(d => d.id))
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(this.width / 2, this.height / 2))

    const svg = d3.select('.network')
        .attr('viewBox', [0, 0, this.width, this.height])

    const link = svg.append('g')
        .attr('stroke', '#bbb')
      .selectAll('line')
      .data(links)
      .join('line')

    const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('stroke-width', 1.5)
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