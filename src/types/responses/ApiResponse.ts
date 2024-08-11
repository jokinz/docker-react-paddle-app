export type ApiResponse<T> = {
  message: string
  statusCode: number
  data: T
}
