import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Play, Users, Clock, Star, BarChart3, Trophy, Target, Lightbulb } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  const pitchHistory = [
    {
      id: 1,
      title: "EcoTech Solutions",
      date: "2024-01-15",
      duration: "12:34",
      score: 4.2,
      sharks: ["Anupam", "Namita", "Aman"],
      status: "completed",
      feedback: "Strong market opportunity, needs better financial projections",
    },
    {
      id: 2,
      title: "HealthCare AI",
      date: "2024-01-10",
      duration: "15:22",
      score: 3.8,
      sharks: ["Vineeta", "Peyush", "Anupam"],
      status: "completed",
      feedback: "Innovative solution, regulatory concerns need addressing",
    },
    {
      id: 3,
      title: "EdTech Platform",
      date: "2024-01-05",
      duration: "10:45",
      score: 4.5,
      sharks: ["Namita", "Aman", "Ghazal"],
      status: "completed",
      feedback: "Excellent execution, scalable business model",
    },
  ]

  const improvementTips = [
    "Focus on your unit economics - sharks love clear profit margins",
    "Practice your 2-minute elevator pitch for stronger openings",
    "Prepare for tough questions about competition and market size",
    "Show traction with real customer testimonials or revenue data",
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
                Virtual Shark Tank
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/pitch">
              <Button className="bg-gradient-to-r from-emerald-600 to-blue-600">
                <Play className="mr-2 h-4 w-4" />
                New Pitch
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back, Ahmed! 👋</h1>
          <p className="text-gray-600">Ready to perfect your next pitch?</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pitches</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.1</div>
              <p className="text-xs text-muted-foreground">+0.3 improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2h 45m</div>
              <p className="text-xs text-muted-foreground">Practice time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rank</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#47</div>
              <p className="text-xs text-muted-foreground">Out of 1,234 users</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="history" className="space-y-6">
          <TabsList>
            <TabsTrigger value="history">Pitch History</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="improvement">Improvement Tips</TabsTrigger>
          </TabsList>

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Pitches</CardTitle>
                <CardDescription>Your latest pitching sessions and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pitchHistory.map((pitch) => (
                    <div
                      key={pitch.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{pitch.title}</h3>
                          <Badge variant="secondary">{pitch.status}</Badge>
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{pitch.score}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-2">
                          <span>{pitch.date}</span>
                          <span>{pitch.duration}</span>
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{pitch.sharks.join(", ")}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{pitch.feedback}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Play className="h-4 w-4 mr-2" />
                        Replay
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Score Breakdown</CardTitle>
                  <CardDescription>Your performance across different criteria</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Problem Definition</span>
                      <span>4.2/5</span>
                    </div>
                    <Progress value={84} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Market Opportunity</span>
                      <span>3.8/5</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Revenue Model</span>
                      <span>3.5/5</span>
                    </div>
                    <Progress value={70} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Team Strength</span>
                      <span>4.5/5</span>
                    </div>
                    <Progress value={90} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ask & Valuation</span>
                      <span>3.9/5</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shark Preferences</CardTitle>
                  <CardDescription>Which sharks engage most with your pitches</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AN</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Anupam Mittal</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={85} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">85%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>NM</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Namita Thapar</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={72} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">72%</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/placeholder.svg?height=40&width=40" />
                        <AvatarFallback>AG</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-medium">Aman Gupta</p>
                        <div className="flex items-center space-x-2">
                          <Progress value={68} className="flex-1 h-2" />
                          <span className="text-sm text-gray-600">68%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="improvement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <span>AI-Generated Improvement Tips</span>
                </CardTitle>
                <CardDescription>Personalized recommendations based on your pitch history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {improvementTips.map((tip, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <Target className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recommended Practice Areas</CardTitle>
                <CardDescription>Focus on these areas in your next pitch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Financial Projections</h4>
                    <p className="text-sm text-gray-600 mb-3">Strengthen your revenue model and unit economics</p>
                    <Button variant="outline" size="sm">
                      Practice Now
                    </Button>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-medium mb-2">Market Size Analysis</h4>
                    <p className="text-sm text-gray-600 mb-3">Better articulate your TAM, SAM, and SOM</p>
                    <Button variant="outline" size="sm">
                      Practice Now
                    </Button>
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
