import ApiService from '@/services/api'
import { Bill } from '@/types'

function uuidv4() {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export class BillService extends ApiService {
  resource = 'bills'

  async list() {
    await sleep(2000)
    return this.get<Bill[]>(this.resource)
  }

  async add(data: Bill) {
    const bill = {
      ...data,
      id: uuidv4(),
      done: false,
      createdAt: new Date().toISOString(),
    }
    await sleep(2000)
    return this.post<Bill>(this.resource, bill)
  }

  update(bill: Required<Bill>) {
    return this.put<Bill>(`${this.resource}/${bill.id}`, bill)
  }

  remove(bill: Required<Bill>) {
    return this.delete<Bill>(`${this.resource}/${bill.id}`)
  }
}

export default new BillService()
