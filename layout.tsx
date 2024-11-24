import { ClerkProvider } from '@clerk/nextjs'
import { Navbar } from "@/components/navbar"
import { Toaster } from "@/components/ui/toaster"
import { cn } from "@/lib/utils"
import "@/app/globals.css"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Tutorflow - AI-Powered Learning Platform",
  description: "Enhance your learning experience with AI-powered tutoring and progress tracking.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en" className={poppins.className}>
        <body className={cn("min-h-screen bg-gradient-to-b from-white to-blue-50")}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 overflow-y-auto">
              {children}
            </main>
          </div>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}

