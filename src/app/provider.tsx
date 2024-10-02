'use client'

import React from 'react'
// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
import { isServer, QueryClient, QueryClientProvider } from '@tanstack/react-query'

const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  })
}

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return createQueryClient()
  }

  if (!browserQueryClient) {
    // Browser: create a new query client if it doesn't exist
    browserQueryClient = createQueryClient()
  }

  return browserQueryClient
}

export function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = getQueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
