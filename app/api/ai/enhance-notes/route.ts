import { NextResponse } from "next/server"
import OpenAI from "openai"
import { auth } from '@clerk/nextjs'

// Initialize OpenAI with error handling
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OpenAI API key is not configured')
  }
  return new OpenAI({ apiKey })
}

export async function POST(req: Request) {
  try {
    // Check authentication
    const { userId } = auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Parse and validate request body
    const body = await req.json()
    const { content, tags } = body

    if (!content || !tags || !Array.isArray(tags) || tags.length === 0) {
      return NextResponse.json(
        { error: 'Invalid request. Content and tags are required.' },
        { status: 400 }
      )
    }

    // Initialize OpenAI client
    const openai = getOpenAIClient()

    // Create the enhancement prompt
    const prompt = `
      As an expert tutor in ${tags.join(", ")}, please enhance these student notes. Your task is to:

      1. Fix any grammar and spelling mistakes
      2. Improve clarity and organization
      3. Add relevant examples and explanations
      4. Highlight key concepts and terms
      5. Maintain the original meaning while making it more academically sound
      6. Format the text for better readability
      7. Add brief explanations for complex terms
      8. Ensure proper subject-specific terminology is used

      Original student notes:
      ${content}

      Please provide the enhanced version with:
      - Corrected grammar and spelling
      - Clear structure with headings
      - Bullet points for key ideas
      - Examples in relevant places
      - Proper academic terminology
      - Brief explanations where needed

      Format the response using markdown for better readability.
    `

    // Make API call with error handling
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are an expert academic tutor and editor, skilled in enhancing student notes while maintaining their original meaning. You excel at grammar correction, clarity improvement, and academic writing enhancement."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    }).catch(error => {
      console.error('OpenAI API Error:', error)
      throw new Error('Failed to enhance notes with AI')
    })

    // Extract and validate the enhanced content
    const enhancedContent = completion.choices[0]?.message?.content
    if (!enhancedContent) {
      throw new Error('Failed to generate enhanced content')
    }

    // Return the enhanced content
    return NextResponse.json({
      result: enhancedContent,
      success: true
    })

  } catch (error) {
    // Log error details
    console.error("Error in AI note enhancement:", error)
    
    // Return appropriate error response
    const errorMessage = error instanceof Error ? error.message : 'Failed to enhance notes'
    return NextResponse.json(
      { 
        error: errorMessage,
        success: false
      },
      { status: 500 }
    )
  }
}
