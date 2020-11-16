import Vue from 'vue'
import VueRouter from 'vue-router'

import SpacesView                       from '@/views/spaces/SpacesView.vue'
import SpacesInitView                   from '@/views/spaces/SpacesInitView.vue'
import SpacesJoinView                   from '@/views/spaces/SpacesJoinView.vue'
import SpacesCreateView                 from '@/views/spaces/SpacesCreateView.vue'
import SpaceSingleView                  from '@/views/spaces/SpaceSingleView.vue'
import SpaceInviteFriendView            from '@/views/spaces/SpaceInviteFriendView.vue'
import SpaceHealthView                  from '@/views/spaces/SpaceHealthView.vue'
import SpaceDeleteView                  from '@/views/spaces/SpaceDeleteView.vue'
import SeedersView                      from '@/views/settings/admin/SeedersView.vue'
import SeedersJoinView                  from '@/views/settings/admin/SeedersJoinView.vue'
import SeederSingleView                 from '@/views/settings/admin/SeederSingleView.vue'
import SeederFoldersSeedingView         from '@/views/settings/admin/SeederFoldersSeedingView.vue'
import SeederSeedFolderView             from '@/views/settings/admin/SeederSeedFolderView.vue'
import SeederInviteAdminView            from '@/views/settings/admin/SeederInviteAdminView.vue'
import ExportView                       from '@/views/settings/ExportView.vue'
import ImportView                       from '@/views/settings/ImportView.vue'
import SettingsView                     from '@/views/settings/SettingsView.vue'
import ManageKeysView                   from '@/views/settings/ManageKeysView.vue'
import AdvancedView                     from '@/views/settings/AdvancedView.vue'
import AccessibilityView                from '@/views/settings/AccessibilityView.vue'
import ProfileView                      from '@/views/settings/ProfileView.vue'
import ContactsView                     from '@/views/settings/ContactsView.vue'
import ContactsFriendView               from '@/views/settings/ContactsFriendView.vue'
import ContactsFriendFoldersView        from '@/views/settings/ContactsFriendFoldersView.vue'
import ContactsFolderView               from '@/views/settings/ContactsFolderView.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/',                                           name: 'spaces',                          component: SpacesView},
  {path: '/folders/init',                               name: 'spaces-init',                     component: SpacesInitView},
  {path: '/folders/join',                               name: 'spaces-join',                     component: SpacesJoinView},
  {path: '/folders/create',                             name: 'spaces-create',                   component: SpacesCreateView},
  {path: '/folders/:address',                           name: 'space',                           component: SpaceSingleView},
  {path: '/folders/:address/invite',                    name: 'space-invite',                    component: SpaceInviteFriendView},
  {path: '/folders/:address/health',                    name: 'space-health',                    component: SpaceHealthView},
  {path: '/folders/:address/delete',                    name: 'space-delete',                    component: SpaceDeleteView},
  {path: '/settings',                                   name: 'settings',                        component: SettingsView},
  {path: '/settings/profile',                           name: 'profile',                         component: ProfileView},
  {path: '/settings/advanced',                          name: 'advanced',                        component: AdvancedView},
  {path: '/settings/accessibility',                     name: 'accessibility',                   component: AccessibilityView},
  {path: '/settings/contacts',                          name: 'contacts',                        component: ContactsView},
  {path: '/settings/contacts/friend',                   name: 'contacts-friend',                 component: ContactsFriendView},
  {path: '/settings/contacts/friend/folders',           name: 'contacts-friend-folders',         component: ContactsFriendFoldersView},
  {path: '/settings/contacts/folder',                   name: 'contacts-folder',                 component: ContactsFolderView},
  {path: '/settings/keys',                              name: 'manage-keys',                     component: ManageKeysView},
  {path: '/settings/keys/export',                       name: 'secrets-export',                  component: ExportView},
  {path: '/settings/keys/import',                       name: 'secrets-import',                  component: ImportView},
  {path: '/settings/admin/seeders',                     name: 'seeders',                         component: SeedersView},
  {path: '/settings/admin/seeders/join',                name: 'seeders-join',                    component: SeedersJoinView},
  {path: '/settings/admin/seeders/:address',            name: 'seeder',                          component: SeederSingleView},
  {path: '/settings/admin/seeders/:address/seed',       name: 'seeder-add-seed',                 component: SeederSeedFolderView},
  {path: '/settings/admin/seeders/:address/seed',       name: 'seeder-folders',                  component: SeederFoldersSeedingView},
  {path: '/settings/admin/seeders/:address/invite',     name: 'seeder-invite',                   component: SeederInviteAdminView}
]

export default new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
