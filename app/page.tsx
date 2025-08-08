import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, Video, Brain, Users, Globe, TrendingUp, Zap, Shield } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">🦈</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              Virtual Shark Tank Pakistan
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
            <Link href="/pitch">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                Start Pitching
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge className="mb-4 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            🚀 AI-Powered • Real-Time • Multilingual
          </Badge>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
            Pitch to AI Sharks in Real-Time
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Practice and perfect your startup pitch with AI-powered sharks trained on Shark Tank transcripts. Get
            instant feedback, multilingual support (Urdu/English), and investor-grade questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pitch">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
              >
                <Mic className="mr-2 h-5 w-5" />
                Start Live Pitch
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button size="lg" variant="outline">
                <Users className="mr-2 h-5 w-5" />
                View Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Video className="h-12 w-12 text-emerald-600 mb-4" />
                <CardTitle>Real-Time Video Pitching</CardTitle>
                <CardDescription>
                  Live video/audio pitching with WebRTC technology. Practice like you're in the real tank.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Globe className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Multilingual Support</CardTitle>
                <CardDescription>
                  Pitch in Urdu or English with real-time transcription and AI understanding.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Brain className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>AI Shark Agents</CardTitle>
                <CardDescription>
                  3-4 AI sharks with distinct personalities, trained on real Shark Tank transcripts.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Zap className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>RAG-Powered Intelligence</CardTitle>
                <CardDescription>
                  AI sharks use retrieval-augmented generation to ask relevant investor questions.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>Smart Scoring Engine</CardTitle>
                <CardDescription>
                  Get detailed feedback on Problem, Market, Revenue, Team, and Ask with AI analysis.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Human + AI Hybrid</CardTitle>
                <CardDescription>
                  Real investors can join sessions alongside AI sharks for authentic feedback.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-emerald-600">1</span>
              </div>
              <h3 className="font-semibold mb-2">Join Session</h3>
              <p className="text-gray-600 text-sm">Create your profile and join a live pitching session</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="font-semibold mb-2">Pitch Live</h3>
              <p className="text-gray-600 text-sm">Present your startup with real-time transcription</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="font-semibold mb-2">AI Questions</h3>
              <p className="text-gray-600 text-sm">Answer intelligent questions from AI sharks</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-semibold mb-2">Get Feedback</h3>
              <p className="text-gray-600 text-sm">Receive detailed scores and improvement tips</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Face the Sharks?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of Pakistani entrepreneurs perfecting their pitch</p>
          <Link href="/pitch">
            <Button size="lg" variant="secondary" className="bg-white text-emerald-600 hover:bg-gray-100">
              Start Your Pitch Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Virtual Shark Tank Pakistan. Empowering Pakistani startups with AI.</p>
        </div>
      </footer>
    </div>
  )
}
