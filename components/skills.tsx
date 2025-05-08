"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Skills() {
  const frontendSkills = [
    { name: "React", level: 90, icon: "⚛️" },
    { name: "JavaScript", level: 85, icon: "🟨" },
    { name: "TypeScript", level: 80, icon: "🔷" },
    { name: "HTML/CSS", level: 90, icon: "🎨" },
    { name: "Tailwind CSS", level: 85, icon: "🌊" },
    { name: "Framer Motion", level: 75, icon: "✨" },
    { name: "Storybook", level: 80, icon: "📚" },
  ]

  const backendSkills = [
    { name: "Laravel", level: 90, icon: "🔺" },
    { name: "PHP", level: 85, icon: "🐘" },
    { name: "MySQL", level: 80, icon: "🐬" },
    { name: "RESTful APIs", level: 85, icon: "🔄" },
    { name: "Node.js", level: 70, icon: "🟢" },
    { name: "AWS", level: 65, icon: "☁️" },
    { name: "Docker", level: 60, icon: "🐳" },
  ]

  const designSkills = [
    { name: "UI/UX Design", level: 85, icon: "🎯" },
    { name: "Figma", level: 80, icon: "🖌️" },
    { name: "Design Systems", level: 85, icon: "🧩" },
    { name: "Responsive Design", level: 90, icon: "📱" },
    { name: "Accessibility", level: 75, icon: "♿" },
    { name: "Animation", level: 70, icon: "🎬" },
  ]

  const SkillBar = ({ skill, index }: { skill: { name: string; level: number; icon: string }; index: number }) => (
    <motion.div
      className="mb-4"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {skill.icon} {skill.name}
        </span>
        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <motion.div
          className="bg-gradient-to-r from-purple-600 to-purple-400 h-2.5 rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
          viewport={{ once: true }}
        ></motion.div>
      </div>
    </motion.div>
  )

  return (
    <section id="skills" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">
            Tech Stack
          </span>
        </h2>

        <Card className="border-purple-200 dark:border-purple-900/50 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
          <CardContent className="p-6">
            <Tabs defaultValue="frontend" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger
                  value="frontend"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300"
                >
                  Frontend
                </TabsTrigger>
                <TabsTrigger
                  value="backend"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300"
                >
                  Backend
                </TabsTrigger>
                <TabsTrigger
                  value="design"
                  className="data-[state=active]:bg-purple-100 data-[state=active]:text-purple-800 dark:data-[state=active]:bg-purple-900/30 dark:data-[state=active]:text-purple-300"
                >
                  Design
                </TabsTrigger>
              </TabsList>

              <TabsContent value="frontend" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {frontendSkills.slice(0, 4).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                  <div>
                    {frontendSkills.slice(4).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="backend" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {backendSkills.slice(0, 4).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                  <div>
                    {backendSkills.slice(4).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="design" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    {designSkills.slice(0, 3).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                  <div>
                    {designSkills.slice(3).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} />
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-700 dark:text-gray-300 italic">
            "Code fueled by chillhop ☔️ and a passion for clean, scalable solutions."
          </p>
        </motion.div>
      </motion.div>
    </section>
  )
}
