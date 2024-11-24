"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function SessionProgress() {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#424242]">
          AI Tutor Session Progress
        </h2>
        <Card className="bg-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#424242]">Current Session</CardTitle>
            <CardDescription className="text-[#808080]">
              Your progress in the ongoing AI tutor session
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <ProgressItem label="Topics Covered" value="4/10" percentage={40} />
              <ProgressItem label="Time Spent" value="45 minutes" percentage={75} />
              <ProgressItem label="Comprehension Score" value="85%" percentage={85} />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function ProgressItem({ label, value, percentage }: { label: string; value: string; percentage: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-[#808080]">{label}</span>
        <span className="font-bold text-[#424242]">{value}</span>
      </div>
      <div className="h-2 bg-[#F0F0F0] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#007BFF] to-[#00D9F9]"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  )
}

