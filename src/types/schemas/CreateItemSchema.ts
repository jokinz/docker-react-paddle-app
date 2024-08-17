export type CreateItemSchema = {
  itemCategoryId: number
  name: string
  description: string | null
  thumbnail: string | null
  price: number
  returning?: boolean
}
