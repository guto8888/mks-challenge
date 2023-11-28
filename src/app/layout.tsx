'use client'

import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.scss'
import { QueryClient, QueryClientProvider } from "react-query"

const montserrat = Montserrat({ subsets: ['latin'] })

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <html lang="en">
        <title>MKS Sistemas</title>
        <body className={montserrat.className}>{children}</body>
      </html>
    </QueryClientProvider>
  )
}
