import { Payment as PaymentType } from '../../types/payment'
import { emulateApiCall, paymentExample, paymentsListExample } from '../dummy'

export const getPaymentById = async (
  id: number
): Promise<PaymentType | undefined> => {
  try {
    const response: PaymentType = await emulateApiCall(
      paymentsListExample[id-1],
      'success',
      id
    )
    if (response) {
      return response
    }
    throw new Error('Error descargando datos de reserva')
  } catch (error) {
    console.error(error)
  } 
  return
}

export const updatePaymentById = async (payment: PaymentType) => {
  try {
    const response = await emulateApiCall(payment, 'success')
    if (response) {
      return response
    }
    throw new Error('Error actualizando datos de reserva')
  } catch (error) {
    console.error(error)
  }
  return
}

export const getPaymentsByDocument = async (userDocument: string) => {
  try {
    const response = await emulateApiCall(paymentsListExample, 'success', userDocument)
    if (response) {
      return response
    }
    throw new Error('Error buscando lista de reservas')
  } catch (error) {
    console.error(error)
  }
  return
}

export const getAllPayments = async (): Promise<PaymentType[] | undefined> => {
  try {
    const response: PaymentType[] = await emulateApiCall(
      paymentsListExample,
      'success'
    )
    if (response) {
      return response
    }
    throw new Error('Error descargando reservas')
  } catch (error) {
    console.error(error)
  }
}
