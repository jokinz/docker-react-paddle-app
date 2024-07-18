import { NavLink } from 'react-router-dom'

import { ListItem, ListItemText } from '@mui/material'

import { Reserve as ReserveType } from '../../types/reserve'

type props = {
  index: number
  reserve: ReserveType
}
const ReserveItem = ({ reserve }: props) => {
  return (
    <ListItem>
      <NavLink to={`/reserves/${reserve.id}`}>
        <ListItemText
          primary={`id: ${reserve.id}`}
          secondary={`idReserve: ${reserve.id} Items entregados: ${reserve.itemsHanded}`}
        />
      </NavLink>{' '}
    </ListItem>
  )
}

export default ReserveItem
