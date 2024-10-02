import axios from 'axios'
import { Http, Secrets } from '@/lib/http'
import { getCookie } from 'cookies-next'

const client = axios.create({
  baseURL: process.env.API_URL,
  timeout: 30_000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const accessToken = getCookie(process.env.COOKIE_ACCESS_TOKEN as string) || ''
const refreshToken = getCookie(process.env.COOKIE_REFRESH_TOKEN as string) || ''
const secrets = new Secrets(accessToken, refreshToken)

console.log(secrets.getAccessToken())

export const http = new Http(client, secrets)
