import { useState, useCallback } from 'react'
import { toast } from '@/components/ui/use-toast'
import { useAuth } from '@clerk/nextjs'

interface LearningEvent {
  type: 'question' | 'note' | 'voice_interaction'
  subject?: string
  content: string
}

interface LearningPattern {
  strongAreas: string[]
  weakAreas: string[]
  recommendedTopics: string[]
  learningStyle: string
  conceptualUnderstanding: {
    [key: string]: number
  }
}

interface BehaviorAnalysis {
  learningStyle: string
  conceptualUnderstanding: {
    [key: string]: number
  }
  engagementMetrics: {
    questionQuality: number
    participationRate: number
    conceptConnections: number
  }
  attentionPatterns: {
    [timeOfDay: string]: number
  }
}

interface Recommendations {
  recommendedTopics: string[]
  studyStrategies: string[]
  resourceTypes: string[]
}

interface PersonalizedTutoring {
  tutorPrompt: string
  pattern: LearningPattern
  behaviorAnalysis: BehaviorAnalysis
  recommendations: Recommendations
}

export function useLearningAnalytics() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { getToken } = useAuth()

  const logEvent = useCallback(async (event: LearningEvent) => {
    setIsLoading(true)
    setError(null)
    try {
      const token = await getToken()
      const response = await fetch('/api/learning/analytics', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(event),
      })
      
      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Invalid response' }))
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data.success) {
        throw new Error('Failed to log event')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to log learning event'
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }, [getToken])

  const getPersonalizedTutoring = useCallback(async (): Promise<PersonalizedTutoring | null> => {
    setIsLoading(true)
    setError(null)
    try {
      const token = await getToken()
      const response = await fetch('/api/learning/analytics', {
        method: 'GET',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({ error: 'Invalid response' }))
        throw new Error(data.error || `HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid response data')
      }

      return {
        tutorPrompt: data.tutorPrompt,
        pattern: {
          strongAreas: data.pattern.strongAreas || [],
          weakAreas: data.pattern.weakAreas || [],
          recommendedTopics: data.pattern.recommendedTopics || [],
          learningStyle: data.pattern.learningStyle || 'Visual',
          conceptualUnderstanding: data.pattern.conceptualUnderstanding || {}
        },
        behaviorAnalysis: {
          learningStyle: data.behaviorAnalysis.learningStyle || 'Visual',
          conceptualUnderstanding: data.behaviorAnalysis.conceptualUnderstanding || {},
          engagementMetrics: {
            questionQuality: data.behaviorAnalysis.engagementMetrics?.questionQuality || 0,
            participationRate: data.behaviorAnalysis.engagementMetrics?.participationRate || 0,
            conceptConnections: data.behaviorAnalysis.engagementMetrics?.conceptConnections || 0
          },
          attentionPatterns: data.behaviorAnalysis.attentionPatterns || {}
        },
        recommendations: {
          recommendedTopics: data.recommendations.recommendedTopics || [],
          studyStrategies: data.recommendations.studyStrategies || [],
          resourceTypes: data.recommendations.resourceTypes || []
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get personalized tutoring'
      setError(message)
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
      return null
    } finally {
      setIsLoading(false)
    }
  }, [getToken])

  return {
    logEvent,
    getPersonalizedTutoring,
    isLoading,
    error,
  }
}
