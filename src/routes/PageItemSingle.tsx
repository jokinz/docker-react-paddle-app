import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { Item, ItemCategory } from '../types/item'

import { getItemById } from '../api/items/item'

import Drawer from '../components/Drawer'
import ItemDetails from '../components/Items/ItemDetails'
import { EmployeeContext } from '../contexts/EmployeeContext'
import LoadingWrapper from '../components/LoadingWrapper'
import { getAllItemCategories } from '../api/items/itemCategory'
import { enqueueSnackbar } from 'notistack'

const PageItemSingle = () => {
  const params = useParams<{ itemId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [item, setItem] = useState<Item | null>(null)
  const [categories, setCategories] = useState<ItemCategory[]>([])

  const updateItem = (updatedItem: Item) => {
    setItem(updatedItem)
  }

  useEffect(() => {
    const getItemData = async () => {
      try {
        if (params.itemId && token && token !== '') {
          const itemResponse = await getItemById(parseInt(params.itemId), token)
          if (itemResponse) {
            setItem(itemResponse)
          }
          const categoriesResponse = await getAllItemCategories(token)
          if (categoriesResponse) {
            setCategories(categoriesResponse)
          }else{
            enqueueSnackbar(`Error cargando categorías`, { variant: 'error' })
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
          <ItemDetails
            item={item}
            updateItem={updateItem}
            itemCategories={categories}
          />
        ) : (
          <h1>Item no encontrado</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageItemSingle
