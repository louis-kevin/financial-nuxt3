// store/filters.js
import { defineStore } from 'pinia'
import { Bill, BillList } from '@/types'
import billService from '@/services/billService'

export const useBillStore = defineStore({
  id: 'bills',
  state: () => ({
    list: {} as BillList,
  }),
  actions: {
    async loadList() {
      const billsList = await billService.list()
      const bills: BillList = {}
      billsList.forEach((bill: Required<Bill>) => {
        bills[bill.id.toLowerCase()] = bill
      })
      this.list = bills
    },
    async addBill(data: Bill) {
      const bill = await billService.add(data)
      this.list[bill.id.toLowerCase()] = bill
    },
    async toggleBill(bill: Required<Bill>) {
      bill.done = !bill.done
      await billService.update(bill)
    },
    async removeBill(data: Required<Bill>) {
      const bill = await billService.remove(data)
      delete this.list[bill.id.toLowerCase()]
    },
  },
  getters: {
    bills: (state) => Object.values(state.list),
    payedList() {
      return this.bills.filter((bill) => bill.done)
    },
    toPayList() {
      return this.bills.filter((bill) => !bill.done)
    },
    totalToPay() {
      return this.toPayList.reduce(
        (acc, bill) => acc + parseFloat(bill.amount),
        0
      )
    },
  },
})
