import { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom'

import { ItemCategory } from '../types/item'

import { getItemCategoryById } from '../api/items/itemCategory'

import Drawer from '../components/Drawer'
import ItemCategoryDetails from '../components/Items/ItemCategoryDetails'
import { EmployeeContext } from '../contexts/EmployeeContext'
import LoadingWrapper from '../components/LoadingWrapper'
import SkeletonDetails from '../components/SkeletonDetails'

const PageCategorySingle = () => {
  const params = useParams<{ categoryId: string }>()

  const employeeContext = useContext(EmployeeContext)
  const token = employeeContext?.token

  const [loading, setLoading] = useState(true)
  const [itemCategory, setItemCategory] = useState<ItemCategory | null>(null)

  const updateItemCategory = (updatedItemCategory: ItemCategory) => {
    setItemCategory(updatedItemCategory)
  }

  useEffect(() => {
    const getItemCategoryData = async () => {
      try {
        if (params.categoryId && token && token !== '') {
          const itemCategoryResponse = await getItemCategoryById(
            parseInt(params.categoryId),
            token
          )
          if (itemCategoryResponse) {
            setItemCategory(itemCategoryResponse)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }
    getItemCategoryData()
  }, [])

  return (
    <Drawer>
      <LoadingWrapper loading={loading} skeleton={<SkeletonDetails />}>
        {itemCategory !== null ? (
          <ItemCategoryDetails
            itemCategory={itemCategory}
            updateItemCategory={updateItemCategory}
          />
        ) : (
          <h1>Categoría no encontrada</h1>
        )}
      </LoadingWrapper>
    </Drawer>
  )
}

export default PageCategorySingle
