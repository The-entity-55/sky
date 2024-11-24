"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AnimatedShipLogo } from "./animated-ship-logo"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { BookOpen } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const [isHovered, setIsHovered] = useState<string | null>(null)

  return (
    <motion.nav 
      className="flex items-center justify-between p-4 bg-white border-b border-blue-100 sticky top-0 z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link href="/" className="flex items-center space-x-2">
        <AnimatedShipLogo />
        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
          Tutorflow
        </span>
      </Link>
      <div className="flex items-center space-x-1">
        <NavItem href="/" label="Dashboard" isActive={pathname === '/'} />
        <NavItem href="/ai-tutor" label="AI Tutor" isActive={pathname === '/ai-tutor'} />
        <NavItem href="/notes" label="Notes" isActive={pathname === '/notes'} />
        <NavItem href="/progress" label="Progress" isActive={pathname === '/progress'} />
        <NavItem href="/community" label="Community" isActive={pathname === '/community'} />
        <NavItem href="/pricing" label="Pricing" isActive={pathname === '/pricing'} />
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity">
              Sign In
            </Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Link href="/notes">
            <Button variant="ghost" size="icon" className="mr-2">
              <BookOpen className="h-5 w-5" />
            </Button>
          </Link>
          <UserButton 
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </SignedIn>
      </div>
    </motion.nav>
  )
}

function NavItem({ href, label, isActive }: { href: string; label: string; isActive: boolean }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
      href={href}
      className={`px-4 py-2 rounded-md text-sm font-medium relative ${
        isActive ? 'text-blue-600' : 'text-gray-600'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
      {(isActive || isHovered) && (
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"
          layoutId="navbar-underline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </Link>
  )
}
