"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const subjects = [
  { id: "history", name: "History", color: "bg-amber-100 text-amber-700" },
  { id: "science", name: "Science", color: "bg-green-100 text-green-700" },
  { id: "math", name: "Mathematics", color: "bg-blue-100 text-blue-700" },
  { id: "literature", name: "Literature", color: "bg-purple-100 text-purple-700" },
  { id: "geography", name: "Geography", color: "bg-orange-100 text-orange-700" },
  { id: "physics", name: "Physics", color: "bg-cyan-100 text-cyan-700" },
  { id: "chemistry", name: "Chemistry", color: "bg-pink-100 text-pink-700" },
  { id: "biology", name: "Biology", color: "bg-lime-100 text-lime-700" },
  { id: "computer", name: "Computer Science", color: "bg-indigo-100 text-indigo-700" },
]

interface SubjectTagsProps {
  selectedTag: string | null
  onTagSelect: (tag: string) => void
}

export const SubjectTags = ({ selectedTag, onTagSelect }: SubjectTagsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {subjects.map((subject) => (
        <motion.button
          key={subject.id}
          onClick={() => onTagSelect(subject.id)}
          className={cn(
            "px-3 py-1 rounded-full text-sm font-medium transition-all",
            subject.color,
            selectedTag === subject.id
              ? "ring-2 ring-offset-2 ring-current scale-105"
              : "opacity-70 hover:opacity-100"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale: selectedTag === subject.id ? 1.05 : 1,
          }}
        >
          {subject.name}
        </motion.button>
      ))}
    </div>
  )
}
