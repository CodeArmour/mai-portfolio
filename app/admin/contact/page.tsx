"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Trash2, Archive, Reply } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Mock messages data
const initialMessages = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    message:
      "Hi Mai, I'm impressed by your portfolio and would like to discuss a potential collaboration on an e-commerce project. We're looking for someone with your skills to help us build a modern, user-friendly online store. Please let me know if you're interested and available for a quick chat this week.",
    date: "2023-05-01T10:30:00Z",
    read: true,
    archived: false,
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@techcompany.com",
    message:
      "Hello Mai, I'm reaching out from TechCompany Inc. We have an opening for a senior full-stack developer position that I think would be a great fit for your skills and experience. Would you be interested in learning more about this opportunity?",
    date: "2023-05-03T14:15:00Z",
    read: true,
    archived: false,
  },
  {
    id: 3,
    name: "Alex Rodriguez",
    email: "alex@designstudio.com",
    message:
      "Mai, I love your design work! I'm working on a design system for a client and would love to get your input. Do you offer consulting services? If so, what are your rates and availability?",
    date: "2023-05-05T09:45:00Z",
    read: false,
    archived: false,
  },
  {
    id: 4,
    name: "Emily Chen",
    email: "emily@startup.io",
    message:
      "Hi Mai, I'm the founder of a new startup focused on educational technology. We're looking for a developer who can help us build our MVP. Your portfolio caught my eye, especially your work with React and Laravel. Would you be available for a project starting next month?",
    date: "2023-05-07T16:20:00Z",
    read: false,
    archived: false,
  },
  {
    id: 5,
    name: "Michael Brown",
    email: "michael@agency.co",
    message:
      "Hello Mai, I'm a project manager at Digital Agency Co. We're expanding our team of freelance developers and your skills would be a great addition to our network. If you're interested in occasional project work, please let me know and we can discuss the details.",
    date: "2023-05-10T11:05:00Z",
    read: true,
    archived: true,
  },
  {
    id: 6,
    name: "Jessica Lee",
    email: "jessica@client.com",
    message:
      "Mai, I need help with updating my company website. It's currently built with WordPress but we're looking to migrate to a more modern stack. Based on your portfolio, I think you'd be perfect for this job. Can we schedule a call to discuss the project scope and your availability?",
    date: "2023-05-12T13:40:00Z",
    read: true,
    archived: true,
  },
  {
    id: 7,
    name: "David Wilson",
    email: "david@recruiter.net",
    message:
      "Hello Mai, I'm a tech recruiter specializing in developer roles. I have several clients looking for full-stack developers with your skill set. Would you be open to discussing some exciting opportunities? Even if you're not actively looking, it's always good to network!",
    date: "2023-05-15T15:30:00Z",
    read: false,
    archived: true,
  },
  {
    id: 8,
    name: "Olivia Martinez",
    email: "olivia@techblog.com",
    message:
      "Hi Mai, I'm an editor at TechBlog. We're looking for guest contributors who can write about their experiences with modern web development. Would you be interested in writing an article about your journey as a full-stack developer or perhaps a technical tutorial based on your expertise?",
    date: "2023-05-18T10:15:00Z",
    read: false,
    archived: false,
  },
]

type Message = {
  id: number
  name: string
  email: string
  message: string
  date: string
  read: boolean
  archived: boolean
}

