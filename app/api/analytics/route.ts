import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { LearningAnalytics } from '@/lib/ml/learning-analytics'

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const tutoring = await LearningAnalytics.getPersonalizedTutoring(userId)
    return NextResponse.json(tutoring)
  } catch (error) {
    console.error('Error getting learning analytics:', error)
    if (error instanceof Error && error.message === 'No learning events found for user') {
      return new NextResponse('No learning data available', { status: 404 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
