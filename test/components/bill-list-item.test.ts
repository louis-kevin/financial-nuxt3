import { mount } from '@vue/test-utils'
import { createTestingPinia } from '@pinia/testing'
import BillListItem from '~/components/bill-list-item.vue'
import { expect } from "vitest";
import { createRandomBill } from "~/test/factories/billFactory";

const bill = createRandomBill();

const mountBillListItem = (bill) => {
  expect(BillListItem).toBeTruthy()

  const wrapper = mount(BillListItem, {
    propsData: { bill, },
    global: {
      plugins: [
        createTestingPinia(),
      ],
    },
  })

  expect(wrapper.text()).toContain(bill.name)
  expect(wrapper.text()).toContain(bill.amount)
  expect(wrapper.text()).toContain(bill.createdAt)

  const checkbox = wrapper.find(`v-checkbox`);

  expect(checkbox.exists()).toBe(true);

  expect(checkbox.attributes('model-value')).toBe(`${bill.done}`);

  return wrapper;
}

test('show the bill information with checkbox unchecked', () => mountBillListItem(bill))

test('show the bill information with checkbox checked', () => mountBillListItem({...bill, done: true}))
