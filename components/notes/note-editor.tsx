"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Edit3, Sparkles, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { SubjectTags } from "./subject-tags"
import { toast } from "@/components/ui/use-toast"

export const NoteEditor = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
  const [isAIAssisting, setIsAIAssisting] = useState(false)

  const handleAIAssist = async () => {
    if (!selectedTag) {
      toast({
        title: "Error",
        description: "Please select a subject first",
        variant: "destructive",
      })
      return
    }

    if (!content.trim()) {
      toast({
        title: "Error",
        description: "Please write some notes first",
        variant: "destructive",
      })
      return
    }

    setIsAIAssisting(true)
    try {
      const response = await fetch("/api/ai/enhance-notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          content: content.trim(), 
          tags: [selectedTag] 
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to enhance notes')
      }

      setContent(data.result)
      toast({
        title: "Success",
        description: "Your notes have been enhanced!",
      })
    } catch (error) {
      console.error("Error getting AI assistance:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to enhance notes",
        variant: "destructive",
      })
    } finally {
      setIsAIAssisting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4 p-6 bg-white rounded-xl shadow-lg"
    >
      <div className="flex items-center space-x-2 mb-4">
        <Edit3 className="w-5 h-5 text-blue-600" />
        <h2 className="text-2xl font-semibold">Create Note</h2>
      </div>

      <Input
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="text-lg font-medium"
      />

      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Tag className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-600">Select a subject:</span>
        </div>
        <SubjectTags
          selectedTag={selectedTag}
          onTagSelect={(tag) => setSelectedTag(tag === selectedTag ? null : tag)}
        />
      </div>

      <div className="relative">
        <Textarea
          placeholder={`Start writing your ${selectedTag ? selectedTag.charAt(0).toUpperCase() + selectedTag.slice(1) : ''} notes here...`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] p-4"
        />
        <Button
          onClick={handleAIAssist}
          disabled={isAIAssisting}
          className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          {isAIAssisting ? "Enhancing..." : "Enhance with AI"}
        </Button>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline">Save Draft</Button>
        <Button 
          className="bg-blue-600 text-white"
          disabled={!selectedTag}
        >
          Publish Note
        </Button>
      </div>
    </motion.div>
  )
}
