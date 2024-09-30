import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import './globals.css'

import { Provider } from '@/app/provider'
import { Header } from '@/components/app/header'
import { Main } from '@/components/app/main'
import { Sidebar } from '@/components/app/sidebar'
import { Content } from '@/components/app/content'

export const metadata: Metadata = {
  title: 'Votzilla - The vote',
  description: 'Votzilla - The vote',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Provider>
      <html lang="vi">
        <body className={cn('antialiased')}>
          <Header />
          <Main className="flex items-start">
            <Sidebar />
            <Content className="px-8">{children}</Content>
          </Main>
          <Toaster />
        </body>
      </html>
    </Provider>
  )
}
