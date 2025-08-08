"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Play,
  Pause,
  Square,
  Users,
  MessageSquare,
  Star,
  Clock,
  Volume2,
  VolumeX,
  Loader2,
} from "lucide-react"
import Link from "next/link"
import { useRealtimeTranscription } from "@/hooks/useRealtimeTranscription"

export default function PitchPage() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [micEnabled, setMicEnabled] = useState(true)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [sharkQuestions, setSharkQuestions] = useState<
    Array<{ id: number; shark: string; question: string; timestamp: string }>
  >([])
  const [currentQuestion, setCurrentQuestion] = useState("")
  const [pitchSummary, setPitchSummary] = useState("")

  const videoRef = useRef<HTMLVideoElement>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  // Real-time transcription hook
  const {
    transcript,
    isTranscribing,
    detectedLanguage,
    startRecording: startTranscription,
    stopRecording: stopTranscription,
    clearTranscript,
  } = useRealtimeTranscription({
    chunkDuration: 3000, // Send audio chunks every 3 seconds
    silenceThreshold: -60, // Less sensitive, allows for more natural pauses
    silenceDuration: 5000, // Stop transcribing after 5 seconds of silence
  })

  // Simulated sharks data
  const sharks = [
    { name: "Rabeel Warraich", avatar: "AM", specialty: "Powerhouse Investor", active: true },
    { name: "Romana Dada", avatar: "NT", specialty: "Healthcare & Pharma", active: true },
    { name: "Faisal Aftab", avatar: "AG", specialty: "Consumer Electronics", active: false },
    { name: "Usman Bashir", avatar: "VS", specialty: "Healthcare & Pharma", active: true },
  ]

  // Simulated shark questions
  useEffect(() => {
    if (isRecording && currentTime > 30 && sharkQuestions.length === 0) {
      setSharkQuestions([
        {
          id: 1,
          shark: "Anupam Mittal",
          question: "Ahmed, what's your customer acquisition cost and how do you plan to scale this across Pakistan?",
          timestamp: "0:45",
        },
      ])
      setCurrentQuestion(
        "Ahmed, what's your customer acquisition cost and how do you plan to scale this across Pakistan?",
      )
    }

    if (currentTime > 120 && sharkQuestions.length === 1) {
      setSharkQuestions((prev) => [
        ...prev,
        {
          id: 2,
          shark: "Namita Thapar",
          question:
            "I'm concerned about the regulatory challenges. Have you obtained the necessary environmental clearances?",
          timestamp: "2:15",
        },
      ])
    }
  }, [currentTime, isRecording, sharkQuestions.length])

  // Timer logic
  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => prev + 1)
      }, 1000)
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [isRecording, isPaused])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setIsRecording(true)
      setCurrentTime(0)
      clearTranscript()
      setSharkQuestions([])
      setCurrentQuestion("")
      
      // Start real-time transcription
      await startTranscription()
    } catch (error) {
      console.error("Error accessing media devices:", error)
    }
  }

  const stopRecording = () => {
    setIsRecording(false)
    setIsPaused(false)
    
    // Stop transcription
    stopTranscription()
    
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
    }

    // Generate pitch summary
    setPitchSummary(
      "EcoTech Solutions is a waste management startup focusing on plastic recycling technology. The founder is seeking ₹2 crore for 15% equity to scale operations across Pakistan. Key strengths include existing municipal partnerships and proven technology. Areas for improvement: clearer financial projections and regulatory compliance strategy.",
    )
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🦈</span>
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                Live Pitch Session
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <Badge variant={isRecording ? "destructive" : "secondary"}>{isRecording ? "LIVE" : "READY"}</Badge>
            <div className="flex items-center space-x-1 text-sm font-mono">
              <Clock className="h-4 w-4" />
              {formatTime(currentTime)}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Video Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Feed */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Pitch</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setMicEnabled(!micEnabled)}
                      className={!micEnabled ? "bg-red-100 text-red-600" : ""}
                    >
                      {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setVideoEnabled(!videoEnabled)}
                      className={!videoEnabled ? "bg-red-100 text-red-600" : ""}
                    >
                      {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setAudioEnabled(!audioEnabled)}
                      className={!audioEnabled ? "bg-red-100 text-red-600" : ""}
                    >
                      {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="w-full h-full object-cover"
                    style={{ display: videoEnabled ? "block" : "none" }}
                  />
                  {!videoEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <VideoOff className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm opacity-75">Camera is off</p>
                      </div>
                    </div>
                  )}

                  {/* Recording indicator */}
                  {isRecording && (
                    <div className="absolute top-4 left-4 flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-white text-sm font-medium">RECORDING</span>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center space-x-4 mt-4">
                  {!isRecording ? (
                    <Button onClick={startRecording} className="bg-green-600 hover:bg-green-700">
                      <Play className="h-4 w-4 mr-2" />
                      Start Pitch
                    </Button>
                  ) : (
                    <>
                      <Button onClick={togglePause} variant="outline">
                        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                      </Button>
                      <Button onClick={stopRecording} variant="destructive">
                        <Square className="h-4 w-4 mr-2" />
                        End Pitch
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Live Transcript */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageSquare className="h-5 w-5" />
                  <span>Live Transcript</span>
                  <Badge variant="outline">
                    {detectedLanguage === 'ur' ? 'Urdu' : 
                     detectedLanguage === 'en' ? 'English' : 
                     'Urdu/English'}
                  </Badge>
                  {isTranscribing && (
                    <div className="flex items-center space-x-1">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span className="text-xs text-blue-600">Transcribing...</span>
                    </div>
                  )}
                </CardTitle>
                <CardDescription>
                  Real-time speech-to-text transcription powered by Groq Whisper
                  {detectedLanguage !== 'auto' && (
                    <span className="text-green-600 ml-2">
                      • Detected: {detectedLanguage === 'ur' ? 'Urdu' : 'English'}
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
                  {transcript ? (
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{transcript}</p>
                  ) : (
                    <p className="text-gray-500 text-sm italic">
                      {isRecording ? "Listening... speak in Urdu or English to see live transcription" : "Start speaking to see live transcription..."}
                    </p>
                  )}
                </div>
                {transcript && (
                  <div className="mt-2 flex justify-between items-center text-xs text-gray-500">
                    <span>Words: {transcript.split(' ').length}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearTranscript}
                      className="h-6 px-2 text-xs"
                    >
                      Clear
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Current Question */}
            {currentQuestion && (
              <Card className="border-blue-200 bg-blue-50">
                <CardHeader>
                  <CardTitle className="text-blue-800">Shark Question</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-700 font-medium">{currentQuestion}</p>
                  <div className="mt-4">
                    <Textarea placeholder="Type your response here..." className="bg-white" />
                    <Button className="mt-2" size="sm">
                      Submit Response
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Sharks */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Active Sharks</span>
                </CardTitle>
                <CardDescription>AI sharks currently listening to your pitch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {sharks.map((shark) => (
                    <div key={shark.name} className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                          shark.active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
                        }`}
                      >
                        {shark.avatar}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{shark.name}</p>
                        <p className="text-xs text-gray-600">{shark.specialty}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${shark.active ? "bg-green-500" : "bg-gray-300"}`}></div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Question History */}
            {sharkQuestions.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Questions Asked</CardTitle>
                  <CardDescription>Shark questions during your pitch</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {sharkQuestions.map((q) => (
                      <div key={q.id} className="border-l-4 border-blue-500 pl-3 py-2">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-blue-600">{q.shark}</span>
                          <span className="text-xs text-gray-500">{q.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700">{q.question}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Pitch Summary */}
            {pitchSummary && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <span>AI Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-4">{pitchSummary}</p>
                  <Link href="/feedback">
                    <Button className="w-full">View Detailed Feedback</Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Live Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <p className="text-green-600">✓ Good eye contact with camera</p>
                  <p className="text-yellow-600">⚠ Speak slower for better transcription</p>
                  <p className="text-blue-600">💡 Mention specific numbers and metrics</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
