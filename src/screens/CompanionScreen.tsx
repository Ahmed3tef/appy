import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronLeft, Send, Sparkles, Heart, Zap, Moon, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DEMO_CHAT_HISTORY, DEMO_VITALS_TODAY } from "@/data/demo"
import { cn } from "@/lib/utils"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  time: string
}

const QUICK_PROMPTS = [
  "I feel tired today",
  "How's my progress?",
  "I'm not motivated",
  "Should I exercise?",
]

const DEMO_RESPONSES: Record<string, string> = {
  "I feel tired today": "That's understandable — you slept 6.2 hours last night, which is below your average of 7.5. Let's take it a bit easier today. I'd suggest a light walk and plenty of water. You've had 1.2L so far, which is good. Your 14-day streak shows how consistent you've been, so one lighter day won't set you back.",
  "How's my progress?": "You're doing well! Since January, you've gone from 94 kg to 87.2 kg — that's nearly 7 kg. Your weekly workouts went from 1 to 4, and your energy levels improved from 4/10 to 7/10. The setback in May was temporary, and you bounced back stronger in July with your best month yet.",
  "I'm not motivated": "I understand — motivation comes and goes, but your consistency tells a different story. You've been active 14 days in a row. When you started in January, you were exercising once a week. Now you're at four. That's not motivation — that's habit. And habits are what create lasting change.",
  "Should I exercise?": "Given your slightly shorter sleep and mild fatigue today, I'd recommend a lighter session. Your scheduled workout is Lower Body Strength, but you could reduce the weight by 20% and focus on form. Alternatively, a 30-minute walk would keep your streak alive without overexerting. Listen to your body.",
}

export function CompanionScreen() {
  const navigate = useNavigate()
  const [messages, setMessages] = useState<Message[]>(DEMO_CHAT_HISTORY as Message[])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, isTyping])

  const sendMessage = (text: string) => {
    if (!text.trim()) return

    const userMsg: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
    }
    setMessages(prev => [...prev, userMsg])
    setInput("")
    setIsTyping(true)

    const response = DEMO_RESPONSES[text] ||
      "I hear you. Based on your recent data, your energy has been a bit lower than usual this week. Remember the progress you've made — 7 kg lighter and exercising 4 times a week compared to once when you started. What would feel most helpful right now: adjusting your plan, talking through what's on your mind, or just taking a rest day?"

    setTimeout(() => {
      const assistantMsg: Message = {
        id: `msg-${Date.now()}-a`,
        role: "assistant",
        content: response,
        time: new Date().toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages(prev => [...prev, assistantMsg])
      setIsTyping(false)
    }, 1200)
  }

  return (
    <div className="flex flex-col h-svh">
      {/* Header */}
      <div className="px-4 pt-12 pb-3 border-b bg-background/95 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
            <ChevronLeft className="size-5" />
          </button>
          <div className="flex items-center gap-2.5 flex-1">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <Sparkles className="size-5 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background" />
            </div>
            <div>
              <p className="font-semibold text-sm">Health Companion</p>
              <p className="text-xs text-emerald-600">Active • Knows your journey</p>
            </div>
          </div>
        </div>

        {/* Context strip */}
        <div className="flex gap-2 mt-3 overflow-x-auto hide-scrollbar">
          <ContextChip icon={Moon} label={`Sleep ${DEMO_VITALS_TODAY.sleep}%`} />
          <ContextChip icon={Zap} label={`Energy ${DEMO_VITALS_TODAY.energy}%`} />
          <ContextChip icon={Activity} label={`${DEMO_VITALS_TODAY.stepsToday.toLocaleString()} steps`} />
          <ContextChip icon={Heart} label={`Mood ${DEMO_VITALS_TODAY.mood}%`} />
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {messages.map(msg => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shrink-0">
              <Sparkles className="size-4 text-primary-foreground" />
            </div>
            <div className="bg-muted rounded-2xl rounded-tl-sm px-4 py-3">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-muted-foreground/50 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick prompts */}
      {messages.length <= 3 && (
        <div className="px-4 pb-2">
          <p className="text-xs text-muted-foreground mb-2">Quick prompts:</p>
          <div className="flex gap-2 overflow-x-auto hide-scrollbar">
            {QUICK_PROMPTS.map(prompt => (
              <button key={prompt}
                onClick={() => sendMessage(prompt)}
                className="shrink-0 px-3 py-1.5 rounded-full border border-border bg-card text-xs font-medium hover:bg-accent transition-colors">
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 border-t bg-background/95 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendMessage(input)}
            placeholder="Tell me how you're feeling..."
            className="flex-1 h-11 rounded-full"
          />
          <Button
            size="icon"
            className="h-11 w-11 rounded-full shrink-0"
            onClick={() => sendMessage(input)}
            disabled={!input.trim()}>
            <Send className="size-4" />
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground text-center mt-2">
          Demo mode • Responses are scripted, not AI-generated • Not medical advice
        </p>
      </div>
    </div>
  )
}

function ContextChip({ icon: Icon, label }: { icon: React.ElementType; label: string }) {
  return (
    <div className="shrink-0 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
      <Icon className="size-3" />
      {label}
    </div>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === "user"

  return (
    <div className={cn("flex items-end gap-2", isUser && "flex-row-reverse")}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center shrink-0">
          <Sparkles className="size-4 text-primary-foreground" />
        </div>
      )}
      <div className={cn(
        "max-w-[78%] rounded-2xl px-4 py-2.5",
        isUser
          ? "bg-primary text-primary-foreground rounded-tr-sm"
          : "bg-muted text-foreground rounded-tl-sm"
      )}>
        <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
        <p className={cn("text-[10px] mt-1", isUser ? "text-primary-foreground/70" : "text-muted-foreground")}>
          {message.time}
        </p>
      </div>
    </div>
  )
}
