// Demo data - completely fictional for prototype purposes
// All health data here is invented and for UI demonstration only

export const DEMO_USER = {
  id: "demo-001",
  name: "Alex Morgan",
  age: 34,
  sex: "Male",
  height: 178, // cm
  weight: 87.2, // kg
  bmi: 27.5,
  bloodType: "A+",
  avatar: "AM",
  goal: "Weight Loss & Better Energy",
  activityLevel: "Lightly Active",
  joinDate: "2024-01-15",
  streak: 14,
}

export const DEMO_VITALS_TODAY = {
  energy: 68,
  sleep: 72,
  activity: 45,
  mood: 75,
  consistency: 82,
  recovery: 60,
  stepsToday: 4820,
  stepsGoal: 8000,
  waterMl: 1200,
  waterGoal: 2500,
  caloriesBurned: 320,
  heartRate: 72,
  focusArea: "Movement",
  focusReason: "You've been mostly sedentary today. A short walk would help your energy.",
}

export const DEMO_WEIGHT_HISTORY = [
  { month: "Jan", weight: 94.0, label: "Jan '24" },
  { month: "Feb", weight: 92.5, label: "Feb '24" },
  { month: "Mar", weight: 91.0, label: "Mar '24" },
  { month: "Apr", weight: 90.2, label: "Apr '24" },
  { month: "May", weight: 89.1, label: "May '24" },
  { month: "Jun", weight: 88.3, label: "Jun '24" },
  { month: "Jul", weight: 87.8, label: "Jul '24" },
  { month: "Aug", weight: 87.2, label: "Aug '24" },
]

export const DEMO_ACTIVITY_HISTORY = [
  { month: "Jan", sessions: 1, label: "Jan '24" },
  { month: "Feb", sessions: 2, label: "Feb '24" },
  { month: "Mar", sessions: 3, label: "Mar '24" },
  { month: "Apr", sessions: 3, label: "Apr '24" },
  { month: "May", sessions: 4, label: "May '24" },
  { month: "Jun", sessions: 4, label: "Jun '24" },
  { month: "Jul", sessions: 5, label: "Jul '24" },
  { month: "Aug", sessions: 4, label: "Aug '24" },
]

export const DEMO_SLEEP_HISTORY = [
  { day: "Mon", hours: 6.5 },
  { day: "Tue", hours: 7.2 },
  { day: "Wed", hours: 5.8 },
  { day: "Thu", hours: 7.5 },
  { day: "Fri", hours: 8.0 },
  { day: "Sat", hours: 7.8 },
  { day: "Sun", hours: 6.2 },
]

export const DEMO_TIMELINE = [
  {
    id: "t1",
    date: "2024-01-15",
    label: "January — Getting Started",
    weight: 94.0,
    weeklyWorkouts: 1,
    sleepQuality: "Poor",
    energyLevel: 4,
    notes: "Started the journey. Feeling overwhelmed but motivated.",
    highlight: false,
    tags: ["start"],
  },
  {
    id: "t2",
    date: "2024-03-01",
    label: "March — First Milestone",
    weight: 91.0,
    weeklyWorkouts: 3,
    sleepQuality: "Improving",
    energyLevel: 6,
    notes: "3 kg down! Exercise becoming a habit.",
    highlight: true,
    tags: ["milestone", "weight"],
  },
  {
    id: "t3",
    date: "2024-05-15",
    label: "May — Setback & Recovery",
    weight: 89.1,
    weeklyWorkouts: 2,
    sleepQuality: "Poor",
    energyLevel: 5,
    notes: "Work stress impacted sleep and consistency. Reduced intensity.",
    highlight: false,
    tags: ["setback"],
  },
  {
    id: "t4",
    date: "2024-07-01",
    label: "July — Strongest Month",
    weight: 87.8,
    weeklyWorkouts: 5,
    sleepQuality: "Good",
    energyLevel: 8,
    notes: "Best month yet! New personal record on 5K run.",
    highlight: true,
    tags: ["milestone", "fitness", "personal-best"],
  },
  {
    id: "t5",
    date: "2024-08-23",
    label: "Today",
    weight: 87.2,
    weeklyWorkouts: 4,
    sleepQuality: "Good",
    energyLevel: 7,
    notes: "Continuing steady progress.",
    highlight: false,
    tags: ["current"],
  },
]

