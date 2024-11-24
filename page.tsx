"use client"

import { motion } from "framer-motion"
import { VoiceAssistantPlaceholder } from "@/components/voice-assistant-placeholder"

export default function AITutorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Personal AI Tutor
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Welcome to your AI-powered learning companion. Ask questions, practice concepts, and enhance your understanding with personalized assistance.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="flex justify-center"
      >
        <VoiceAssistantPlaceholder />
      </motion.div>
    </div>
  )
}

