import { useContext, useEffect, useState } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { Item } from '../types/item'

import { getAllItems } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemsList from '../components/Items/ItemsList'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonList from '../components/SkeletonList'

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
      <LoadingWrapper loading={loading} skeleton={<SkeletonList />}>
        <ItemsList items={itemList} />
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageItems
