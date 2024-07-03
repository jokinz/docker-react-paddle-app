import { createContext } from 'react'

import { User } from '../types/user'

export type UserContextType = User | null

export const UserContext = createContext<UserContextType>(null)