export default function ContactPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("inbox")
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [messageToDelete, setMessageToDelete] = useState<number | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const inboxMessages = messages.filter((msg) => !msg.archived)
  const archivedMessages = messages.filter((msg) => msg.archived)
  const unreadCount = messages.filter((msg) => !msg.read && !msg.archived).length

  const handleMessageClick = (message: Message) => {
    // Mark as read if unread
    if (!message.read) {
      setMessages(messages.map((msg) => (msg.id === message.id ? { ...msg, read: true } : msg)))
    }

    setSelectedMessage(message)
  }

  const handleArchive = (id: number) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, archived: true } : msg)))

    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }

    toast({
      title: "Message archived",
      description: "The message has been moved to the archive.",
    })
  }

  const handleUnarchive = (id: number) => {
    setMessages(messages.map((msg) => (msg.id === id ? { ...msg, archived: false } : msg)))

    if (selectedMessage?.id === id) {
      setSelectedMessage(null)
    }

    toast({
      title: "Message restored",
      description: "The message has been moved back to the inbox.",
    })
  }

  const handleDeleteClick = (id: number) => {
    setMessageToDelete(id)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (messageToDelete) {
      setMessages(messages.filter((msg) => msg.id !== messageToDelete))

      if (selectedMessage?.id === messageToDelete) {
        setSelectedMessage(null)
      }

      toast({
        title: "Message deleted",
        description: "The message has been permanently deleted.",
      })

      setDeleteDialogOpen(false)
      setMessageToDelete(null)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-pulse text-purple-600 dark:text-purple-400">Loading messages...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Manage contact form submissions</p>
        </div>
      </div>

      <Tabs defaultValue="inbox" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="inbox" className="relative">
            Inbox
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-purple-600 hover:bg-purple-700 text-white absolute -top-2 -right-2">
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>

        <div className="grid md:grid-cols-[300px_1fr] gap-4">
          <Card className="border-gray-200 dark:border-gray-800 md:h-[calc(100vh-220px)] flex flex-col">
            <CardHeader className="px-3 py-2">
              <CardTitle className="text-sm font-medium">
                {activeTab === "inbox" ? "Inbox" : "Archived Messages"}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 overflow-auto flex-1">
              <TabsContent value="inbox" className="m-0">
                {inboxMessages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No messages in your inbox</div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {inboxMessages.map((message) => (
                      <button
                        key={message.id}
                        className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 ${
                          selectedMessage?.id === message.id ? "bg-gray-100 dark:bg-gray-800/50" : ""
                        } ${!message.read ? "font-medium" : ""}`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="truncate">{message.name}</span>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">
                            {formatDate(message.date)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">{message.email}</div>
                        {!message.read && (
                          <div className="mt-1">
                            <Badge
                              variant="outline"
                              className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-800"
                            >
                              New
                            </Badge>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>

              <TabsContent value="archived" className="m-0">
                {archivedMessages.length === 0 ? (
                  <div className="p-4 text-center text-muted-foreground">No archived messages</div>
                ) : (
                  <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {archivedMessages.map((message) => (
                      <button
                        key={message.id}
                        className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800/50 ${
                          selectedMessage?.id === message.id ? "bg-gray-100 dark:bg-gray-800/50" : ""
                        }`}
                        onClick={() => handleMessageClick(message)}
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="truncate">{message.name}</span>
                          <span className="text-xs text-muted-foreground ml-2 shrink-0">
                            {formatDate(message.date)}
                          </span>
                        </div>
                        <div className="text-sm text-muted-foreground truncate">{message.email}</div>
                      </button>
                    ))}
                  </div>
                )}
              </TabsContent>
            </CardContent>
          </Card>

          <Card className="border-gray-200 dark:border-gray-800 md:h-[calc(100vh-220px)] flex flex-col">
            {selectedMessage ? (
              <>
                <CardHeader className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex flex-row justify-between items-center">
                  <div>
                    <CardTitle>{selectedMessage.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{selectedMessage.email}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${selectedMessage.email}`}>
                        <Reply className="h-4 w-4" />
                        <span className="sr-only">Reply</span>
                      </a>
                    </Button>
                    {selectedMessage.archived ? (
                      <Button variant="outline" size="icon" onClick={() => handleUnarchive(selectedMessage.id)}>
                        <Mail className="h-4 w-4" />
                        <span className="sr-only">Move to inbox</span>
                      </Button>
                    ) : (
                      <Button variant="outline" size="icon" onClick={() => handleArchive(selectedMessage.id)}>
                        <Archive className="h-4 w-4" />
                        <span className="sr-only">Archive</span>
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-900/20"
                      onClick={() => handleDeleteClick(selectedMessage.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-6 overflow-auto flex-1">
                  <div className="mb-4 text-sm text-muted-foreground">{formatDate(selectedMessage.date)}</div>
                  <div className="whitespace-pre-line">{selectedMessage.message}</div>
                </CardContent>
              </>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
                  <p>Select a message to view</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </Tabs>

      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Message</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this message? This action cannot be undone.
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
