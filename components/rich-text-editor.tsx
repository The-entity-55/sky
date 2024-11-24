"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Bold, Italic, Underline, List } from 'lucide-react'

interface RichTextEditorProps {
  content: string
  setContent: React.Dispatch<React.SetStateAction<string>>
}

export function RichTextEditor({ content, setContent }: RichTextEditorProps) {
  const handleFormat = (format: string) => {
    // In a real rich text editor, you would apply the formatting here
    // For this example, we'll just wrap the selected text with markdown-style formatting
    const textarea = document.getElementById('note-content') as HTMLTextAreaElement
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = content.substring(start, end)
    let formattedText = ''

    switch (format) {
      case 'bold':
        formattedText = `**${selectedText}**`
        break
      case 'italic':
        formattedText = `*${selectedText}*`
        break
      case 'underline':
        formattedText = `__${selectedText}__`
        break
      case 'list':
        formattedText = `\n- ${selectedText}`
        break
    }

    const newContent = content.substring(0, start) + formattedText + content.substring(end)
    setContent(newContent)
  }

  return (
    <div className="space-y-2">
      <div className="flex space-x-2 mb-2">
        <Button onClick={() => handleFormat('bold')} size="icon" variant="outline">
          <Bold className="h-4 w-4" />
        </Button>
        <Button onClick={() => handleFormat('italic')} size="icon" variant="outline">
          <Italic className="h-4 w-4" />
        </Button>
        <Button onClick={() => handleFormat('underline')} size="icon" variant="outline">
          <Underline className="h-4 w-4" />
        </Button>
        <Button onClick={() => handleFormat('list')} size="icon" variant="outline">
          <List className="h-4 w-4" />
        </Button>
      </div>
      <Textarea
        id="note-content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Start writing your note here..."
        rows={10}
      />
    </div>
  )
}

