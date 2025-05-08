"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Star properties
    const stars: {
      x: number
      y: number
      radius: number
      color: string
      velocity: number
      alpha: number
      direction: number
    }[] = []

    // Create stars
    const createStars = () => {
      const isDark = theme === "dark"
      const starColors = [
        "rgba(168, 85, 247, 0.5)", // purple-500
        "rgba(192, 132, 252, 0.5)", // purple-400
        "rgba(216, 180, 254, 0.5)", // purple-300
        "rgba(147, 51, 234, 0.5)", // purple-600
        isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(107, 33, 168, 0.5)", // white or purple-800
      ]

      // Clear existing stars
      stars.length = 0

      // Create new stars
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const radius = Math.random() * 1.5 + 0.5
        const color = starColors[Math.floor(Math.random() * starColors.length)]
        const velocity = Math.random() * 0.05 + 0.01
        const alpha = Math.random() * 0.5 + 0.5
        const direction = Math.random() > 0.5 ? 1 : -1

        stars.push({ x, y, radius, color, velocity, alpha, direction })
      }
    }

    createStars()

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update stars
      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = star.alpha
        ctx.fill()

        // Update star position
        star.y += star.velocity * star.direction

        // Reset star if it goes off screen
        if (star.y > canvas.height) {
          star.y = 0
        } else if (star.y < 0) {
          star.y = canvas.height
        }

        // Twinkle effect
        star.alpha += star.velocity * (Math.random() > 0.5 ? 1 : -1) * 0.1
        if (star.alpha < 0.2) star.alpha = 0.2
        if (star.alpha > 1) star.alpha = 1
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Update stars when theme changes
    const themeObserver = new MutationObserver(() => {
      createStars()
    })

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
      themeObserver.disconnect()
    }
  }, [theme])

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />
}
