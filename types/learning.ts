export interface LearningEvent {
  type: string
  subject?: string
  content: string
  timestamp: Date
  userId: string
}

export interface LearningPattern {
  strongAreas: string[]
  weakAreas: string[]
  recommendedTopics: string[]
  learningStyle: string
  conceptualUnderstanding: Record<string, number>
}

export interface EngagementMetrics {
  questionQuality: number
  participationRate: number
  conceptConnections: number
}

export interface AttentionPatterns {
  [timeOfDay: string]: number
}

export interface LearningRecommendations {
  recommendedTopics: string[]
  studyStrategies: string[]
  resourceTypes: string[]
}

export interface StudentProfile {
  userId: string
  learningStyle: string
  conceptualUnderstanding: Record<string, number>
}

export interface PersonalizedTutoring {
  tutorPrompt: string
  pattern: LearningPattern
  behaviorAnalysis: {
    learningStyle: string
    conceptualUnderstanding: Record<string, number>
    attentionPatterns: AttentionPatterns
    engagementMetrics: EngagementMetrics
  }
  recommendations: LearningRecommendations
}
