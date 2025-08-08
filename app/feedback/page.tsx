import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Star,
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  DollarSign,
  Lightbulb,
  MessageSquare,
  Download,
  Share2,
} from "lucide-react"
import Link from "next/link"

export default function FeedbackPage() {
  const overallScore = 4.2
  const scores = {
    problem: 4.5,
    market: 3.8,
    revenue: 3.5,
    team: 4.8,
    ask: 4.0,
  }

  const sharkFeedback = [
    {
      name: "Anupam Mittal",
      avatar: "AM",
      score: 4.3,
      feedback:
        "Strong problem identification and clear market need. However, I'd like to see more detailed financial projections and a clearer path to profitability. Your team seems capable, but consider bringing in someone with deep industry experience.",
      investment: "Interested - Would invest ₹1.5 crore for 20% equity",
      questions: [
        "What's your customer acquisition cost?",
        "How do you plan to scale across Pakistan?",
        "What are your unit economics?",
      ],
    },
    {
      name: "Namita Thapar",
      avatar: "NT",
      score: 4.0,
      feedback:
        "I appreciate the environmental impact of your solution. The technology seems sound, but I'm concerned about regulatory challenges and the competitive landscape. You need to address compliance issues more thoroughly.",
      investment: "Conditional - Need to see regulatory clearances first",
      questions: [
        "Have you obtained environmental clearances?",
        "Who are your main competitors?",
        "What's your regulatory strategy?",
      ],
    },
    {
      name: "Vineeta Singh",
      avatar: "VS",
      score: 4.4,
      feedback:
        "Excellent presentation skills and clear communication. Your passion for the problem is evident. The business model is solid, but I'd suggest focusing on B2B partnerships initially rather than direct consumer approach.",
      investment: "Interested - ₹2 crore for 18% equity",
      questions: [
        "Why B2C over B2B initially?",
        "What's your go-to-market strategy?",
        "How will you handle seasonality?",
      ],
    },
  ]

  const improvements = [
    {
      category: "Financial Projections",
      priority: "High",
      description: "Provide more detailed 3-year financial forecasts with clear assumptions",
      impact: "Critical for investor confidence",
    },
    {
      category: "Competitive Analysis",
      priority: "Medium",
      description: "Better articulate your competitive advantages and market positioning",
      impact: "Helps differentiate your solution",
    },
    {
      category: "Regulatory Strategy",
      priority: "High",
      description: "Address compliance requirements and regulatory risks upfront",
      impact: "Essential for market entry",
    },
    {
      category: "Team Expansion",
      priority: "Medium",
      description: "Consider adding industry veterans to your advisory board",
      impact: "Adds credibility and expertise",
    },
  ]

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
                Pitch Feedback
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="outline">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Link href="/pitch">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">New Pitch</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">EcoTech Solutions - Pitch Feedback</h1>
              <p className="text-gray-600">Session completed on January 15, 2024 • Duration: 12:34</p>
            </div>
            <div className="text-right">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-6 w-6 text-yellow-500 fill-current" />
                <span className="text-3xl font-bold">{overallScore}</span>
                <span className="text-gray-500">/5.0</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Strong Performance</Badge>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sharks">Shark Feedback</TabsTrigger>
            <TabsTrigger value="improvements">Improvements</TabsTrigger>
            <TabsTrigger value="transcript">Transcript</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Score Breakdown */}
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span>Problem</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{scores.problem}</div>
                  <Progress value={scores.problem * 20} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">Clear problem definition</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-green-600" />
                    <span>Market</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{scores.market}</div>
                  <Progress value={scores.market * 20} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">Market size analysis</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-yellow-600" />
                    <span>Revenue</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{scores.revenue}</div>
                  <Progress value={scores.revenue * 20} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">Business model clarity</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Users className="h-4 w-4 text-purple-600" />
                    <span>Team</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{scores.team}</div>
                  <Progress value={scores.team * 20} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">Team strength</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center space-x-2">
                    <Target className="h-4 w-4 text-red-600" />
                    <span>Ask</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{scores.ask}</div>
                  <Progress value={scores.ask * 20} className="h-2" />
                  <p className="text-xs text-gray-600 mt-2">Valuation & ask</p>
                </CardContent>
              </Card>
            </div>

            {/* Key Insights */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600 flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Strengths</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Clear problem identification with strong market need</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Excellent team composition and relevant experience</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Proven technology with existing partnerships</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-green-600 mt-1">•</span>
                      <span>Strong presentation skills and clear communication</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600 flex items-center space-x-2">
                    <TrendingDown className="h-5 w-5" />
                    <span>Areas for Improvement</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Financial projections need more detail and validation</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Regulatory compliance strategy requires attention</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Competitive analysis could be more comprehensive</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-red-600 mt-1">•</span>
                      <span>Go-to-market strategy needs refinement</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Investment Interest */}
            <Card>
              <CardHeader>
                <CardTitle>Investment Interest Summary</CardTitle>
                <CardDescription>Sharks showing interest in your startup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">2</div>
                    <div className="text-sm text-green-700">Interested Sharks</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-600 mb-1">1</div>
                    <div className="text-sm text-yellow-700">Conditional Interest</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">₹3.5Cr</div>
                    <div className="text-sm text-blue-700">Total Potential Investment</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sharks" className="space-y-6">
            {sharkFeedback.map((shark, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={`/placeholder.svg?height=48&width=48&query=${shark.name}`} />
                        <AvatarFallback>{shark.avatar}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle>{shark.name}</CardTitle>
                        <div className="flex items-center space-x-2">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{shark.score}/5.0</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={shark.investment.includes("Interested") ? "default" : "secondary"}>
                      {shark.investment.includes("Interested") ? "Interested" : "Conditional"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Feedback</h4>
                    <p className="text-sm text-gray-700">{shark.feedback}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Investment Decision</h4>
                    <p className="text-sm font-medium text-blue-600">{shark.investment}</p>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Questions Asked</h4>
                    <ul className="space-y-1">
                      {shark.questions.map((question, qIndex) => (
                        <li key={qIndex} className="text-sm text-gray-600 flex items-start space-x-2">
                          <MessageSquare className="h-3 w-3 mt-1 flex-shrink-0" />
                          <span>{question}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="improvements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span>Improvement Recommendations</span>
                </CardTitle>
                <CardDescription>AI-generated suggestions based on shark feedback and pitch analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvements.map((improvement, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{improvement.category}</h4>
                        <Badge variant={improvement.priority === "High" ? "destructive" : "secondary"}>
                          {improvement.priority} Priority
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{improvement.description}</p>
                      <p className="text-xs text-blue-600 font-medium">{improvement.impact}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Next Steps</CardTitle>
                <CardDescription>Recommended actions to improve your pitch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span className="text-sm">Prepare detailed 3-year financial projections with assumptions</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span className="text-sm">Research and address regulatory compliance requirements</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span className="text-sm">Conduct comprehensive competitive analysis and positioning</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                      4
                    </div>
                    <span className="text-sm">Schedule follow-up meetings with interested sharks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transcript" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Full Pitch Transcript</CardTitle>
                <CardDescription>Complete transcription of your pitch session with timestamps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 rounded-lg p-4 max-h-[600px] overflow-y-auto">
                  <div className="space-y-4 text-sm">
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">00:00</span>
                      <p>
                        <strong>Ahmed:</strong> Hello sharks, my name is Ahmed and I'm the founder of EcoTech Solutions.
                        We're solving the problem of plastic waste in Pakistan's major cities.
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">00:15</span>
                      <p>
                        <strong>Ahmed:</strong> Our innovative recycling technology can process 500kg of plastic per
                        hour, converting it into high-quality recycled pellets.
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">00:30</span>
                      <p>
                        <strong>Ahmed:</strong> We've already secured partnerships with three major municipalities in
                        Karachi, Lahore, and Islamabad.
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">00:45</span>
                      <p>
                        <strong>Anupam:</strong> Ahmed, what's your customer acquisition cost and how do you plan to
                        scale this across Pakistan?
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">01:00</span>
                      <p>
                        <strong>Ahmed:</strong> Great question, Anupam. Our customer acquisition cost is relatively low
                        since we're working directly with municipal governments...
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">02:15</span>
                      <p>
                        <strong>Namita:</strong> I'm concerned about the regulatory challenges. Have you obtained the
                        necessary environmental clearances?
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">02:30</span>
                      <p>
                        <strong>Ahmed:</strong> We're currently in the process of obtaining all necessary clearances.
                        We've engaged with environmental consultants...
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">03:45</span>
                      <p>
                        <strong>Vineeta:</strong> Why B2C over B2B initially? What's your go-to-market strategy?
                      </p>
                    </div>
                    <div className="flex space-x-3">
                      <span className="text-gray-500 font-mono text-xs">04:00</span>
                      <p>
                        <strong>Ahmed:</strong> Actually, we're focusing on B2B partnerships first. Our go-to-market
                        strategy involves...
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
