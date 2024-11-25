import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs"
import { supabase } from '@/lib/supabase'


interface MessageData {
  content: string
  type: string
  username: string
  userImage?: string
}

export async function POST(req: Request) {
  try {
    // Log incoming request details
    console.log('Incoming POST request to /api/chat/messages')
    
    // Check authentication
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse and validate request body
    const body = await req.json()
    
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
    }

    if (!body.content || typeof body.content !== 'string') {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 })
    }

    try {
      // Create message in Supabase
      const { data: message, error } = await supabase
        .from('messages')
        .insert([{
          content: body.content.trim(),
          type: body.type || "text",
          user_id: userId,
          username: body.username || "Anonymous",
          user_image: body.userImage,
        }])
        .select()
        .single()

      if (error) throw error

      // Format message for response
      const formattedMessage = {
        id: message.id.toString(),
        content: message.content,
        type: message.type,
        userId: message.user_id,
        username: message.username,
        userImage: message.user_image,
        createdAt: message.created_at.toISOString(),
      }

      return NextResponse.json(formattedMessage)
    } catch (error) {
      console.error('Database error:', error)
      return new NextResponse("Internal Error", { status: 500 })
    }
  } catch (error) {
    console.error('Request processing error:', error)
    return NextResponse.json({ 
      error: "Failed to process request", 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const { userId } = auth()
    if (!userId) {
      console.error('Unauthorized request: No userId')
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    try {
      const { data: messages, error } = await supabase
        .from('messages')
        .select()
        .order('created_at', { ascending: false })
        .limit(100)

      if (error) throw error

      if (!messages || !Array.isArray(messages)) {
        throw new Error('Invalid database response')
      }

      // Format messages for response
      const formattedMessages = messages.map(message => ({
        id: message.id.toString(),
        content: message.content,
        type: message.type,
        userId: message.user_id,
        username: message.username,
        userImage: message.user_image,
        createdAt: message.created_at.toISOString(),
      })).reverse()

      return NextResponse.json(formattedMessages)
    } catch (error: any) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Database error: " + (error.message || "Unknown error") }, { status: 500 })
    }
  } catch (error: any) {
    console.error("Error in GET /api/chat/messages:", error)
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 })
  }
}
