"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface AIAssistantProps {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export function AIAssistant({ content, setContent }: AIAssistantProps) {
  const [prompt, setPrompt] = useState('')

  const handleAIAssist = async () => {
    // In a real application, you would call your AI service here
    // For this example, we'll just append the prompt to the content
    setContent(prevContent => `${prevContent}\n\nAI Suggestion:\n${prompt}`)
    setPrompt('')
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="ai-prompt">AI Assistant</Label>
      <Textarea
        id="ai-prompt"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Ask AI for assistance..."
        rows={3}
      />
      <Button onClick={handleAIAssist} className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity">
        Get AI Assistance
      </Button>
    </div>
  )
}

