"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { BookOpen, Brain, LineChart, Users } from "lucide-react"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.h1 
        className="text-5xl font-bold mb-4 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Elevate Your Learning Journey
      </motion.h1>
      <motion.p 
        className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Transform your educational experience with AI-powered personalized learning, smart note-taking, and community collaboration.
      </motion.p>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {/* AI Tutor Section */}
        <Link href="/ai-tutor">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-blue-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Brain className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Tutor</h3>
            <p className="text-gray-600">Get personalized learning assistance with our advanced AI tutor.</p>
          </motion.div>
        </Link>

        {/* AI Notes Section */}
        <Link href="/notes">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-blue-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Notes</h3>
            <p className="text-gray-600">Create and organize smart notes with AI-powered insights.</p>
          </motion.div>
        </Link>

        {/* Progress Tracking Section */}
        <Link href="/progress">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-blue-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <LineChart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Progress Tracking</h3>
            <p className="text-gray-600">Monitor your learning progress with detailed analytics.</p>
          </motion.div>
        </Link>

        {/* Community Section */}
        <Link href="/community">
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border border-blue-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mb-4">
              <Users className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Community</h3>
            <p className="text-gray-600">Connect with peers and share knowledge in our learning community.</p>
          </motion.div>
        </Link>
      </motion.div>

      {/* Coming Soon Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Coming Soon</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Study Groups</h3>
            <p className="text-gray-600">Join AI-powered study groups matched by learning style and goals.</p>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Interactive Exercises</h3>
            <p className="text-gray-600">Practice with AI-generated exercises tailored to your learning pace.</p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            className="bg-white/50 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-gray-200"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-center w-12 h-12 bg-teal-100 rounded-full mb-4">
              <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">Video Learning</h3>
            <p className="text-gray-600">Access AI-curated video content and real-time transcription.</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
