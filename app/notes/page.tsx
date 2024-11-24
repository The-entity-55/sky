"use client"

import { motion } from "framer-motion"
import { NoteEditor } from "@/components/notes/note-editor"

export default function NotesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto"
      >
        <motion.h1
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Smart Notes
        </motion.h1>
        <motion.p
          className="text-gray-600 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Create, organize, and enhance your notes with AI assistance
        </motion.p>

        <NoteEditor />
      </motion.div>
    </div>
  )
}
