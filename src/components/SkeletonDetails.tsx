import { Grid, Skeleton } from '@mui/material'
import DetailsWrapper from './DetailsWrapper'

const SkeletonDetails = () => {
  return (
    <DetailsWrapper>
      <Grid container justifyContent={'center'}>
        <Grid item xs={6}>
          <Skeleton height={60} />
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={6}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={60} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={60} />
      </Grid>
    </DetailsWrapper>
  )
}

export default SkeletonDetails
