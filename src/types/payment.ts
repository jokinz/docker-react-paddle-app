export type Payment = {
  id: number
  idReserve: number
  transactionCode: string
  status: paymentStatus
}

export type paymentStatus = 'paid' | 'pending' | 'failed'