export const DEMO_LAB_RESULTS = [
  {
    id: "lab-001",
    date: "2024-08-10",
    label: "Annual Blood Panel",
    status: "reviewed",
    results: [
      {
        name: "Vitamin D",
        value: 34,
        unit: "ng/mL",
        previousValue: 18,
        referenceMin: 30,
        referenceMax: 100,
        status: "normal",
        trend: "improved",
        explanation: "Your Vitamin D is now in the normal range. Previously deficient. Continue supplementation.",
      },
      {
        name: "HbA1c",
        value: 5.4,
        unit: "%",
        previousValue: 5.8,
        referenceMin: 4.0,
        referenceMax: 5.6,
        status: "normal",
        trend: "improved",
        explanation: "Blood sugar control improved. Lifestyle changes are having a positive effect.",
      },
      {
        name: "Total Cholesterol",
        value: 195,
        unit: "mg/dL",
        previousValue: 218,
        referenceMin: 0,
        referenceMax: 200,
        status: "normal",
        trend: "improved",
        explanation: "Cholesterol improved significantly. Borderline previously, now within normal range.",
      },
      {
        name: "LDL Cholesterol",
        value: 118,
        unit: "mg/dL",
        previousValue: 142,
        referenceMin: 0,
        referenceMax: 130,
        status: "normal",
        trend: "improved",
        explanation: "LDL improved. Exercise and dietary changes are having effect.",
      },
      {
        name: "TSH",
        value: 2.1,
        unit: "mIU/L",
        previousValue: 2.3,
        referenceMin: 0.4,
        referenceMax: 4.0,
        status: "normal",
        trend: "stable",
        explanation: "Thyroid function stable and normal.",
      },
      {
        name: "Ferritin",
        value: 22,
        unit: "ng/mL",
        previousValue: 19,
        referenceMin: 22,
        referenceMax: 322,
        status: "borderline",
        trend: "stable",
        explanation: "Slightly low-normal. Discuss with your doctor whether iron supplementation is appropriate.",
      },
    ],
  },
]

export const DEMO_MEDICATIONS = [
  {
    id: "med-001",
    name: "Vitamin D3",
    dose: "2000 IU",
    frequency: "Once daily",
    timing: "With breakfast",
    category: "Supplement",
    prescribedBy: "Dr. Sarah Chen",
    adherence: 85,
    takenToday: false,
    refillDue: "2024-09-15",
  },
  {
    id: "med-002",
    name: "Omega-3",
    dose: "1000 mg",
    frequency: "Once daily",
    timing: "With dinner",
    category: "Supplement",
    prescribedBy: "Dr. Sarah Chen",
    adherence: 78,
    takenToday: true,
    refillDue: "2024-10-01",
  },
]

export const DEMO_WORKOUT_PLAN = {
  weekLabel: "Week 32 — Progressive Cardio",
  days: [
    { day: "Mon", type: "Strength", label: "Upper Body", done: true, duration: 45, intensity: "Moderate" },
    { day: "Tue", type: "Cardio", label: "Easy Run", done: true, duration: 30, intensity: "Light" },
    { day: "Wed", type: "Rest", label: "Active Recovery", done: true, duration: 20, intensity: "Low" },
    { day: "Thu", type: "Strength", label: "Lower Body", done: false, duration: 45, intensity: "Moderate" },
    { day: "Fri", type: "Cardio", label: "Interval Run", done: false, duration: 35, intensity: "High" },
    { day: "Sat", type: "Mobility", label: "Yoga & Stretch", done: false, duration: 40, intensity: "Light" },
    { day: "Sun", type: "Rest", label: "Full Rest", done: false, duration: 0, intensity: "None" },
  ],
}

