"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full bg-blue-300/30 blur-3xl"
        animate={{
          x: mousePosition.x * 0.1,
          y: mousePosition.y * 0.1,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
        }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] rounded-full bg-purple-300/20 blur-3xl"
        animate={{
          x: mousePosition.x * -0.1 + 400,
          y: mousePosition.y * -0.1 + 400,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
        }}
      />
      <motion.div
        className="absolute w-[300px] h-[300px] rounded-full bg-cyan-300/20 blur-3xl"
        animate={{
          x: mousePosition.y * 0.1 + 200,
          y: mousePosition.x * 0.1 + 200,
        }}
        transition={{
          type: "spring",
          damping: 50,
          stiffness: 100,
        }}
      />
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.075)_1px,transparent_1px),linear-gradient(to_right,rgba(255,255,255,.075)_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, black, transparent 80%)'
        }}
      />
    </div>
  )
}
