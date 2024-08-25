import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { ReservationItems } from '../../types/reservation'

type props = {
  items: ReservationItems[]
}

const ReservationItemsAccordion = ({ items }: props) => {
  return (
    <Accordion style={{ width: '100%' }}>
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography>Items</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    width: 'auto',
                    paddingX: 0,
                  }}
                ></TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Cantidad</TableCell>
                <TableCell align="right">Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      paddingX: 0,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Avatar src={item.thumbnail ? item.thumbnail : ''} />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell align="right">{item.quantity}</TableCell>
                  <TableCell align="right">{item.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </AccordionDetails>
    </Accordion>
  )
}

export default ReservationItemsAccordion
