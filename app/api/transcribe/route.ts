import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const audioFile = formData.get("audio") as File
    if (!audioFile) {
      return NextResponse.json({ error: "No audio file provided" }, { status: 400 })
    }

    // Convert File to Buffer for Groq
    const arrayBuffer = await audioFile.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Create a temporary file-like object for Groq
    const audioStream = new Blob([buffer], { type: audioFile.type })
    
    // Transcribe using Groq Whisper with auto-detection for Urdu/English
    const transcription = await groq.audio.transcriptions.create({
      file: new File([audioStream], "audio.webm", { type: audioFile.type }),
      model: "whisper-large-v3",
      response_format: "verbose_json",
      // Remove language parameter to allow auto-detection of Urdu/English
    })

    return NextResponse.json({
      text: transcription.text,
      language: (transcription as any).language || "auto",
      confidence: 0.95, // Groq doesn't provide confidence scores yet
      timestamp: Date.now(),
      segments: (transcription as any).segments || [],
    })
  } catch (error) {
    console.error("Transcription error:", error)
    return NextResponse.json({ error: "Transcription failed" }, { status: 500 })
  }
}
