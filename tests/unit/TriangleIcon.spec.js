import { mount, createLocalVue } from "@vue/test-utils"
import TriangleIcon from "@/components/TriangleIcon.vue"

const localVue = createLocalVue()

describe("TriangleIcon.vue", () => {
  it("displays an SVG rendered triangle icon", () =>  {
    const wrapper = mount(TriangleIcon, {
      localVue
    })

  expect(wrapper.html()).toBe('<svg viewBox="0 0 100 100"><polygon points="0,0 100,50 0,100" fill="var(--fg)"></polygon></svg>')
  })
})
