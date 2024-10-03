import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/toaster'
import './globals.scss'

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
    <html lang="vi">
      <body className={cn('antialiased')}>
        <Provider>
          <Header className="h-14" />
          <Main className="h-[calc(100vh - 56px)] flex items-start">
            <Sidebar />
            <Content className="p-6">{children}</Content>
          </Main>
          <Toaster />
        </Provider>
      </body>
    </html>
  )
}
