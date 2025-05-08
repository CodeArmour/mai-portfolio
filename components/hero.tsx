"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TypeAnimation } from "react-type-animation"

export default function Hero() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center items-center relative py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto"
      >
        <div className="mb-6 inline-block">
          <div className="relative w-24 h-24 mx-auto mb-4">
            <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-pulse"></div>
            <div className="absolute inset-2 rounded-full bg-purple-700/40"></div>
            <div className="absolute inset-4 rounded-full bg-purple-800/60"></div>
            <div className="absolute inset-6 rounded-full bg-purple-900/80 flex items-center justify-center text-white text-2xl font-bold">
              M
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300">
          <TypeAnimation
            sequence={["✨ Hi, I'm Mai Al Moqayad", 2000, "✨ Welcome to My Dev Galaxy", 2000]}
            wrapper="span"
            speed={50}
            repeat={Number.POSITIVE_INFINITY}
          />
        </h1>

        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8">
          Full-Stack Developer crafting beautiful digital experiences with
          <span className="text-purple-600 dark:text-purple-400 font-semibold"> Laravel + React</span>
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            View My Work
          </Button>
          <Button
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50"
            onClick={() => {
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
            }}
          >
            Get In Touch
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
          opacity: scrollY > 100 ? 0 : 1,
        }}
        transition={{
          y: { repeat: Number.POSITIVE_INFINITY, duration: 1.5, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-purple-600 dark:text-purple-400 animate-bounce"
          onClick={() => {
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <ChevronDown className="h-6 w-6" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </motion.div>
    </section>
  )
}
