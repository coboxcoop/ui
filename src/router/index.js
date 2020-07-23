import Vue from 'vue'
import VueRouter from 'vue-router'

import SpacesView                       from '@/views/spaces/SpacesView.vue'
import SpacesInitView                   from '@/views/spaces/SpacesInitView.vue'
import SpacesJoinView                   from '@/views/spaces/SpacesJoinView.vue'
import SpacesCreateView                 from '@/views/spaces/SpacesCreateView.vue'
import SpaceSingleView                  from '@/views/spaces/SpaceSingleView.vue'
import SpaceInviteCollaboratorView      from '@/views/spaces/SpaceInviteCollaboratorView.vue'
import SeedersView                      from '@/views/settings/admin/SeedersView.vue'
import SeedersJoinView                  from '@/views/settings/admin/SeedersJoinView.vue'
import SeederSingleView                 from '@/views/settings/admin/SeederSingleView.vue'
import SeederInviteAdminView            from '@/views/settings/admin/SeederInviteAdminView.vue'
import ExportView                       from '@/views/settings/ExportView.vue'
import ImportView                       from '@/views/settings/ImportView.vue'
import SettingsView                     from '@/views/settings/SettingsView.vue'
import ManageKeysView                   from '@/views/settings/ManageKeysView.vue'
import AppearanceView                   from '@/views/settings/AppearanceView.vue'
import AdvancedView                     from '@/views/settings/AdvancedView.vue'
import OptionsView                      from '@/views/settings/OptionsView.vue'
import ProfileView                      from '@/views/settings/ProfileView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',                                           name: 'spaces',                          component: SpacesView},
  {path: '/folders/init',                                name: 'spaces-init',                     component: SpacesInitView},
  {path: '/folders/join',                                name: 'spaces-join',                     component: SpacesJoinView},
  {path: '/folders/create',                              name: 'spaces-create',                   component: SpacesCreateView},
  {path: '/folders/:address',                            name: 'space',                           component: SpaceSingleView},
  {path: '/folders/:address/invite',                     name: 'space-invite',                    component: SpaceInviteCollaboratorView},
  {path: '/settings',                                   name: 'settings',                        component: SettingsView},
  {path: '/settings/profile',                           name: 'profile',                         component: ProfileView},
  {path: '/settings/appearance',                        name: 'appearance',                      component: AppearanceView},
  {path: '/settings/advanced',                          name: 'advanced',                        component: AdvancedView},
  {path: '/settings/options',                           name: 'options',                         component: OptionsView},
  {path: '/settings/keys',                              name: 'manage-keys',                     component: ManageKeysView},
  {path: '/settings/keys/export',                       name: 'secrets-export',                  component: ExportView},
  {path: '/settings/keys/import',                       name: 'secrets-import',                  component: ImportView},
  {path: '/settings/admin/seeders',                     name: 'seeders',                         component: SeedersView},
  {path: '/settings/admin/seeders/join',                name: 'seeders-join',                    component: SeedersJoinView},
  {path: '/settings/admin/seeders/:address',            name: 'seeder',                          component: SeederSingleView},
  {path: '/settings/admin/seeders/:address/invite',     name: 'seeder-invite',                          component: SeederInviteAdminView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
