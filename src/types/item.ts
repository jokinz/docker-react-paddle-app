export type Item = {
  id: number
  name: string
  description: string | null
  thumbnail: string | null
  price: number
  enabled: boolean
  itemCategory: ItemCategory
}

export type NewItem = Pick<
  Item,
  'name' | 'description' | 'thumbnail' | 'price'
> & { itemCategoryId: number }

export type UpdateItem = Partial<
  Pick<Item, 'name' | 'description' | 'thumbnail' | 'price' | 'enabled'> & {
    itemCategoryId: number
    returning: boolean
  }
>

export type ItemCategory = {
  id: number
  name: string
  icon: string | null
}
export type NewItemCategory = Pick<ItemCategory, 'name' | 'icon'>
