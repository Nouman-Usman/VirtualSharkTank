"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Users, Database, BarChart3, Upload, Edit, Plus, Eye, Download, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [sharks, setSharks] = useState([
    {
      id: 1,
      name: "Anupam Mittal",
      avatar: "AM",
      specialty: "Digital & Consumer",
      active: true,
      personality: "Direct, data-driven, focuses on scalability and market size",
      prompt:
        "You are Anupam Mittal, founder of People Group. You're known for asking tough questions about business models, customer acquisition, and scalability.",
      sessions: 156,
      avgScore: 3.8,
    },
    {
      id: 2,
      name: "Namita Thapar",
      avatar: "NT",
      specialty: "Healthcare & Pharma",
      active: true,
      personality: "Analytical, risk-aware, strong focus on compliance and regulations",
      prompt:
        "You are Namita Thapar, Executive Director of Emcure Pharmaceuticals. You focus on healthcare, compliance, and sustainable business practices.",
      sessions: 142,
      avgScore: 4.1,
    },
    {
      id: 3,
      name: "Aman Gupta",
      avatar: "AG",
      specialty: "Consumer Electronics",
      active: false,
      personality: "Energetic, marketing-focused, emphasizes brand building",
      prompt:
        "You are Aman Gupta, co-founder of boAt. You're passionate about consumer brands, marketing strategies, and youth-focused products.",
      sessions: 98,
      avgScore: 3.9,
    },
  ])

  const [sessions, setSessions] = useState([
    {
      id: 1,
      founder: "Ahmed Khan",
      startup: "EcoTech Solutions",
      date: "2024-01-15",
      duration: "12:34",
      sharks: ["Anupam", "Namita", "Vineeta"],
      score: 4.2,
      status: "completed",
    },
    {
      id: 2,
      founder: "Sara Ahmed",
      startup: "HealthCare AI",
      date: "2024-01-15",
      duration: "15:22",
      sharks: ["Namita", "Peyush"],
      score: 3.8,
      status: "completed",
    },
    {
      id: 3,
      founder: "Ali Hassan",
      startup: "EdTech Platform",
      date: "2024-01-15",
      duration: "ongoing",
      sharks: ["Anupam", "Aman"],
      score: null,
      status: "live",
    },
  ])

  const [editingShark, setEditingShark] = useState<number | null>(null)

  const toggleSharkActive = (id: number) => {
    setSharks(sharks.map((shark) => (shark.id === id ? { ...shark, active: !shark.active } : shark)))
  }

  const updateSharkPrompt = (id: number, prompt: string) => {
    setSharks(sharks.map((shark) => (shark.id === id ? { ...shark, prompt } : shark)))
    setEditingShark(null)
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
                Admin Panel
              </h1>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline">Super Admin</Badge>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">856</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Session Score</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.9</div>
              <p className="text-xs text-muted-foreground">+0.2 improvement</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RAG Documents</CardTitle>
              <Database className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2,456</div>
              <p className="text-xs text-muted-foreground">Transcript chunks</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="sharks" className="space-y-6">
          <TabsList>
            <TabsTrigger value="sharks">AI Sharks</TabsTrigger>
            <TabsTrigger value="sessions">Live Sessions</TabsTrigger>
            <TabsTrigger value="rag">RAG Management</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="sharks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">AI Shark Management</h2>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add New Shark
              </Button>
            </div>

            <div className="grid gap-6">
              {sharks.map((shark) => (
                <Card key={shark.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder.svg?height=48&width=48&query=${shark.name}`} />
                          <AvatarFallback>{shark.avatar}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle>{shark.name}</CardTitle>
                          <CardDescription>{shark.specialty}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right text-sm">
                          <div>{shark.sessions} sessions</div>
                          <div className="text-muted-foreground">Avg: {shark.avgScore}/5</div>
                        </div>
                        <Switch checked={shark.active} onCheckedChange={() => toggleSharkActive(shark.id)} />
                        <Badge variant={shark.active ? "default" : "secondary"}>
                          {shark.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Personality</h4>
                      <p className="text-sm text-gray-600">{shark.personality}</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">System Prompt</h4>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingShark(editingShark === shark.id ? null : shark.id)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                      {editingShark === shark.id ? (
                        <div className="space-y-2">
                          <Textarea
                            value={shark.prompt}
                            onChange={(e) =>
                              setSharks(sharks.map((s) => (s.id === shark.id ? { ...s, prompt: e.target.value } : s)))
                            }
                            rows={4}
                          />
                          <div className="flex space-x-2">
                            <Button size="sm" onClick={() => updateSharkPrompt(shark.id, shark.prompt)}>
                              Save
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => setEditingShark(null)}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{shark.prompt}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Live Sessions Monitor</h2>
              <Button variant="outline">
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Sessions</CardTitle>
                <CardDescription>Monitor ongoing and completed pitch sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold">{session.startup}</h3>
                          <Badge variant={session.status === "live" ? "destructive" : "secondary"}>
                            {session.status}
                          </Badge>
                          {session.score && (
                            <div className="flex items-center space-x-1">
                              <span className="text-sm">Score: {session.score}/5</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{session.founder}</span>
                          <span>{session.date}</span>
                          <span>{session.duration}</span>
                          <span>Sharks: {session.sharks.join(", ")}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          {session.status === "live" ? "Monitor" : "View"}
                        </Button>
                        {session.status === "completed" && (
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rag" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">RAG Document Management</h2>
              <Button>
                <Upload className="mr-2 h-4 w-4" />
                Upload Transcripts
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Document Statistics</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Total Documents</span>
                    <span className="font-medium">2,456</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shark Tank India</span>
                    <span className="font-medium">1,234</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shark Tank Pakistan</span>
                    <span className="font-medium">856</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custom Transcripts</span>
                    <span className="font-medium">366</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Vector Database Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Embeddings Generated</span>
                    <span className="font-medium">24,560</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Index Size</span>
                    <span className="font-medium">1.2 GB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated</span>
                    <span className="font-medium">2 hours ago</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Rebuild Index
                  </Button>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Upload New Transcripts</CardTitle>
                <CardDescription>Add new Shark Tank transcripts to improve AI responses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Episode Title</label>
                    <Input placeholder="e.g., Shark Tank India S2E15" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Category</label>
                    <Input placeholder="e.g., Technology, Healthcare" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Transcript Content</label>
                  <Textarea placeholder="Paste the full episode transcript here..." rows={6} />
                </div>
                <Button>
                  <Upload className="mr-2 h-4 w-4" />
                  Process & Add to RAG
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-bold">Platform Analytics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Daily Active Users</span>
                      <span className="font-medium">234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Session Duration</span>
                      <span className="font-medium">14:32</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Completion Rate</span>
                      <span className="font-medium">87%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return Users</span>
                      <span className="font-medium">65%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>AI Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Avg Response Time</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Question Relevance</span>
                      <span className="font-medium">4.3/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>RAG Accuracy</span>
                      <span className="font-medium">91%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Transcription Accuracy</span>
                      <span className="font-medium">94%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
