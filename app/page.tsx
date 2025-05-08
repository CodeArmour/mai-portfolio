import Hero from "@/components/hero"
import About from "@/components/about"
import Skills from "@/components/skills"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import AnimatedBackground from "@/components/animated-background"
import NebulaGradients from "@/components/nebula-gradients"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <main className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-white dark:from-gray-950 dark:via-purple-950/20 dark:to-gray-950 overflow-hidden">
        <AnimatedBackground />
        <NebulaGradients />
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Contact />
          <Footer />
        </div>
      </main>
    </ThemeProvider>
  )
}
