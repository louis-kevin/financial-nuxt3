export interface Bill{
  id?: String,
  createdAt?: String,
  done?: Boolean,
  name: String,
  amount: number,
}

export interface BillList {
  [key: string]: Bill;
}
