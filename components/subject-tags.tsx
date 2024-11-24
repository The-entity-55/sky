"use client"

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, X } from 'lucide-react'

interface SubjectTagsProps {
  selectedSubjects: string[]
  setSelectedSubjects: React.Dispatch<React.SetStateAction<string[]>>
}

export function SubjectTags({ selectedSubjects, setSelectedSubjects }: SubjectTagsProps) {
  const [newSubject, setNewSubject] = useState('')

  const handleAddSubject = () => {
    if (newSubject && !selectedSubjects.includes(newSubject)) {
      setSelectedSubjects([...selectedSubjects, newSubject])
      setNewSubject('')
    }
  }

  const handleRemoveSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter(s => s !== subject))
  }

  return (
    <div className="space-y-2">
      <Label>Subject Tags</Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedSubjects.map(subject => (
          <Badge key={subject} variant="secondary" className="px-2 py-1">
            {subject}
            <button onClick={() => handleRemoveSubject(subject)} className="ml-2">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex space-x-2">
        <Input
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Add a subject"
          className="flex-grow"
        />
        <Button onClick={handleAddSubject} size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

