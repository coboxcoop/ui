import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NetworkView from '@/views/NetworkView.vue'
import GroupsView from '@/views/GroupsView.vue'
import DevicesView from '@/views/DevicesView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',        name: 'home',    component: HomeView},
  {path: '/network', name: 'network', component: NetworkView},
  {path: '/groups',  name: 'groups',  component: GroupsView},
  {path: '/devices', name: 'devices', component: DevicesView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})