"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function CommunityChat() {
  return (
    <div className="max-w-3xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-[#424242]">Community Chat</h2>
        <Card className="bg-white border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-[#424242]">Recent Discussions</CardTitle>
            <CardDescription className="text-[#808080]">
              Join the conversation and learn from your peers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <ChatMessage
                initials="JD"
                name="John Doe"
                message="Has anyone tried the new AI-assisted problem-solving feature?"
                gradient="from-[#007BFF] to-[#00D9F9]"
              />
              <ChatMessage
                initials="AS"
                name="Alice Smith"
                message="I'm looking for study partners for the upcoming machine learning course. Anyone interested?"
                gradient="from-[#4CAF50] to-[#81C784]"
              />
            </ul>
            <Button className="w-full mt-4 bg-gradient-to-r from-[#007BFF] to-[#00D9F9] text-white hover:opacity-90">
              Join the Discussion
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

function ChatMessage({ initials, name, message, gradient }: { initials: string; name: string; message: string; gradient: string }) {
  return (
    <motion.li
      className="flex items-start space-x-4"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gradient} text-white flex items-center justify-center font-bold`}>
        {initials}
      </div>
      <div>
        <p className="font-semibold text-[#424242]">{name}</p>
        <p className="text-sm text-[#808080]">{message}</p>
      </div>
    </motion.li>
  )
}