export const DEMO_TODAY_WORKOUT = {
  title: "Lower Body Strength",
  duration: 45,
  intensity: "Moderate",
  calories: 280,
  exercises: [
    { name: "Squats", sets: 3, reps: "12 reps", rest: "60s", done: false },
    { name: "Romanian Deadlift", sets: 3, reps: "10 reps", rest: "90s", done: false },
    { name: "Leg Press", sets: 3, reps: "15 reps", rest: "60s", done: false },
    { name: "Walking Lunges", sets: 3, reps: "12 each", rest: "60s", done: false },
    { name: "Calf Raises", sets: 4, reps: "20 reps", rest: "45s", done: false },
    { name: "Glute Bridges", sets: 3, reps: "15 reps", rest: "45s", done: false },
  ],
}

export const DEMO_CHAT_HISTORY = [
  {
    id: "msg-001",
    role: "assistant" as const,
    content: "Good morning, Alex! You slept 6.2 hours last night — slightly less than your usual 7.5. How are you feeling today?",
    time: "08:15",
  },
  {
    id: "msg-002",
    role: "user" as const,
    content: "Feeling a bit tired and have a mild headache.",
    time: "08:22",
  },
  {
    id: "msg-003",
    role: "assistant" as const,
    content: "That makes sense given the shorter sleep. A headache combined with fatigue after poor sleep is common — staying well hydrated often helps. You've only had 400ml of water today.\n\nFor your workout today, I'd suggest reducing intensity slightly. You can still do your Lower Body session, but maybe skip the heaviest sets. Your streak of 14 days is worth protecting without overextending yourself.",
    time: "08:23",
  },
]

export const DEMO_SYMPTOMS = [
  { id: "s1", label: "Fatigue", icon: "⚡", category: "General" },
  { id: "s2", label: "Headache", icon: "🧠", category: "Neurological" },
  { id: "s3", label: "Dizziness", icon: "💫", category: "Neurological" },
  { id: "s4", label: "Chest Pain", icon: "❤️", category: "Cardiovascular" },
  { id: "s5", label: "Shortness of Breath", icon: "🫁", category: "Respiratory" },
  { id: "s6", label: "Joint Pain", icon: "🦴", category: "Musculoskeletal" },
  { id: "s7", label: "Nausea", icon: "🤢", category: "Digestive" },
  { id: "s8", label: "Stomach Pain", icon: "🫃", category: "Digestive" },
  { id: "s9", label: "Sleep Issues", icon: "😴", category: "Sleep" },
  { id: "s10", label: "Anxiety", icon: "😰", category: "Mental" },
  { id: "s11", label: "Back Pain", icon: "🏃", category: "Musculoskeletal" },
  { id: "s12", label: "Skin Changes", icon: "🦠", category: "Dermatological" },
]

export type SafetyLevel = 0 | 1 | 2 | 3 | 4

export const SAFETY_LEVELS: Record<SafetyLevel, { label: string; color: string; description: string; action: string }> = {
  0: { label: "Normal", color: "health-success", description: "No concerning patterns detected.", action: "Continue as normal" },
  1: { label: "Monitor", color: "health-warning", description: "Some patterns worth monitoring.", action: "Log symptoms and check in tomorrow" },
  2: { label: "Follow-up", color: "health-warning", description: "Recommend scheduling a medical follow-up.", action: "Book appointment within 1-2 weeks" },
  3: { label: "Urgent", color: "health-danger", description: "Symptoms warrant prompt medical evaluation.", action: "See a doctor within 24-48 hours" },
  4: { label: "Emergency", color: "destructive", description: "Seek emergency medical care immediately.", action: "Call emergency services or go to ER now" },
}

export const HEALTH_STATE = {
  energy: "low" as const,
  sleep: "fair" as const,
  stress: "moderate" as const,
  fitness: "intermediate" as const,
  pain: "none" as const,
  consistency: "good" as const,
  goal: "weight-loss" as const,
  safetyLevel: 0 as SafetyLevel,
}
