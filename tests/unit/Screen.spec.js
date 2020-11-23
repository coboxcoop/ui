import { mount } from "@vue/test-utils"
import MeHeader  from "@/components/MeHeader.vue"
import Screen    from "@/components/Screen.vue"

jest.mock("@/components/MeHeader.vue", () => ({
  name: "MeHeader",
  render: h => h("div")
}))

const shortkey = jest.fn()

test('layout header layout', () =>  {
  const wrapper = mount(Screen, {
    stubs: {
      MeHeader: true
    },
    slots: {
      header: '<div class="header"></div>'
    },
    directives: {
      shortkey
    }
  })

  expect(wrapper.html()).toContain('<div class="header"></div>')
})
