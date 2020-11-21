import { mount, createLocalVue } from "@vue/test-utils"
import VueRouter                 from "vue-router"
import ContactsView              from "@/views/settings/ContactsView.vue"
import ContactsFoldersView       from "@/views/settings/ContactsFoldersView.vue"
import routes                    from "@/router/index.js"

const localVue = createLocalVue()
localVue.use(VueRouter)

jest.mock("@/views/settings/ContactsFoldersView", () => ({
  name: "ContactsFoldersView",
  render: h => h("div")
}))

describe("ContactsView", () => {
  it("renders a child component via routing", async () => {
    // https://stackoverflow.com/questions/60137827/uncaught-typeerror-routes-foreach-is-not-a-function
    // const router = new VueRouter({ routes })
    const router = routes
    const wrapper = mount(ContactsView, {
      localVue,
      router
    })

    router.push("/settings/contacts/folders")
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent(ContactsFoldersView).exists()).toBe(true)
    console.log(router.currentRoute)
  })
})
