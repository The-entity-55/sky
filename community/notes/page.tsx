"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubjectTags } from '@/components/subject-tags'
import { AIAssistant } from '@/components/ai-assistant'
import { RichTextEditor } from '@/components/rich-text-editor'

export default function NotesPage() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([])

  const handleSaveDraft = () => {
    // Implement save draft functionality
    console.log('Saving draft:', { title, content, selectedSubjects })
  }

  const handleDownload = () => {
    // Implement download functionality
    const element = document.createElement('a')
    const file = new Blob([content], {type: 'text/plain'})
    element.href = URL.createObjectURL(file)
    element.download = `${title || 'Untitled'}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Note-Taking Session
      </motion.h1>
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Note Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
            />
          </div>
          <SubjectTags
            selectedSubjects={selectedSubjects}
            setSelectedSubjects={setSelectedSubjects}
          />
          <RichTextEditor
            content={content}
            setContent={setContent}
          />
          <AIAssistant
            content={content}
            setContent={setContent}
          />
          <div className="flex justify-end space-x-4">
            <Button onClick={handleSaveDraft} variant="outline">
              Save as Draft
            </Button>
            <Button onClick={handleDownload} className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity">
              Download Note
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

