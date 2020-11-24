import { mount, createLocalVue } from "@vue/test-utils"
import ProfileView from "@/views/settings/ProfileView.vue"
import Dot from "@/components/Dot.vue"
// import { getters } from "@/store/profile.js"
import Vuex from "vuex"

// const name = 'dan'
// const state = { name }
const localVue = createLocalVue()
localVue.use(Vuex)

const store = new Vuex.Store({
  state: {
    name: "dan"
  }
})

const shortkey = jest.fn()

describe("ProfileView", () => {
  it("renders a username using a real Vuex store", async () => {
    const wrapper = mount(ProfileView, {
      store,
      localVue,
      directives: {
        shortkey
      }
    })

    expect(wrapper.find(".value").text()).toBe("dan")
  })
})

describe("submit new name on ProfileView", () => {
  it("displays new name when submitted", async () => {
    const wrapper = mount(ProfileView, {
      store,
      localVue,
      directives: {
        shortkey
      }
    })

    console.log(name)
    console.log(wrapper.html())
    await wrapper.find(".value").setValue("alice")
    await wrapper.find("form").trigger("submit.prevent")

    expect(wrapper.find(".value").text()).toBe("alice")
  })
})
