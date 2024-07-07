import { Item as ItemType } from '../../types/item'

import { Grid, List, styled } from '@mui/material'

import Item from './Item'
import { updateItemEnabledById } from '../../api/items/item'
import { useState } from 'react'

type props = { items: ItemType[] }
const ItemsList = ({ items }: props) => {
  const [itemsData, setItemsData] = useState(items)
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }))
  const handleItemEnabledUpdate = async (index: number, item: ItemType) => {
    try {
      const response = await updateItemEnabledById(item)
      if (response) {
        setItemsData((prev) => {
          const updatedItemsData = [...prev]
          const enabled = updatedItemsData[index].enabled
          updatedItemsData[index].enabled = !enabled
          return updatedItemsData
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (itemsData.length > 0) {
    return (
      <div>
        Lista de items
        <Grid item xs={12} md={6}>
          <Demo>
            <List dense={false}>
              {itemsData.map((item, index) => (
                <Item
                  key={index}
                  index={index}
                  item={item}
                  handleItemEnabledUpdate={handleItemEnabledUpdate}
                />
              ))}
            </List>
          </Demo>
        </Grid>
      </div>
    )
  }

  return (
    <div>
      Lista de items <br />
      Ningún item para mostrar
    </div>
  )
}

export default ItemsList
