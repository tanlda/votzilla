'use client'

import { useQuery } from '@tanstack/react-query'
import { secrets, initial } from '@/services/api'
import { setCookie } from 'cookies-next'

export default function Auth({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { data } = useQuery({ queryKey: ['initial'], queryFn: initial })
  if (data?.anonymous) {
    const oneMonth = 30 * 24 * 60 * 60 * 1000
    const expires = new Date(Date.now() + oneMonth)
    setCookie(process.env.COOKIE_ACCESS_TOKEN as string, data.anonymous.access_token, { expires })
    setCookie(process.env.COOKIE_REFRESH_TOKEN as string, data.anonymous.refresh_token, {
      expires,
    })
    secrets.updateTokens(data.anonymous.access_token, data.anonymous.refresh_token)
  }

  return <>{children}</>
}
