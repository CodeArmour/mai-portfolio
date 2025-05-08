"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { ArrowUp } from "lucide-react"

export default function Footer() {
  return (
    <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-700 dark:text-gray-300 text-center md:text-left">Built with 💜 by Mai Al Moqayad</p>
        </motion.div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-purple-600 dark:text-purple-400"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
          >
            <ArrowUp className="h-5 w-5" />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}
