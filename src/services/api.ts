import axios from 'axios'
import { Http, Secrets } from '@/lib/http'
import { getCookie } from 'cookies-next'
import type { Response, User } from '@/types'

const client = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const accessToken = getCookie(process.env.COOKIE_ACCESS_TOKEN as string) || ''
const refreshToken = getCookie(process.env.COOKIE_REFRESH_TOKEN as string) || ''

export const secrets = new Secrets(accessToken, refreshToken)
export const http = new Http(client, secrets)

export type Anonymous = {
  access_token: string
  refresh_token: string
}

export interface InitialResponse extends Response {
  anonymous?: Anonymous
  user: User
}

export const initial = async () => {
  const { user, anonymous } = await http.post<InitialResponse>('/initial/data', { body: {} })
  return { user, anonymous }
}
