import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '@/views/HomeView.vue'
import NetworkView from '@/views/NetworkView.vue'
import GroupsView from '@/views/GroupsView.vue'
import GroupsInitView from '@/views/GroupsInitView.vue'
import GroupsJoinView from '@/views/GroupsJoinView.vue'
import GroupsCreateView from '@/views/GroupsCreateView.vue'
import DevicesView from '@/views/DevicesView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',              name: 'home',          component: HomeView},
  {path: '/network',       name: 'network',       component: NetworkView},
  {path: '/groups',        name: 'groups',        component: GroupsView},
  {path: '/groups/init',   name: 'groups-init',   component: GroupsInitView},
  {path: '/groups/join',   name: 'groups-join',   component: GroupsJoinView},
  {path: '/groups/create', name: 'groups-create', component: GroupsCreateView},
  {path: '/devices',       name: 'devices',       component: DevicesView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})