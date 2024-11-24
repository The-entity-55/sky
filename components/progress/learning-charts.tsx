"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useLearningAnalytics } from '@/hooks/use-learning-analytics'
import { CheckCircle2, BookOpen } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'
import { LineChart, RadarChart } from '@/components/charts'

interface SubjectProgress {
  subject: string
  understanding: number
}

interface TimelineData {
  date: string
  attention: number
}

export default function LearningCharts() {
  const { getPersonalizedTutoring } = useLearningAnalytics()
  const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([])
  const [timelineData, setTimelineData] = useState<TimelineData[]>([])
  const [engagementData, setEngagementData] = useState<{
    questionQuality: number
    participationRate: number
    conceptConnections: number
  }>({
    questionQuality: 0,
    participationRate: 0,
    conceptConnections: 0,
  })
  const [recommendations, setRecommendations] = useState<{
    studyStrategies: string[]
    resourceTypes: string[]
  }>({
    studyStrategies: [],
    resourceTypes: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const data = await getPersonalizedTutoring()
        
        if (!data) {
          throw new Error('No data received')
        }

        // Transform subject progress data
        const subjects = Object.entries(data.pattern.conceptualUnderstanding || {}).map(
          ([subject, understanding]) => ({
            subject,
            understanding: Math.round((understanding || 0) * 100),
          })
        )
        setSubjectProgress(subjects)

        // Transform timeline data
        const timeline = Object.entries(data.behaviorAnalysis.attentionPatterns || {}).map(
          ([timeOfDay, attention]) => ({
            date: timeOfDay,
            attention: Math.round((attention || 0) * 100),
          })
        )
        setTimelineData(timeline)

        // Set engagement metrics
        if (data.behaviorAnalysis.engagementMetrics) {
          setEngagementData({
            questionQuality: Math.round((data.behaviorAnalysis.engagementMetrics.questionQuality || 0) * 100),
            participationRate: Math.round((data.behaviorAnalysis.engagementMetrics.participationRate || 0) * 100),
            conceptConnections: Math.round((data.behaviorAnalysis.engagementMetrics.conceptConnections || 0) * 100),
          })
        }

        // Set recommendations
        if (data.recommendations) {
          setRecommendations({
            studyStrategies: data.recommendations.studyStrategies || [],
            resourceTypes: data.recommendations.resourceTypes || [],
          })
        }
      } catch (error) {
        toast({
          title: "Error",
          description: error instanceof Error ? error.message : "Failed to load analytics",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [getPersonalizedTutoring])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-[300px] bg-gray-100 rounded"></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-[400px] bg-gray-100 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Learning Progress Over Time */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Learning Progress Over Time</h3>
        <div className="h-[300px]">
          <LineChart data={timelineData} />
        </div>
      </div>

      {/* Subject Understanding Radar */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Subject Understanding Overview</h3>
        <div className="h-[400px]">
          <RadarChart data={subjectProgress} />
        </div>
      </div>

      {/* Engagement Metrics */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Learning Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">
              {engagementData.questionQuality}%
            </div>
            <div className="text-gray-600">Question Quality</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {engagementData.participationRate}%
            </div>
            <div className="text-gray-600">Participation Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {engagementData.conceptConnections}%
            </div>
            <div className="text-gray-600">Concept Connections</div>
          </div>
        </div>
      </div>

      {/* Personalized Recommendations */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Personalized Learning Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-lg mb-2">Recommended Study Strategies</h4>
            <ul className="space-y-2">
              {recommendations.studyStrategies.map((strategy, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span>{strategy}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-2">Recommended Resource Types</h4>
            <ul className="space-y-2">
              {recommendations.resourceTypes.map((resource, index) => (
                <li key={index} className="flex items-center space-x-2">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>{resource}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
