import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: NextRequest) {
  try {
    const { pitchSummary, sharkPersona, transcript } = await request.json()

    // Generate shark question using AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      system: `You are ${sharkPersona.name}, a shark from Shark Tank. ${sharkPersona.prompt}
      
      Based on the pitch summary and transcript, ask ONE specific, investor-style question that would help evaluate this startup. Make it challenging but fair, focusing on business fundamentals like market size, revenue model, competition, or scalability.
      
      Keep your question under 30 words and make it sound natural and conversational.`,
      prompt: `Pitch Summary: ${pitchSummary}
      
      Recent Transcript: ${transcript}
      
      Ask a specific question about this startup:`,
    })

    return NextResponse.json({
      question: text,
      shark: sharkPersona.name,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error("Error generating shark question:", error)
    return NextResponse.json({ error: "Failed to generate question" }, { status: 500 })
  }
}
