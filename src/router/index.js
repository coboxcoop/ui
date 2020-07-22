import Vue from 'vue'
import VueRouter from 'vue-router'

import ProfileView                      from '@/views/ProfileView.vue'
import SpacesView                       from '@/views/spaces/SpacesView.vue'
import SpacesInitView                   from '@/views/spaces/SpacesInitView.vue'
import SpacesJoinView                   from '@/views/spaces/SpacesJoinView.vue'
import SpacesCreateView                 from '@/views/spaces/SpacesCreateView.vue'
import SpaceSingleView                  from '@/views/spaces/SpaceSingleView.vue'
import SeedersView                      from '@/views/settings/admin/SeedersView.vue'
import SeedersJoinView                  from '@/views/settings/admin/SeedersJoinView.vue'
import SeederSingleView                 from '@/views/settings/admin/SeederSingleView.vue'
import ExportView                       from '@/views/settings/ExportView.vue'
import ImportView                       from '@/views/settings/ImportView.vue'
import SettingsView                     from '@/views/settings/SettingsView.vue'
import ManageKeysView                   from '@/views/settings/ManageKeysView.vue'
import AppearanceView                   from '@/views/settings/AppearanceView.vue'
import AdvancedView                     from '@/views/settings/AdvancedView.vue'
import OptionsView                      from '@/views/settings/OptionsView.vue'
import AcknowledgmentView               from '@/views/settings/AcknowledgmentView.vue'
import AcknowledgmentOfCountryView      from '@/views/settings/AcknowledgmentOfCountryView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',                                name: 'spaces',                          component: SpacesView},
  {path: '/spaces/init',                     name: 'spaces-init',                     component: SpacesInitView},
  {path: '/spaces/join',                     name: 'spaces-join',                     component: SpacesJoinView},
  {path: '/spaces/create',                   name: 'spaces-create',                   component: SpacesCreateView},
  {path: '/spaces/:address',                 name: 'space',                           component: SpaceSingleView},
  {path: '/profile',                         name: 'profile',                         component: ProfileView},
  {path: '/settings',                        name: 'settings',                        component: SettingsView},
  {path: '/settings/appearance',             name: 'appearance',                      component: AppearanceView},
  {path: '/settings/acknowledgment',         name: 'acknowledgment',                  component: AcknowledgmentView},
  {path: '/settings/acknowledgment/country', name: 'acknowledgment-of-country',       component: AcknowledgmentOfCountryView},
  {path: '/settings/advanced',               name: 'advanced',                        component: AdvancedView},
  {path: '/settings/options',                name: 'options',                         component: OptionsView},
  {path: '/settings/keys',                   name: 'manage-keys',                     component: ManageKeysView},
  {path: '/settings/keys/export',            name: 'secrets-export',                  component: ExportView},
  {path: '/settings/keys/import',            name: 'secrets-import',                 component: ImportView},
  {path: '/settings/admin/seeders',          name: 'seeders',                         component: SeedersView},
  {path: '/settings/admin/seeders/join',     name: 'seeders-join',                    component: SeedersJoinView},
  {path: '/settings/admin/seeders/:address', name: 'seeder',                          component: SeederSingleView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
