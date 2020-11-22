import { mount, createLocalVue } from "@vue/test-utils"
import VueRouter                 from "vue-router"
import routes                    from "@/router/index.js"
import TriangleIcon              from "@/components/TriangleIcon.vue"
import MeHeader                  from "@/components/MeHeader.vue"

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = routes
const shortkey = jest.fn()

jest.mock("@/components/TriangleIcon.vue", () => ({
  name: "TriangleIcon",
  render: h => h("div")
}))

describe("MeHeader.vue", () => {
  it("displays correct heading", async () => {
    const heading = "CoBox Test"
    const wrapper = mount(MeHeader, {
      localVue,
      router,
      propsData: {
        heading: heading
      },
      stubs: {
        TriangleIcon: true
      },
      directives: {
        shortkey
      },
    })

    expect(wrapper.find("h1").text()).toBe(heading)
  })

  it("doesn't display settings if false", async () => {
    const wrapper = mount(MeHeader, {
      localVue,
      router,
      propsData: {
        settings: false
      },
      stubs: {
        TriangleIcon: true
      },
      directives: {
        shortkey
      },
    })

    const byId = wrapper.find('a.settings')
    expect(byId.exists()).toBe(false)
  })

  it("does display settings if true", async () => {
    const wrapper = mount(MeHeader, {
      localVue,
      router,
      propsData: {
        settings: true
      },
      stubs: {
        TriangleIcon: true
      },
      directives: {
        shortkey
      },
    })

    console.log(wrapper.html())
    const byId = wrapper.find('a.settings')
    expect(byId.exists()).toBe(true)
  })

  it("renders homepage via routing", async () => {
    // https://stackoverflow.com/questions/60137827/uncaught-typeerror-routes-foreach-is-not-a-function
    // const router = new VueRouter({ routes })
    const router = routes
    const shortkey = jest.fn()
    const wrapper = mount(ContactsView, {
      localVue,
      router,
      stubs: {
        Screen: true,
        NavList: true
      },
      directives: {
        shortkey
      }
    })

    router.push("/settings/contacts/folders")
    await wrapper.vm.$nextTick()

    console.log(router.currentRoute)
    console.log(wrapper.html())
    // expect(wrapper.findComponent(ContactsFoldersView).exists()).toBe(true)
  })
})
