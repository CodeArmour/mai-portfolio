"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Plus, ArrowLeft, Save, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock project data (same as in projects/page.tsx)
const initialProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description:
      "A full-stack e-commerce solution with Laravel backend and React frontend. Features include user authentication, product management, cart functionality, and payment integration.",
    image: "/purple-ecommerce-website.png",
    tags: ["Laravel", "React", "MySQL", "Stripe", "Redux"],
    liveUrl: "#",
    githubUrl: "#",
    challenge: "Optimizing database queries for large product catalogs while maintaining fast page loads.",
  },
  {
    id: 2,
    title: "Design System",
    description:
      "A comprehensive UI component library built with React and Storybook. Includes over 50 reusable components with documentation and usage examples.",
    image: "/purple-ui-library.png",
    tags: ["React", "TypeScript", "Storybook", "Styled Components", "Jest"],
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "Creating a consistent design language that works across multiple products while maintaining flexibility.",
  },
  {
    id: 3,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    image: "/purple-kanban-app.png",
    tags: ["Laravel", "Vue.js", "Pusher", "MySQL", "Tailwind CSS"],
    liveUrl: "#",
    githubUrl: "#",
    challenge:
      "Implementing real-time updates across multiple clients while handling race conditions and data consistency.",
  },
  {
    id: 4,
    title: "Portfolio Generator",
    description:
      "A tool that helps developers create beautiful portfolios without coding. Features customizable templates, themes, and content management.",
    image: "/portfolio-website-generator.png",
    tags: ["React", "Node.js", "MongoDB", "AWS S3", "Express"],
    liveUrl: "#",
    githubUrl: "#",
    challenge: "Creating a flexible template system that allows for customization while maintaining design integrity.",
  },
]

export default function ProjectFormPage({ params }: { params: { action: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const isNewProject = params.action === "new"
  const projectId = isNewProject ? null : Number.parseInt(params.action)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    tags: [] as string[],
    liveUrl: "",
    githubUrl: "",
    challenge: "",
  })

  const [newTag, setNewTag] = useState("")
  const [isLoading, setIsLoading] = useState(!isNewProject)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (!isNewProject && projectId) {
      // Fetch project data for editing
      // In a real app, you would fetch from your API/database
      const project = initialProjects.find((p) => p.id === projectId)

      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          image: project.image,
          tags: [...project.tags],
          liveUrl: project.liveUrl,
          githubUrl: project.githubUrl,
          challenge: project.challenge || "",
        })
      }

      setIsLoading(false)
    }
  }, [isNewProject, projectId])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        title: isNewProject ? "Project created" : "Project updated",
        description: isNewProject
          ? "Your new project has been added to your portfolio."
          : "Your project has been successfully updated.",
      })

      router.push("/admin/projects")
    } catch (error) {
      toast({
        title: "Error",
        description: "There was a problem saving your project.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-purple-600 dark:text-purple-400">Loading project data...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{isNewProject ? "Add New Project" : "Edit Project"}</h1>
          <p className="text-muted-foreground">
            {isNewProject ? "Create a new project for your portfolio" : "Update your existing project"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="E.g., E-Commerce Platform"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your project in detail"
                  className="min-h-[100px]"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="challenge">Challenge Solved</Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  value={formData.challenge}
                  onChange={handleChange}
                  placeholder="What technical challenges did you overcome?"
                  className="min-h-[80px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    name="liveUrl"
                    value={formData.liveUrl}
                    onChange={handleChange}
                    placeholder="https://example.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub URL</Label>
                  <Input
                    id="githubUrl"
                    name="githubUrl"
                    value={formData.githubUrl}
                    onChange={handleChange}
                    placeholder="https://github.com/username/repo"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="/path/to/image.jpg"
                  required
                />
                {formData.image && (
                  <div className="mt-2 relative h-40 w-full md:w-1/2 rounded-md overflow-hidden">
                    <Image
                      src={formData.image || "/placeholder.svg"}
                      alt="Project preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Technologies Used</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 rounded-full"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        <X className="h-3 w-3" />
                        <span className="sr-only">Remove {tag}</span>
                      </Button>
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a technology (e.g., React)"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="icon">
                    <Plus className="h-4 w-4" />
                    <span className="sr-only">Add tag</span>
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.push("/admin/projects")}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {!isNewProject && (
              <Button
                type="button"
                variant="destructive"
                onClick={() => {
                  // Handle delete logic
                  toast({
                    title: "Project deleted",
                    description: "Your project has been successfully deleted.",
                  })
                  router.push("/admin/projects")
                }}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            )}
            <Button type="submit" disabled={isSaving}>
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Project"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
