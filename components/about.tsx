"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export default function About() {
  const facts = [
    { emoji: "💻", text: "UI Lego builder" },
    { emoji: "🎧", text: "Chillhop fan" },
    { emoji: "💜", text: "Purple lover" },
    { emoji: "🌟", text: "Design systems enthusiast" },
    { emoji: "🚀", text: "Performance optimizer" },
    { emoji: "🧩", text: "Problem solver" },
  ]

  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-400">About Me</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-2 md:order-1">
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              I'm a passionate Full-Stack Developer with expertise in Laravel and React, dedicated to creating scalable,
              performant, and visually stunning web applications.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              My journey in tech is driven by a love for clean code, intuitive UX, and the perfect balance between
              functionality and aesthetics.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-8">
              {facts.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="border-purple-200 dark:border-purple-900/50 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 flex items-center gap-2">
                      <span className="text-xl">{fact.emoji}</span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{fact.text}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="order-1 md:order-2 flex justify-center"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 to-purple-700 opacity-20 blur-xl animate-pulse"></div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-purple-300 dark:border-purple-700">
                <Image src="/mai.jpeg" alt="Mai Al Moqayad" fill className="object-cover" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg">
                <Badge className="bg-purple-600 hover:bg-purple-700">
                  <span className="px-1">Full-Stack</span>
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
