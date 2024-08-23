import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Item } from '../types/item'

import { getItemById } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemDetails from '../components/Items/ItemDetails'
import { EmployeeContext } from '../contexts/EmployeeContext'
import LoadingWrapper from '../components/LoadingWrapper'

const PageItemSingle = () => {
  const params = useParams<{ itemId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState<Item | null>(null)

  const updateItem = (updatedItem: Item) => {
    setItem(updatedItem)
  }

  useEffect(() => {
    const getItemData = async () => {
      try {
        if (params.itemId && token && token !== '') {
          const result = await getItemById(parseInt(params.itemId), token)
          if (result) {
            setItem(result)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getItemData()
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading}>
        {item !== null ? (
          <ItemDetails item={item} updateItem={updateItem} />
        ) : (
          <h1>Item no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageItemSingle
