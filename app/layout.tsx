import './globals.css'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@/components/providers/clerk-provider'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'AI Tutor',
  description: 'Your personal AI tutor',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider>
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  )
}
