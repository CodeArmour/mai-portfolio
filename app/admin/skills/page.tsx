"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Plus, Pencil, Trash2, Save } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock skills data
const initialSkills = {
  frontend: [
    { id: 1, name: "React", level: 90, icon: "⚛️" },
    { id: 2, name: "JavaScript", level: 85, icon: "🟨" },
    { id: 3, name: "TypeScript", level: 80, icon: "🔷" },
    { id: 4, name: "HTML/CSS", level: 90, icon: "🎨" },
    { id: 5, name: "Tailwind CSS", level: 85, icon: "🌊" },
    { id: 6, name: "Framer Motion", level: 75, icon: "✨" },
    { id: 7, name: "Storybook", level: 80, icon: "📚" },
  ],
  backend: [
    { id: 8, name: "Laravel", level: 90, icon: "🔺" },
    { id: 9, name: "PHP", level: 85, icon: "🐘" },
    { id: 10, name: "MySQL", level: 80, icon: "🐬" },
    { id: 11, name: "RESTful APIs", level: 85, icon: "🔄" },
    { id: 12, name: "Node.js", level: 70, icon: "🟢" },
    { id: 13, name: "AWS", level: 65, icon: "☁️" },
    { id: 14, name: "Docker", level: 60, icon: "🐳" },
  ],
  design: [
    { id: 15, name: "UI/UX Design", level: 85, icon: "🎯" },
    { id: 16, name: "Figma", level: 80, icon: "🖌️" },
    { id: 17, name: "Design Systems", level: 85, icon: "🧩" },
    { id: 18, name: "Responsive Design", level: 90, icon: "📱" },
    { id: 19, name: "Accessibility", level: 75, icon: "♿" },
    { id: 20, name: "Animation", level: 70, icon: "🎬" },
  ],
}

type Skill = {
  id: number
  name: string
  level: number
  icon: string
}

type SkillCategory = "frontend" | "backend" | "design"

export default function SkillsPage() {
  const [skills, setSkills] = useState(initialSkills)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<SkillCategory>("frontend")
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [newSkill, setNewSkill] = useState<Omit<Skill, "id">>({
    name: "",
    level: 75,
    icon: "🔹",
  })
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [skillToDelete, setSkillToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill)
  }

  const handleUpdateSkill = () => {
    if (editingSkill) {
      setSkills((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].map((skill) => (skill.id === editingSkill.id ? editingSkill : skill)),
      }))

      toast({
        title: "Skill updated",
        description: `${editingSkill.name} has been updated successfully.`,
      })

      setEditingSkill(null)
    }
  }

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      const newId =
        Math.max(
          ...Object.values(skills)
            .flat()
            .map((s) => s.id),
          0,
        ) + 1

      setSkills((prev) => ({
        ...prev,
        [activeTab]: [...prev[activeTab], { id: newId, ...newSkill }],
      }))

      toast({
        title: "Skill added",
        description: `${newSkill.name} has been added to your ${activeTab} skills.`,
      })

      setNewSkill({
        name: "",
        level: 75,
        icon: "🔹",
      })
    }
  }

  const handleDeleteClick = (skillId: number) => {
    setSkillToDelete(skillId)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (skillToDelete) {
      setSkills((prev) => ({
        ...prev,
        [activeTab]: prev[activeTab].filter((skill) => skill.id !== skillToDelete),
      }))

      toast({
        title: "Skill deleted",
        description: "The skill has been successfully deleted.",
      })

      setDeleteDialogOpen(false)
      setSkillToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-purple-600 dark:text-purple-400">Loading skills...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Skills</h1>
          <p className="text-muted-foreground">Manage your technical skills</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>Add a new skill to your {activeTab} skills section.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="new-skill-name">Skill Name</Label>
                <Input
                  id="new-skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
                  placeholder="E.g., React, Laravel, Figma"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-skill-icon">Icon (Emoji)</Label>
                <Input
                  id="new-skill-icon"
                  value={newSkill.icon}
                  onChange={(e) => setNewSkill((prev) => ({ ...prev, icon: e.target.value }))}
                  placeholder="E.g., 🔹, ⚛️, 🐘"
                />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="new-skill-level">Proficiency Level: {newSkill.level}%</Label>
                </div>
                <Slider
                  id="new-skill-level"
                  min={0}
                  max={100}
                  step={5}
                  value={[newSkill.level]}
                  onValueChange={(value) => setNewSkill((prev) => ({ ...prev, level: value[0] }))}
                  className="py-4"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setNewSkill({ name: "", level: 75, icon: "🔹" })}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill}>
                <Plus className="mr-2 h-4 w-4" />
                Add Skill
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="frontend" value={activeTab} onValueChange={(value) => setActiveTab(value as SkillCategory)}>
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="design">Design</TabsTrigger>
        </TabsList>

        {(["frontend", "backend", "design"] as const).map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {skills[category].map((skill) => (
              <Card key={skill.id} className="border-gray-200 dark:border-gray-800">
                <CardContent className="p-4">
                  {editingSkill && editingSkill.id === skill.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor={`edit-name-${skill.id}`}>Name</Label>
                          <Input
                            id={`edit-name-${skill.id}`}
                            value={editingSkill.name}
                            onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-icon-${skill.id}`}>Icon</Label>
                          <Input
                            id={`edit-icon-${skill.id}`}
                            value={editingSkill.icon}
                            onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`edit-level-${skill.id}`}>Level: {editingSkill.level}%</Label>
                          <Slider
                            id={`edit-level-${skill.id}`}
                            min={0}
                            max={100}
                            step={5}
                            value={[editingSkill.level]}
                            onValueChange={(value) => setEditingSkill({ ...editingSkill, level: value[0] })}
                            className="py-4"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" onClick={() => setEditingSkill(null)}>
                          Cancel
                        </Button>
                        <Button onClick={handleUpdateSkill}>
                          <Save className="mr-2 h-4 w-4" />
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="mr-4 text-2xl">{skill.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-sm text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${skill.level}%` }}></div>
                        </div>
                      </div>
                      <div className="ml-4 flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEditSkill(skill)}>
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit {skill.name}</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                          onClick={() => handleDeleteClick(skill.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete {skill.name}</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Skill</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this skill? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
