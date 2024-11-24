"use client"

import { useEffect, useRef, useState } from 'react'
import { useUser, SignInButton } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2, Send } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { format } from 'date-fns';

interface Message {
  id: string
  content: string
  type: string
  user_id: string
  username: string
  user_image?: string | null
  created_at: string
}

export default function CommunityPage() {
  const { user, isLoaded } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!user) return

    const fetchMessages = async () => {
      try {
        setIsLoading(true)
        const { data, error } = await supabase
          .from('active_messages')  // Using the view for active messages
          .select('*')
          .order('created_at', { ascending: true })

        if (error) {
          console.error('Error fetching messages:', error)
          throw error
        }

        setMessages(data || [])
        setTimeout(scrollToBottom, 100)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch messages'
        console.error('Error details:', err)
        toast.error(errorMessage)
        setError(errorMessage)
      } finally {
        setIsLoading(false)
      }
    }

    // Set up Supabase real-time subscription
    const channel = supabase
      .channel('public:messages')
      .on(
        'postgres_changes',
        {
          event: '*',  // Listen to all changes
          schema: 'public',
          table: 'messages'
        },
        (payload) => {
          console.log('Realtime update:', payload)
          
          if (payload.eventType === 'INSERT') {
            const newMessage = payload.new as Message
            setMessages(current => [...current, newMessage])
            setTimeout(scrollToBottom, 100)
          } else if (payload.eventType === 'UPDATE' && (payload.new as any).deleted_at) {
            // Remove deleted messages
            const deletedId = payload.old.id
            setMessages(current => current.filter(msg => msg.id !== deletedId))
          }
        }
      )
      .subscribe((status) => {
        console.log('Subscription status:', status)
      })

    fetchMessages()

    return () => {
      channel.unsubscribe()
    }
  }, [user])

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !newMessage.trim()) return

    try {
      const messageData = {
        content: newMessage.trim(),
        user_id: user.id,
        username: user.username || user.firstName || 'Anonymous',
        user_image: user.imageUrl || null,
        type: 'user'
      }

      const { data, error } = await supabase
        .from('messages')
        .insert([messageData])
        .select()
        .single()

      if (error) {
        console.error('Error details:', {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint
        })
        throw error
      }

      console.log('Message sent successfully:', data)
      setNewMessage('')
    } catch (err) {
      console.error('Error sending message:', err)
      toast.error(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  const deleteMessage = async (messageId: string) => {
    if (!user) return

    try {
      const { error } = await supabase
        .rpc('soft_delete_message', { 
          message_id: messageId,
          user_identifier: user.id
        })

      if (error) throw error
      toast.success('Message deleted')
    } catch (err) {
      console.error('Error deleting message:', err)
      toast.error('Failed to delete message')
    }
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] space-y-4">
        <p className="text-muted-foreground">Please sign in to access the chat</p>
        <SignInButton>
          <Button>
            Sign In
          </Button>
        </SignInButton>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
        <div className="flex flex-col h-[calc(100vh-200px)]">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold">Community Chat</h2>
            <p className="text-sm text-muted-foreground">
              Chat with other learners in real-time
            </p>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            {isLoading && messages.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-4">
                {error && (
                  <div className="p-4 mb-4 text-sm text-red-500 bg-red-50 rounded-lg">
                    {error}
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.user_id === user?.id ? 'justify-end' : ''
                    }`}
                  >
                    {message.user_id !== user?.id && message.user_image && (
                      <img
                        src={message.user_image}
                        alt={message.username}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div
                      className={`flex flex-col rounded-lg px-4 py-2 max-w-[80%] ${
                        message.user_id === user?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      {message.user_id !== user?.id && (
                        <div className="text-sm font-medium mb-1">
                          {message.username}
                        </div>
                      )}
                      <div className="text-sm break-words">{message.content}</div>
                      <div className={`text-xs mt-1 ${
                        message.user_id === user?.id
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}>
                        {format(new Date(message.created_at), 'MMM d, h:mm a')}
                      </div>
                    </div>
                    {message.user_id === user?.id && message.user_image && (
                      <img
                        src={message.user_image}
                        alt={message.username}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                  </div>
                ))}
                <div ref={scrollRef} />
              </div>
            )}
          </ScrollArea>

          <form onSubmit={sendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                type="submit" 
                disabled={isLoading || !newMessage.trim()}
                className="flex-shrink-0"
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Send className="h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
