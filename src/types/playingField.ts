export type PlayingField = {
  id: number
  establishmentId: number
  name: string
  description: string | null
  thumbnail: string | null
  price: number
  enabled: boolean
}

export type NewPlayingField = Pick<
  PlayingField,
  'establishmentId' | 'name' | 'description' | 'price'
> & { thumbnail: string }

export type UpdatePlayingField = Partial<
  Pick<
    PlayingField,
    | 'establishmentId'
    | 'name'
    | 'description'
    | 'thumbnail'
    | 'price'
    | 'enabled'
  > & {
    returning: boolean
  }
>
