"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export function AnimatedHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Transform Your Learning with Tutorflow
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Ride the AI wave and learn in a new way. Tutorflow is where knowledge starts to grow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity px-8 py-3 text-lg">
            Start Learning Now
          </Button>
        </motion.div>
      </div>
      <AnimatedBackground />
    </section>
  )
}

function AnimatedBackground() {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute rounded-full bg-gradient-to-br from-blue-400 to-cyan-300 opacity-10"
          style={{
            width: `${Math.random() * 300 + 50}px`,
            height: `${Math.random() * 300 + 50}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </>
  )
}

