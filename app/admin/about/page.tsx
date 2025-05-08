"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Save, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock about data
const initialAboutData = {
  name: "Mai Al Moqayad",
  title: "Full-Stack Developer",
  bio: "I'm a passionate Full-Stack Developer with expertise in Laravel and React, dedicated to creating scalable, performant, and visually stunning web applications. My journey in tech is driven by a love for clean code, intuitive UX, and the perfect balance between functionality and aesthetics.",
  image: "/female-developer-purple.png",
  facts: [
    { emoji: "💻", text: "UI Lego builder" },
    { emoji: "🎧", text: "Chillhop fan" },
    { emoji: "💜", text: "Purple lover" },
    { emoji: "🌟", text: "Design systems enthusiast" },
    { emoji: "🚀", text: "Performance optimizer" },
    { emoji: "🧩", text: "Problem solver" },
  ],
}

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(initialAboutData)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [newFact, setNewFact] = useState({ emoji: "", text: "" })
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAboutData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddFact = () => {
    if (newFact.emoji && newFact.text) {
      setAboutData((prev) => ({
        ...prev,
        facts: [...prev.facts, { ...newFact }],
      }))
      setNewFact({ emoji: "", text: "" })
    }
  }

  const handleRemoveFact = (index: number) => {
    setAboutData((prev) => ({
      ...prev,
      facts: prev.facts.filter((_, i) => i !== index),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: "About section updated",
        description: "Your personal information has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your information.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-purple-600 dark:text-purple-400">Loading about data...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">About Me</h1>
          <p className="text-muted-foreground">Edit your personal information</p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="mr-2 h-4 w-4" />
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={aboutData.name}
                onChange={handleChange}
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Professional Title</Label>
              <Input
                id="title"
                name="title"
                value={aboutData.title}
                onChange={handleChange}
                placeholder="E.g., Full-Stack Developer"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={aboutData.bio}
                onChange={handleChange}
                placeholder="Write a short bio about yourself"
                className="min-h-[150px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Profile Image</Label>
              <div className="flex items-center gap-4">
                <div className="relative h-20 w-20 rounded-full overflow-hidden border-2 border-purple-200 dark:border-purple-800">
                  <Image src={aboutData.image || "/placeholder.svg"} alt="Profile" fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <Input
                    id="image"
                    name="image"
                    value={aboutData.image}
                    onChange={handleChange}
                    placeholder="/path/to/image.jpg"
                  />
                </div>
                <Button variant="outline" size="icon">
                  <Upload className="h-4 w-4" />
                  <span className="sr-only">Upload image</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 dark:border-gray-800">
          <CardHeader>
            <CardTitle>Personal Facts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {aboutData.facts.map((fact, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="flex items-center justify-between px-3 py-2 h-auto text-base bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-xl">{fact.emoji}</span>
                      <span>{fact.text}</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 rounded-full hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30"
                      onClick={() => handleRemoveFact(index)}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove fact</span>
                    </Button>
                  </Badge>
                ))}
              </div>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
                <h3 className="text-sm font-medium mb-3">Add New Fact</h3>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="Emoji"
                    value={newFact.emoji}
                    onChange={(e) => setNewFact((prev) => ({ ...prev, emoji: e.target.value }))}
                    className="w-20"
                  />
                  <Input
                    placeholder="Fact text"
                    value={newFact.text}
                    onChange={(e) => setNewFact((prev) => ({ ...prev, text: e.target.value }))}
                  />
                  <Button onClick={handleAddFact} size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add fact</span>
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add personal facts that showcase your personality. Use a single emoji and a short text.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
