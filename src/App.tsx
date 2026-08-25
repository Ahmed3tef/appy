import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { AppShell } from "@/components/layout/AppShell"
import { WelcomeScreen } from "@/screens/WelcomeScreen"
import { OnboardingScreen } from "@/screens/OnboardingScreen"
import { HomeScreen } from "@/screens/HomeScreen"
import { TimelineScreen } from "@/screens/TimelineScreen"
import { CompanionScreen } from "@/screens/CompanionScreen"
import { SymptomCheckScreen } from "@/screens/SymptomCheckScreen"
import { LabScreen } from "@/screens/LabScreen"
import { WorkoutScreen } from "@/screens/WorkoutScreen"
import { TodayWorkoutScreen } from "@/screens/TodayWorkoutScreen"
import { ProgressScreen } from "@/screens/ProgressScreen"
import { MedicationScreen } from "@/screens/MedicationScreen"
import { SettingsScreen } from "@/screens/SettingsScreen"
import { WellnessCheckScreen } from "@/screens/WellnessCheckScreen"

export function App() {
  return (
    <ThemeProvider defaultTheme="light">
      <BrowserRouter>
        <Routes>
          <Route path="/welcome" element={<WelcomeScreen />} />
          <Route path="/onboarding" element={<OnboardingScreen />} />
          <Route path="/" element={<AppShell />}>
            <Route index element={<Navigate to="/home" replace />} />
            <Route path="home" element={<HomeScreen />} />
            <Route path="timeline" element={<TimelineScreen />} />
            <Route path="companion" element={<CompanionScreen />} />
            <Route path="symptoms" element={<SymptomCheckScreen />} />
            <Route path="labs" element={<LabScreen />} />
            <Route path="workout" element={<WorkoutScreen />} />
            <Route path="workout/today" element={<TodayWorkoutScreen />} />
            <Route path="progress" element={<ProgressScreen />} />
            <Route path="medication" element={<MedicationScreen />} />
            <Route path="wellness" element={<WellnessCheckScreen />} />
            <Route path="settings" element={<SettingsScreen />} />
          </Route>
          <Route path="*" element={<Navigate to="/welcome" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
