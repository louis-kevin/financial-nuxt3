import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import TotalToPay from '../../components/total-to-pay.vue'
import { createBillState } from "~/test/factories/billFactory";

test('show the total to pay', () => {
  expect(TotalToPay).toBeTruthy()
  const billState = createBillState(3, {amount: 10, done: false});

  const total = 3 * 10;

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
  expect(wrapper.text()).toContain(`R$ ${total}`)
})

test('show the total to pay even with no bills', () => {
  expect(TotalToPay).toBeTruthy()

  const wrapper = mount(TotalToPay, {
    global: {
      plugins: [
        createTestingPinia({
          initialState: {
            bills: createBillState(0)
          }
        }),
      ],
    },
  })

  expect(wrapper.text()).toContain('Total a Pagar')
  expect(wrapper.text()).toContain(`R$ 0`)
})
