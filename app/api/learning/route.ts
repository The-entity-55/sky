import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
import { LearningEventsDB } from '@/lib/db/learning-events'
import { LearningAnalytics } from '@/lib/ml/learning-analytics'
import { z } from 'zod'

// Validation schema for learning event
const learningEventSchema = z.object({
  type: z.enum(['question', 'note', 'voice_interaction']),
  subject: z.string().optional(),
  content: z.string(),
  timestamp: z.string().datetime().optional(),
})

export async function POST(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const validatedData = learningEventSchema.parse(body)

    const event = await LearningEventsDB.create({
      userId,
      type: validatedData.type,
      subject: validatedData.subject,
      content: validatedData.content,
      timestamp: validatedData.timestamp ? new Date(validatedData.timestamp) : new Date(),
    })

    return NextResponse.json(event)
  } catch (error) {
    console.error('Error creating learning event:', error)
    if (error instanceof z.ZodError) {
      return new NextResponse('Invalid request data', { status: 400 })
    }
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type') as 'question' | 'note' | 'voice_interaction' | undefined
    const subject = searchParams.get('subject') || undefined
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined
    const offset = searchParams.get('offset') ? parseInt(searchParams.get('offset')!) : undefined
    const fromDate = searchParams.get('fromDate') ? new Date(searchParams.get('fromDate')!) : undefined
    const toDate = searchParams.get('toDate') ? new Date(searchParams.get('toDate')!) : undefined

    const events = await LearningEventsDB.getByUserId(userId, {
      type,
      subject,
      limit,
      offset,
      fromDate,
      toDate,
    })

    return NextResponse.json(events)
  } catch (error) {
    console.error('Error fetching learning events:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(req: Request) {
  try {
    const { userId } = auth()
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const eventId = searchParams.get('id')
    
    if (!eventId) {
      return new NextResponse('Event ID is required', { status: 400 })
    }

    // Add delete functionality to LearningEventsDB if needed
    return new NextResponse('Not Implemented', { status: 501 })
  } catch (error) {
    console.error('Error deleting learning event:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
