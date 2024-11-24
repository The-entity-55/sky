"use client"

import { motion } from "framer-motion"
import { LineChart, Brain, BookOpen } from "lucide-react"
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/use-toast"
import { LearningCharts } from "@/components/progress"

export default function ProgressPage() {
  const { isLoaded, isSignedIn } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to view your progress.",
        variant: "destructive",
      })
      router.push("/")
    } else if (isLoaded && isSignedIn) {
      setLoading(false)
    }
  }, [isLoaded, isSignedIn, router])

  if (!isLoaded || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 rounded mx-auto mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="h-6 w-24 bg-gray-200 rounded mb-2"></div>
                  <div className="h-8 w-16 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <div className="flex items-center space-x-3 mb-6">
          <LineChart className="w-8 h-8 text-blue-600" />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text">
            Learning Progress
          </h1>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-2">
              <Brain className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-semibold">Learning Score</h3>
            </div>
            <p className="text-3xl font-bold text-blue-600">85%</p>
            <p className="text-sm text-gray-500">Based on your interactions</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-2">
              <BookOpen className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-semibold">Topics Covered</h3>
            </div>
            <p className="text-3xl font-bold text-green-600">12</p>
            <p className="text-sm text-gray-500">Across all subjects</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-lg"
          >
            <div className="flex items-center space-x-3 mb-2">
              <LineChart className="w-6 h-6 text-purple-600" />
              <h3 className="text-lg font-semibold">Weekly Progress</h3>
            </div>
            <p className="text-3xl font-bold text-purple-600">+15%</p>
            <p className="text-sm text-gray-500">Improvement this week</p>
          </motion.div>
        </div>

        {/* Analytics Charts */}
        <LearningCharts />
      </motion.div>
    </div>
  )
}
