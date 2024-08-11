import { Employee } from "./employee"

export const BOHEMIA_PADEL_JWT: string = 'bohemia-padel-jwt'

export type UserCookie = {
    token : string
    data: Employee
}