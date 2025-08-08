import { type NextRequest, NextResponse } from "next/server"
import { generateObject } from "ai"
import { openai } from "@ai-sdk/openai"
import { z } from "zod"

const scoringSchema = z.object({
  problem: z.object({
    score: z.number().min(1).max(5),
    feedback: z.string(),
  }),
  market: z.object({
    score: z.number().min(1).max(5),
    feedback: z.string(),
  }),
  revenue: z.object({
    score: z.number().min(1).max(5),
    feedback: z.string(),
  }),
  team: z.object({
    score: z.number().min(1).max(5),
    feedback: z.string(),
  }),
  ask: z.object({
    score: z.number().min(1).max(5),
    feedback: z.string(),
  }),
  overall: z.object({
    score: z.number().min(1).max(5),
    summary: z.string(),
    strengths: z.array(z.string()),
    improvements: z.array(z.string()),
  }),
})

export async function POST(request: NextRequest) {
  try {
    const { transcript, pitchSummary, sharkPersona } = await request.json()

    const { object } = await generateObject({
      model: openai("gpt-4o"),
      system: `You are ${sharkPersona.name}, an experienced investor from Shark Tank. Evaluate this startup pitch across 5 key criteria: Problem, Market, Revenue Model, Team, and Ask/Valuation.
      
      Rate each area from 1-5 (1=Poor, 2=Below Average, 3=Average, 4=Good, 5=Excellent).
      
      Provide specific, actionable feedback for each category. Be constructive but honest about weaknesses.`,
      prompt: `Evaluate this startup pitch:
      
      Transcript: ${transcript}
      Summary: ${pitchSummary}
      
      Provide detailed scoring and feedback:`,
      schema: scoringSchema,
    })

    return NextResponse.json(object)
  } catch (error) {
    console.error("Error generating scores:", error)
    return NextResponse.json({ error: "Failed to generate scores" }, { status: 500 })
  }
}
