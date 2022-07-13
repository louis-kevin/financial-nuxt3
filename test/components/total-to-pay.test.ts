import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TotalToPay from '../../components/total-to-pay.vue'
import billState from "~/test/fixtures/billState";

test('example', () => {
  expect(TotalToPay).toBeTruthy()

  const wrapper = mount(TotalToPay, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            bills: billState
          }
        }),
      ],
    },
  })

  expect(wrapper.text()).toContain('Total a Pagar')
  expect(wrapper.text()).toContain(`R$ 2100`)
})
