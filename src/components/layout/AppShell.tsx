import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { Home, MessageCircle, Activity, Settings, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { t, type TranslationKey } from "@/i18n"

const NAV_ITEMS: { path: string; icon: React.ElementType; labelKey: TranslationKey; matchPrefix?: string }[] = [
  { path: "/home", icon: Home, labelKey: "nav.home" },
  { path: "/progress", icon: TrendingUp, labelKey: "nav.journey", matchPrefix: "/timeline" },
  { path: "/companion", icon: MessageCircle, labelKey: "nav.companion" },
  { path: "/workout", icon: Activity, labelKey: "nav.coach", matchPrefix: "/workout" },
  { path: "/settings", icon: Settings, labelKey: "nav.profile" },
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
          {NAV_ITEMS.map(({ path, icon: Icon, labelKey, matchPrefix }) => {
            const isActive = location.pathname === path ||
              (matchPrefix && location.pathname.startsWith(matchPrefix)) ||
              (path === "/progress" && location.pathname === "/timeline")
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
                  {t(labelKey)}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
