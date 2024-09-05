export type GetItemsSchema = {
  search: string
  includeDisabled?: 0 | 1
  itemCategoryId?: number
  records?: number
  page?: number
}
