import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView         from '@/views/HomeView.vue'
import NetworkView      from '@/views/NetworkView.vue'
import GroupsView       from '@/views/GroupsView.vue'
import GroupsInitView   from '@/views/GroupsInitView.vue'
import GroupsJoinView   from '@/views/GroupsJoinView.vue'
import GroupsCreateView from '@/views/GroupsCreateView.vue'
import GroupSingleView  from '@/views/GroupSingleView.vue'
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
  {path: '/groups',                     name: 'groups',              component: GroupsView},
  {path: '/groups/init',                name: 'groups-init',         component: GroupsInitView},
  {path: '/groups/join',                name: 'groups-join',         component: GroupsJoinView},
  {path: '/groups/create',              name: 'groups-create',       component: GroupsCreateView},
  {path: '/groups/:address',            name: 'group',               component: GroupSingleView},
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
