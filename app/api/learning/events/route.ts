import { NextResponse } from "next/server"
import { LearningAnalytics } from "@/lib/ml/learning-analytics"
import { auth } from "@clerk/nextjs"
import { type LearningEvent } from "@/types/learning"

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const event = await req.json()
    await LearningAnalytics.logLearningEvent({
      ...event,
      userId,
      timestamp: new Date()
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error logging learning event:", error)
    return NextResponse.json(
      { error: "Failed to log learning event" },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Mock learning events for development
    const mockEvents: LearningEvent[] = [
      {
        type: "question",
        subject: "mathematics",
        content: "How do I solve quadratic equations?",
        timestamp: new Date(),
        userId
      },
      {
        type: "note",
        subject: "physics",
        content: "Newton's laws of motion are fundamental principles...",
        timestamp: new Date(),
        userId
      },
      {
        type: "interaction",
        subject: "chemistry",
        content: "Reviewed periodic table elements and their properties",
        timestamp: new Date(),
        userId
      }
    ]

    try {
      const personalizedTutoring = await LearningAnalytics.getPersonalizedTutoring(
        userId,
        mockEvents
      )

      if (!personalizedTutoring) {
        throw new Error("Failed to generate personalized tutoring")
      }

      return NextResponse.json(personalizedTutoring)
    } catch (err) {
      console.error("Error in ML processing:", err)
      // Return mock data for development
      return NextResponse.json({
        tutorPrompt: "Let's focus on strengthening your understanding of key concepts. We'll build on your existing knowledge to master new topics.",
        pattern: {
          strongAreas: ["Mathematics", "Physics"],
          weakAreas: ["Chemistry", "Biology"],
          recommendedTopics: ["Advanced Calculus", "Quantum Mechanics", "Organic Chemistry"],
          learningStyle: "Visual-Kinesthetic",
          conceptualUnderstanding: {
            "Mathematics": 0.85,
            "Physics": 0.78,
            "Chemistry": 0.65,
            "Biology": 0.72,
            "Computer Science": 0.90
          }
        },
        behaviorAnalysis: {
          learningStyle: "Visual-Kinesthetic",
          conceptualUnderstanding: {
            "Mathematics": 0.85,
            "Physics": 0.78,
            "Chemistry": 0.65,
            "Biology": 0.72,
            "Computer Science": 0.90
          },
          attentionPatterns: {
            "Morning": 0.9,
            "Afternoon": 0.7,
            "Evening": 0.8
          },
          engagementMetrics: {
            questionQuality: 0.85,
            participationRate: 0.75,
            conceptConnections: 0.80
          }
        },
        recommendations: {
          recommendedTopics: ["Advanced Calculus", "Quantum Mechanics", "Organic Chemistry"],
          studyStrategies: ["Spaced Repetition", "Active Recall", "Mind Mapping"],
          resourceTypes: ["Interactive Simulations", "Video Tutorials", "Practice Problems"]
        }
      })
    }
  } catch (error) {
    console.error("Error in API route:", error)
    return NextResponse.json(
      { error: "Failed to get personalized tutoring" },
      { status: 500 }
    )
  }
}
