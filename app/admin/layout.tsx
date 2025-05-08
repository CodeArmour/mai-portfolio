"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeProvider } from "@/components/theme-provider"
import { ModeToggle } from "@/components/mode-toggle"
import { LayoutDashboard, User, Briefcase, Code, Mail, LogOut, Menu, X, ChevronRight } from "lucide-react"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    // Check if user is authenticated on client side
    const isAuthenticated = localStorage.getItem("adminAuthenticated") === "true"

    // If not authenticated and not on login page, redirect to login
    if (!isAuthenticated && !pathname.includes("/admin/login")) {
      router.push("/admin/login")
    }
  }, [pathname, router])

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("adminAuthenticated")

    // Clear cookie
    document.cookie = "adminAuthenticated=false; path=/; max-age=0"

    // Redirect to login
    router.push("/admin/login")
  }

  // Navigation items
  const navItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
    { icon: User, label: "About Me", href: "/admin/about" },
    { icon: Briefcase, label: "Projects", href: "/admin/projects" },
    { icon: Code, label: "Skills", href: "/admin/skills" },
    { icon: Mail, label: "Contact", href: "/admin/contact" },
  ]

  // Don't render anything on the server to avoid hydration mismatch
  if (!isMounted) return null

  // Don't render layout for login page
  if (pathname === "/admin/login") return children

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <div className="min-h-screen bg-gray-100 dark:bg-gray-950">
        {/* Mobile sidebar toggle */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="bg-white dark:bg-gray-900"
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transform transition-transform duration-200 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
        >
          <div className="h-full flex flex-col">
            <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
              <Link href="/admin/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                  M
                </div>
                <span className="text-lg font-semibold">Mai's Admin</span>
              </Link>
            </div>

            <nav className="flex-1 overflow-y-auto py-4 px-3">
              <ul className="space-y-1">
                {navItems.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center px-3 py-2 rounded-md text-sm font-medium group transition-colors ${
                          isActive
                            ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon
                          className={`mr-3 h-5 w-5 ${isActive ? "text-purple-600 dark:text-purple-400" : ""}`}
                        />
                        {item.label}
                        {isActive && <ChevronRight className="ml-auto h-4 w-4" />}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-purple-200 dark:bg-purple-800 flex items-center justify-center">
                    <User className="h-4 w-4 text-purple-700 dark:text-purple-300" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium">Mai Al Moqayad</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                  </div>
                </div>
                <ModeToggle />
              </div>
              <Button
                variant="outline"
                className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-800 dark:text-purple-300 dark:hover:bg-purple-900/30"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className={`transition-all duration-200 ease-in-out ${isSidebarOpen ? "lg:ml-64" : ""}`}>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  )
}
