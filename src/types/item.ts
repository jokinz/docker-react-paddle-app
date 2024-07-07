export type Item = {
  id: number
  name: string
  description: string
  thumbnail: string
  price: number
  enabled: boolean
}

export type NewItem = Omit<Item, 'id' | 'thumbnail'>
