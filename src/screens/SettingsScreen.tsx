import { useNavigate } from "react-router-dom"
import { ChevronLeft, ChevronRight, Shield, Bell, Globe, Heart, FlaskConical, Pill, Activity, Lock, Download, Trash2, FileText, ChevronsLeftRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { DEMO_USER } from "@/data/demo"
import { cn } from "@/lib/utils"

export function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <div className="px-4 pt-12 pb-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <button onClick={() => navigate("/home")} className="p-2 -ml-2 rounded-lg hover:bg-accent">
          <ChevronLeft className="size-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-sm text-muted-foreground">Profile, privacy & preferences</p>
        </div>
      </div>

      {/* Profile card */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
            <span className="text-lg font-bold text-primary-foreground">{DEMO_USER.avatar}</span>
          </div>
          <div className="flex-1">
            <p className="font-bold text-base">{DEMO_USER.name}</p>
            <p className="text-xs text-muted-foreground">{DEMO_USER.age} years • {DEMO_USER.sex}</p>
            <Badge variant="secondary" className="text-xs mt-1">{DEMO_USER.goal}</Badge>
          </div>
          <ChevronRight className="size-5 text-muted-foreground" />
        </div>
        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-border/30">
          <ProfileStat label="Height" value={`${DEMO_USER.height} cm`} />
          <ProfileStat label="Weight" value={`${DEMO_USER.weight} kg`} />
          <ProfileStat label="BMI" value={DEMO_USER.bmi.toString()} />
        </div>
      </div>

      {/* Health Modules */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Health Modules</p>
        <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
          <SettingsRow icon={Activity} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-950/30" label="Fitness Coach" onClick={() => navigate("/workout")} />
          <Divider />
          <SettingsRow icon={FlaskConical} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-950/30" label="Lab Intelligence" onClick={() => navigate("/labs")} />
          <Divider />
          <SettingsRow icon={Pill} iconColor="text-amber-500" iconBg="bg-amber-50 dark:bg-amber-950/30" label="Medication Tracker" onClick={() => navigate("/medication")} />
        </div>
      </div>

      {/* Preferences */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Preferences</p>
        <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
          <ToggleRow icon={Bell} iconColor="text-violet-500" iconBg="bg-violet-50 dark:bg-violet-950/30" label="Daily reminders" defaultChecked />
          <Divider />
          <ToggleRow icon={Heart} iconColor="text-rose-500" iconBg="bg-rose-50 dark:bg-rose-950/30" label="Wellness check-ins" defaultChecked />
          <Divider />
          <SettingsRow icon={Globe} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-950/30" label="Language" value="English" />
          <Divider />
          <SettingsRow icon={ChevronsLeftRight} iconColor="text-indigo-500" iconBg="bg-indigo-50 dark:bg-indigo-950/30" label="RTL Support" value="Ready" />
        </div>
      </div>

      {/* Privacy & Data */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Privacy & Data</p>
        <div className="bg-card border border-border/50 rounded-2xl shadow-sm overflow-hidden">
          <SettingsRow icon={Lock} iconColor="text-emerald-500" iconBg="bg-emerald-50 dark:bg-emerald-950/30" label="Privacy settings" />
          <Divider />
          <SettingsRow icon={Download} iconColor="text-blue-500" iconBg="bg-blue-50 dark:bg-blue-950/30" label="Export my data" />
          <Divider />
          <SettingsRow icon={FileText} iconColor="text-muted-foreground" iconBg="bg-muted" label="Data retention policy" />
          <Divider />
          <SettingsRow icon={Trash2} iconColor="text-rose-500" iconBg="bg-rose-50 dark:bg-rose-950/30" label="Delete account" danger />
        </div>
      </div>

      {/* Safety Engine info */}
      <div className="rounded-2xl p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="size-4 text-blue-600" />
          <p className="text-sm font-semibold text-blue-800 dark:text-blue-200">Safety Engine Status</p>
        </div>
        <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
          The Safety Engine monitors your health data across symptoms, labs, medications, and wellness signals. All clinical thresholds require review by qualified medical professionals before activation.
        </p>
        <div className="grid grid-cols-5 gap-1 mt-3">
          {[0, 1, 2, 3, 4].map(level => (
            <div key={level} className={cn(
              "h-2 rounded-full",
              level === 0 ? "bg-emerald-500" : "bg-muted"
            )} />
          ))}
        </div>
        <p className="text-[10px] text-blue-600 dark:text-blue-400 mt-1.5">Current: Level 0 (Normal)</p>
      </div>

      {/* About */}
      <div className="bg-card border border-border/50 rounded-2xl p-4 shadow-sm text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-xl bg-primary flex items-center justify-center">
            <Heart className="size-4 text-primary-foreground fill-primary-foreground" />
          </div>
          <span className="font-bold">Vitara</span>
        </div>
        <p className="text-xs text-muted-foreground leading-relaxed">
          AI Personal Health Companion — Product Prototype v0.1
        </p>
        <p className="text-[10px] text-muted-foreground mt-2">
          All data is fictional demo data. Not a medical device. Not a substitute for professional medical advice.
        </p>
      </div>
    </div>
  )
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-sm font-bold">{value}</p>
      <p className="text-[10px] text-muted-foreground">{label}</p>
    </div>
  )
}

function Divider() {
  return <div className="h-px bg-border/30 mx-4" />
}

function SettingsRow({ icon: Icon, iconColor, iconBg, label, value, onClick, danger }: {
  icon: React.ElementType; iconColor: string; iconBg: string;
  label: string; value?: string; onClick?: () => void; danger?: boolean
}) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 p-3.5 hover:bg-accent/50 transition-colors text-left">
      <div className={cn("p-2 rounded-xl shrink-0", iconBg)}>
        <Icon className={cn("size-4", iconColor)} />
      </div>
      <span className={cn("text-sm font-medium flex-1", danger && "text-rose-600")}>{label}</span>
      {value && <span className="text-xs text-muted-foreground">{value}</span>}
      <ChevronRight className="size-4 text-muted-foreground" />
    </button>
  )
}

function ToggleRow({ icon: Icon, iconColor, iconBg, label, defaultChecked }: {
  icon: React.ElementType; iconColor: string; iconBg: string;
  label: string; defaultChecked?: boolean
}) {
  return (
    <div className="w-full flex items-center gap-3 p-3.5">
      <div className={cn("p-2 rounded-xl shrink-0", iconBg)}>
        <Icon className={cn("size-4", iconColor)} />
      </div>
      <span className="text-sm font-medium flex-1">{label}</span>
      <Switch defaultChecked={defaultChecked} />
    </div>
  )
}
