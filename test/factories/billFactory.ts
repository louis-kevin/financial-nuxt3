import { faker } from '@faker-js/faker/locale/pt_BR'
import { Bill, BillList } from '~/types'

export function createRandomBill(data: Partial<Bill> = {}): Bill {
  return {
    id: faker.datatype.uuid(),
    name: faker.name.jobTitle(),
    amount: faker.datatype.number(),
    createdAt: faker.date.past().toISOString(),
    done: faker.datatype.boolean(),
    ...data,
  }
}

export function createRandomBills(
  count: number,
  data: Partial<Bill> = {}
): Bill[] {
  return Array.from({ length: count }, () => createRandomBill(data))
}

export function createBillState(
  count: number,
  data: Partial<Bill> = {}
): { list: BillList } {
  const list = {} as BillList
  createRandomBills(count, data).forEach((bill) => {
    list[bill.id.toString().toLowerCase()] = bill
  })
  return { list }
}
