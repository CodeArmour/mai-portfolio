"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-purple-50 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        {/* Animated 404 */}
        <div className="relative h-40 mb-8">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-300">
              4
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, y: -80, rotate: -20 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
          >
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 rounded-full bg-purple-600/20 animate-pulse"></div>
              <div className="absolute inset-2 rounded-full bg-purple-700/40"></div>
              <div className="absolute inset-4 rounded-full bg-purple-800/60"></div>
              <motion.div
                className="absolute inset-6 rounded-full bg-purple-900/80 flex items-center justify-center text-white text-2xl font-bold"
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                }}
              >
                0
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-purple-600 ml-32">
              4
            </div>
          </motion.div>
        </div>

        {/* Stars animation */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-500 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        <motion.h1
          className="text-3xl font-bold mb-4 text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Page Not Found
        </motion.h1>

        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Oops! It seems you've ventured into the void of Mai's galaxy. This star doesn't exist or has collapsed into a
          black hole.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Button
            onClick={() => router.back()}
            variant="outline"
            className="border-purple-600 text-purple-600 hover:bg-purple-100 dark:border-purple-400 dark:text-purple-400 dark:hover:bg-purple-950/50"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button asChild className="bg-purple-600 hover:bg-purple-700 text-white">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Return Home
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
