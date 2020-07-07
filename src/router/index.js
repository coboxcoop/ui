import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView         from '@/views/HomeView.vue'
import NetworkView      from '@/views/NetworkView.vue'
import SpacesView       from '@/views/SpacesView.vue'
import SpacesInitView   from '@/views/SpacesInitView.vue'
import SpacesJoinView   from '@/views/SpacesJoinView.vue'
import SpacesCreateView from '@/views/SpacesCreateView.vue'
import SpaceSingleView  from '@/views/SpaceSingleView.vue'
import SeedersView      from '@/views/admin/SeedersView.vue'
import SeedersInitView  from '@/views/admin/SeedersInitView.vue'
import SeedersJoinView  from '@/views/admin/SeedersJoinView.vue'
import SeedersSetupView from '@/views/admin/SeedersSetupView.vue'
import SeederSingleView from '@/views/admin/SeederSingleView.vue'
import BackupView       from '@/views/BackupView.vue'
import ProfileView      from '@/views/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',                           name: 'home',                component: HomeView},
  {path: '/network',                    name: 'network',             component: NetworkView},
  {path: '/spaces',                     name: 'spaces',              component: SpacesView},
  {path: '/spaces/init',                name: 'spaces-init',         component: SpacesInitView},
  {path: '/spaces/join',                name: 'spaces-join',         component: SpacesJoinView},
  {path: '/spaces/create',              name: 'spaces-create',       component: SpacesCreateView},
  {path: '/spaces/:address',            name: 'space',               component: SpaceSingleView},
  {path: '/admin/seeders',              name: 'admin-seeders',       component: SeedersView},
  {path: '/admin/seeders/init',         name: 'admin-seeders-init',  component: SeedersInitView},
  {path: '/admin/seeders/join',         name: 'admin-seeders-join',  component: SeedersJoinView},
  {path: '/admin/seeders/setup',        name: 'admin-seeders-setup', component: SeedersSetupView},
  {path: '/admin/seeders/:address',     name: 'admin-seeder',        component: SeederSingleView},
  {path: '/backup',                     name: 'backup',              component: BackupView},
  {path: '/profile',                    name: 'profile',             component: ProfileView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
