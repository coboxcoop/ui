import { mount, createLocalVue, RouterLinkStub } from "@vue/test-utils"
import VueRouter                 from "vue-router"
import routes                    from "@/router/index.js"
import TriangleIcon              from "@/components/TriangleIcon.vue"
import MeHeader                  from "@/components/MeHeader.vue"
import SettingsView              from "@/views/settings/SettingsView.vue"

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = routes
const shortkey = jest.fn()

jest.mock("@/components/TriangleIcon.vue", () => ({
  name: "TriangleIcon",
  render: h => h("div")
}))

// jest.mock("@/views/settings/SettingsView.vue", () => ({
//   name: "SettingsView",
//   render: h => h("div")
// }))

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

    const byId = wrapper.find('a.settings')
    expect(byId.exists()).toBe(true)
  })

  it("renders settings via routing", async () => {
    // https://lmiller1990.github.io/vue-testing-handbook/vue-router.html#writing-the-test
    const wrapper = mount(MeHeader, {
      localVue,
      router,
      propsData: {
        settings: true
      },
      stubs: {
        TriangleIcon: true,
        SettingsView: false
      },
      directives: {
        shortkey
      }
    })

    router.push("/settings")
    await wrapper.vm.$nextTick()

    console.log(router.currentRoute)
    console.log(wrapper.html())
    // expect(wrapper.findComponent(SettingsView).exists()).toBe(true)
    expect(wrapper.find(SettingsView).exists()).toBe(true)
  })
})
