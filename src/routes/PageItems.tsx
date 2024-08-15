import { useEffect, useState } from 'react'

import { Item } from '../types/item'

import { itemExample } from '../api/dummy'
import { getAllItems } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemsList from '../components/Items/ItemsList'
import NewItemForm from '../components/Items/NewItemForm'
import UpdateItem from '../components/Items/UpdateItem'
import LoadingWrapper from '../components/LoadingWrapper'

const PageItems = () => {
  const [itemList, setItemList] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getData = async () => {
      const result = await getAllItems()
      if (result) {
        setItemList(result)
        setLoading(false)
      } else {
        setItemList([])
        setLoading(false)
      }
    }
    getData()
  }, [])
  return (
    <Drawer>
      <h1>Página Items</h1>
      <NewItemForm />
      <UpdateItem item={itemExample} />
      <LoadingWrapper loading={loading}>
        <ItemsList items={itemList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageItems
