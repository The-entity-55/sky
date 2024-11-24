"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'

export function PricingSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-cyan-500 text-transparent bg-clip-text"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Simple, Transparent Pricing
        </motion.h2>
        <motion.div
          className="max-w-md mx-auto bg-white rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Premium Plan</h3>
            <p className="text-gray-600 mb-6">Unlock the full potential of AI-powered learning</p>
            <div className="flex items-baseline mb-8">
              <span className="text-5xl font-extrabold text-blue-600">₹500</span>
              <span className="text-gray-600 ml-2">/month</span>
            </div>
            <ul className="mb-8">
              {[
                "Unlimited access to AI Tutor",
                "Personalized learning paths",
                "Progress tracking and analytics",
                "Community forum access",
                "24/7 customer support"
              ].map((feature, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-center mb-3 text-gray-700"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
                >
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  {feature}
                </motion.li>
              ))}
            </ul>
            <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:opacity-90 transition-opacity">
              Start Your Journey
            </Button>
          </div>
          <div className="px-6 py-4 bg-blue-50">
            <p className="text-sm text-gray-600 text-center">
              30-day money-back guarantee. No questions asked.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

