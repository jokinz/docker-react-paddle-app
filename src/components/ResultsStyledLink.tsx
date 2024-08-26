import { styled } from '@mui/material'
import { Link as RouterLink } from 'react-router-dom'

const ResultsStyledLink = styled(RouterLink)(({ theme }) => ({
  ...theme.typography.body1,
  color: theme.palette.primary.main,
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}))

export default ResultsStyledLink
