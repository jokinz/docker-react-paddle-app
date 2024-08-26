export const emulateApiCall = <T, T2>(
  result: T,
  status: 'success' | 'fail',
  arg?: T2,
  miliseconds: number = 1500
): Promise<T> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (status === 'success') {
        resolve(result)
      } else {
        reject({ success: false, error: 'Request failed' })
        // throw new Error('Request failed')
      }
    }, miliseconds)
  })
}
