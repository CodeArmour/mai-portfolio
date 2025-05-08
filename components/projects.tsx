"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ExternalLink, Github, Maximize2 } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  const projects = [
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
      challenge:
        "Creating a flexible template system that allows for customization while maintaining design integrity.",
    },
  ]

  return (
    <section id="projects" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            My Planets
          </span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Explore the projects in my development galaxy — each one represents a unique challenge conquered and skills
          mastered.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-purple-200 dark:border-purple-900/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm h-full flex flex-col group">
                <div className="relative overflow-hidden h-48">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white bg-black/20 backdrop-blur-sm hover:bg-black/40"
                      onClick={() => setSelectedProject(project.id)}
                    >
                      <Maximize2 className="h-5 w-5" />
                      <span className="sr-only">View details</span>
                    </Button>
                  </div>
                </div>
                <CardContent className="p-6 flex-grow">
                  <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">{project.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="px-6 pb-6 pt-0 flex gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50"
                    asChild
                  >
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Live Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        <Dialog open={selectedProject !== null} onOpenChange={() => setSelectedProject(null)}>
          {selectedProject && (
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>{projects[selectedProject - 1].title}</DialogTitle>
                <DialogDescription>{projects[selectedProject - 1].description}</DialogDescription>
              </DialogHeader>
              <div className="relative h-64 sm:h-80 my-4 rounded-md overflow-hidden">
                <Image
                  src={projects[selectedProject - 1].image || "/placeholder.svg"}
                  alt={projects[selectedProject - 1].title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {projects[selectedProject - 1].tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-purple-600 dark:text-purple-400 mb-1">Challenge Solved</h4>
                  <p className="text-gray-700 dark:text-gray-300">{projects[selectedProject - 1].challenge}</p>
                </div>
                <div className="flex gap-3 pt-2">
                  <Button
                    variant="outline"
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50"
                    asChild
                  >
                    <a href={projects[selectedProject - 1].githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white" asChild>
                    <a href={projects[selectedProject - 1].liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Visit Live Site
                    </a>
                  </Button>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      </motion.div>
    </section>
  )
}
