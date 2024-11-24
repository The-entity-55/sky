"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, MessageCircle, TrendingUp, Users } from 'lucide-react'

interface FeatureCardProps {
  type: 'tutor' | 'notes' | 'progress' | 'community'
  title: string
  description: string
  gradient: string
}

export function FeatureCard({ type, title, description, gradient }: FeatureCardProps) {
  const getIcon = () => {
    const icons = {
      tutor: Book,
      notes: MessageCircle,
      progress: TrendingUp,
      community: Users
    }
    const Icon = icons[type]
    return <Icon className="h-8 w-8 text-white" />
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.3)" }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden border-none shadow-lg h-full">
        <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-10`} />
        <CardHeader className="relative">
          <div className="flex items-center space-x-4">
            <motion.div 
              className={`p-3 rounded-xl bg-gradient-to-br ${gradient}`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              {getIcon()}
            </motion.div>
            <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-gray-600">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

