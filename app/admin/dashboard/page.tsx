"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Briefcase, Code, Eye, User, Mail, ArrowRight } from "lucide-react"

export default function DashboardPage() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    messages: 0,
  })

  useEffect(() => {
    // In a real app, you would fetch this data from your API/database
    // For demo purposes, we'll use mock data
    const fetchStats = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      setStats({
        projects: 4,
        skills: 20,
        messages: 8,
      })
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: "Projects",
      description: "Manage your portfolio projects",
      icon: Briefcase,
      value: stats.projects,
      href: "/admin/projects",
      color: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    },
    {
      title: "Skills",
      description: "Update your technical skills",
      icon: Code,
      value: stats.skills,
      href: "/admin/skills",
      color: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    },
    {
      title: "About Me",
      description: "Edit your personal information",
      icon: User,
      value: null,
      href: "/admin/about",
      color: "bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300",
    },
    {
      title: "Messages",
      description: "View contact form submissions",
      icon: Mail,
      value: stats.messages,
      href: "/admin/contact",
      color: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
    },
  ]

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Mai! Manage your portfolio content.</p>
        </div>
        <Button asChild>
          <Link href="/" target="_blank">
            <Eye className="mr-2 h-4 w-4" />
            View Portfolio
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.title} className="border-gray-200 dark:border-gray-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className={`p-2 rounded-lg ${card.color}`}>
                  <card.icon className="h-5 w-5" />
                </div>
                {card.value !== null && <span className="text-2xl font-bold">{card.value}</span>}
              </div>
            </CardHeader>
            <CardContent>
              <CardTitle className="text-lg">{card.title}</CardTitle>
              <CardDescription>{card.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link href={card.href}>
                  Manage
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest portfolio updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "Updated project", item: "E-Commerce Platform", time: "2 hours ago" },
                { action: "Added new skill", item: "Framer Motion", time: "Yesterday" },
                { action: "Edited about section", item: "Personal bio", time: "3 days ago" },
                { action: "Received message", item: "from john@example.com", time: "1 week ago" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-4 text-sm">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <div className="flex-1">
                    <p>
                      <span className="font-medium">{activity.action}</span> - {activity.item}
                    </p>
                  </div>
                  <div className="text-muted-foreground">{activity.time}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you might want to perform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/projects/new">
                <Briefcase className="mr-2 h-4 w-4" />
                Add New Project
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/skills">
                <Code className="mr-2 h-4 w-4" />
                Add New Skill
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/about">
                <User className="mr-2 h-4 w-4" />
                Update About Me
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start" asChild>
              <Link href="/admin/contact">
                <Mail className="mr-2 h-4 w-4" />
                View Messages
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
