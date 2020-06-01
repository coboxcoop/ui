import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView         from '@/views/HomeView.vue'
import NetworkView      from '@/views/NetworkView.vue'
import SpacesView       from '@/views/SpacesView.vue'
import SpacesInitView   from '@/views/SpacesInitView.vue'
import SpacesJoinView   from '@/views/SpacesJoinView.vue'
import SpacesCreateView from '@/views/SpacesCreateView.vue'
import SpaceSingleView  from '@/views/SpaceSingleView.vue'
import DevicesView      from '@/views/admin/DevicesView.vue'
import DevicesInitView  from '@/views/admin/DevicesInitView.vue'
import DevicesJoinView  from '@/views/admin/DevicesJoinView.vue'
import DevicesSetupView from '@/views/admin/DevicesSetupView.vue'
import DeviceSingleView from '@/views/admin/DeviceSingleView.vue'
import BackupView       from '@/views/BackupView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',                           name: 'home',                component: HomeView},
  {path: '/network',                    name: 'network',             component: NetworkView},
  {path: '/spaces',                     name: 'spaces',              component: SpacesView},
  {path: '/spaces/init',                name: 'spaces-init',         component: SpacesInitView},
  {path: '/spaces/join',                name: 'spaces-join',         component: SpacesJoinView},
  {path: '/spaces/create',              name: 'spaces-create',       component: SpacesCreateView},
  {path: '/spaces/:address',            name: 'space',               component: SpaceSingleView},
  {path: '/admin/devices',              name: 'admin-devices',       component: DevicesView},
  {path: '/admin/devices/init',         name: 'admin-devices-init',  component: DevicesInitView},
  {path: '/admin/devices/join',         name: 'admin-devices-join',  component: DevicesJoinView},
  {path: '/admin/devices/setup',        name: 'admin-devices-setup', component: DevicesSetupView},
  {path: '/admin/devices/:address',     name: 'admin-device',        component: DeviceSingleView},
  {path: '/backup',                     name: 'backup',              component: BackupView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
