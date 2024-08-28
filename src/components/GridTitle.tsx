import { Grid, Typography } from '@mui/material'

const GridTitle = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid textAlign={'center'} item xs={12}>
      <Typography>
        <h1>{children}</h1>
      </Typography>
    </Grid>
  )
}

export default GridTitle
