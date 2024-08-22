import { useContext, useEffect, useState } from 'react'

import { EmployeeContext } from '../contexts/EmployeeContext'

import { Item } from '../types/item'

import { getAllItems } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemsList from '../components/Items/ItemsList'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonList from '../components/SkeletonList'

const PageItems = () => {
  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [itemList, setItemList] = useState<Item[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getData = async () => {
      if (token && token !== '') {
        try {
          const result = await getAllItems({ search: '' }, token)
          if (result) {
            setItemList(result)
          } else {
            setItemList([])
          }
        } catch (error) {
        } finally {
          setLoading(false)
        }
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
