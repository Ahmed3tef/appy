import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Home, MessageCircle, Activity, Settings, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { path: "/home", icon: Home, label: "Home" },
  { path: "/progress", icon: TrendingUp, label: "Progress" },
  { path: "/companion", icon: MessageCircle, label: "Companion" },
  { path: "/workout", icon: Activity, label: "Coach" },
  { path: "/settings", icon: Settings, label: "More" },
]

export function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="app-shell flex flex-col bg-background">
      {/* Page content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="page-enter">
          <Outlet />
        </div>
      </main>

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 border-t bg-background/95 backdrop-blur-md">
        <div className="flex items-center justify-around px-2 py-2 pb-safe">
          {NAV_ITEMS.map(({ path, icon: Icon, label }) => {
            const isActive = location.pathname === path ||
              (path === "/workout" && location.pathname.startsWith("/workout"))
            return (
              <button
                key={path}
                onClick={() => navigate(path)}
                className={cn(
                  "flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all duration-200 min-w-[56px]",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <div className={cn(
                  "p-1.5 rounded-xl transition-all duration-200",
                  isActive && "bg-primary/10"
                )}>
                  <Icon className={cn(
                    "transition-all duration-200",
                    isActive ? "size-5" : "size-5"
                  )} />
                </div>
                <span className={cn(
                  "text-[10px] font-medium leading-none",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}>
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
