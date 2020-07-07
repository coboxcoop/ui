import Vue from 'vue'
import VueRouter from 'vue-router'

import SpacesView       from '@/views/SpacesView.vue'
import SpacesInitView   from '@/views/SpacesInitView.vue'
import SpacesJoinView   from '@/views/SpacesJoinView.vue'
import SpacesCreateView from '@/views/SpacesCreateView.vue'
import SpaceSingleView  from '@/views/SpaceSingleView.vue'
import SeedersView      from '@/views/admin/SeedersView.vue'
import SeedersJoinView  from '@/views/admin/SeedersJoinView.vue'
import SeederSingleView from '@/views/admin/SeederSingleView.vue'
import BackupView       from '@/views/BackupView.vue'
import ProfileView      from '@/views/ProfileView.vue'
import SettingsView     from '@/views/SettingsView.vue'
import HomeView         from '@/views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',                       name: 'home',                component: HomeView},
  {path: '/spaces',                 name: 'spaces',              component: SpacesView},
  {path: '/spaces/init',            name: 'spaces-init',         component: SpacesInitView},
  {path: '/spaces/join',            name: 'spaces-join',         component: SpacesJoinView},
  {path: '/spaces/create',          name: 'spaces-create',       component: SpacesCreateView},
  {path: '/spaces/:address',        name: 'space',               component: SpaceSingleView},
  {path: '/admin/seeders',          name: 'admin-seeders',       component: SeedersView},
  {path: '/admin/seeders/join',     name: 'admin-seeders-join',  component: SeedersJoinView},
  {path: '/admin/seeders/:address', name: 'admin-seeder',        component: SeederSingleView},
  {path: '/backup',                 name: 'backup',              component: BackupView},
  {path: '/profile',                name: 'profile',             component: ProfileView},
  {path: '/settings',               name: 'settings',            component: SettingsView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
