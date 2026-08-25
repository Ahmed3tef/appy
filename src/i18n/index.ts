/**
 * Internationalization (i18n) layer.
 *
 * Supports: English, Arabic (RTL)
 * Prepared for: French, additional languages.
 *
 * All user-facing strings should use t("key") instead of hard-coding text.
 * RTL is handled by setting dir="rtl" on the document root.
 */

export type Locale = "en" | "ar"

export type TranslationKey =
  | "nav.home" | "nav.journey" | "nav.companion" | "nav.coach" | "nav.profile"
  | "greeting.morning" | "greeting.afternoon" | "greeting.evening"
  | "home.focus" | "home.stats" | "home.viewAll" | "home.viewWorkout"
  | "home.howYoureDoing" | "home.checkIn" | "home.quickActions"
  | "home.medicationReminder" | "home.itemsPending" | "home.view"
  | "home.demoMode"
  | "companion.title" | "companion.active" | "companion.placeholder"
  | "companion.quickPrompts" | "companion.demoNote"
  | "symptom.title" | "symptom.selectPrompt" | "symptom.detailsPrompt"
  | "symptom.summaryPrompt" | "symptom.cantFind" | "symptom.continue"
  | "symptom.getSummary" | "symptom.startOver" | "symptom.talkToCompanion"
  | "symptom.demoNote"
  | "labs.title" | "labs.uploadTitle" | "labs.yourResults" | "labs.uploadNew"
  | "labs.uploadPrompt" | "labs.howItWorks" | "labs.viewSample"
  | "labs.demoNote" | "labs.addedToTimeline" | "labs.viewInTimeline"
  | "meds.title" | "meds.adherence" | "meds.todayAdherence"
  | "meds.dayAverage" | "meds.markTaken" | "meds.takenToday"
  | "meds.addMed" | "meds.demoNote"
  | "workout.title" | "workout.weeklyPlan" | "workout.completed"
  | "workout.startNow" | "workout.demoNote" | "workout.today"
  | "wellness.title" | "wellness.moodPrompt" | "wellness.submit"
  | "wellness.demoNote"
  | "timeline.title" | "timeline.subtitle" | "timeline.milestones"
  | "timeline.sinceStart" | "timeline.kgLost" | "timeline.demoNote"
  | "progress.title" | "progress.demoNote"
  | "settings.title" | "settings.subtitle" | "settings.healthModules"
  | "settings.preferences" | "settings.privacyData" | "settings.about"
  | "settings.safetyEngine" | "settings.demoNote"
  | "onboarding.welcome" | "onboarding.getStarted" | "onboarding.continue"
  | "onboarding.finishSetup" | "onboarding.startJourney"
  | "welcome.tagline" | "welcome.getStarted" | "welcome.alreadyStarted"
  | "common.back" | "common.cancel" | "common.save" | "common.edit"

type Translations = Record<TranslationKey, string>

const en: Translations = {
  "nav.home": "Home",
  "nav.journey": "Journey",
  "nav.companion": "Companion",
  "nav.coach": "Coach",
  "nav.profile": "Profile",
  "greeting.morning": "Good morning",
  "greeting.afternoon": "Good afternoon",
  "greeting.evening": "Good evening",
  "home.focus": "Today's Focus",
  "home.stats": "Today's Stats",
  "home.viewAll": "View All",
  "home.viewWorkout": "View Workout",
  "home.howYoureDoing": "How You're Doing",
  "home.checkIn": "Check in",
  "home.quickActions": "Quick Actions",
  "home.medicationReminder": "Medication Reminder",
  "home.itemsPending": "items pending today",
  "home.view": "View",
  "home.demoMode": "Demo Mode — All health data shown is fictional and for prototype purposes only. Not medical advice.",
  "companion.title": "Health Companion",
  "companion.active": "Active • Knows your journey",
  "companion.placeholder": "Tell me how you're feeling...",
  "companion.quickPrompts": "Quick prompts:",
  "companion.demoNote": "Demo mode • Responses are scripted, not AI-generated • Not medical advice",
  "symptom.title": "Symptom Check",
  "symptom.selectPrompt": "Select what you're experiencing",
  "symptom.detailsPrompt": "A few questions to understand better",
  "symptom.summaryPrompt": "Your symptom summary",
  "symptom.cantFind": "I can't find my symptom",
  "symptom.continue": "Continue",
  "symptom.getSummary": "Get Summary",
  "symptom.startOver": "Start Over",
  "symptom.talkToCompanion": "Talk to Companion",
  "symptom.demoNote": "Demo mode — Not a medical diagnosis. Always consult a qualified healthcare professional.",
  "labs.title": "Lab Intelligence",
  "labs.uploadTitle": "Upload Lab Result",
  "labs.yourResults": "Your lab results & analysis",
  "labs.uploadNew": "Upload New Result",
  "labs.uploadPrompt": "Upload a PDF or image of your results",
  "labs.howItWorks": "How It Works",
  "labs.viewSample": "View Sample Analyzed Result",
  "labs.demoNote": "Demo mode — No actual file processing. Sample data shown for prototype.",
  "labs.addedToTimeline": "Added to Your Timeline",
  "labs.viewInTimeline": "View in Timeline",
  "meds.title": "Medications",
  "meds.adherence": "Adherence & reminders",
  "meds.todayAdherence": "Today's Adherence",
  "meds.dayAverage": "30-day average",
  "meds.markTaken": "Mark as Taken",
  "meds.takenToday": "Taken Today",
  "meds.addMed": "Add Medication or Supplement",
  "meds.demoNote": "Demo mode — We help you follow your existing treatment plan. We do not prescribe medications.",
  "workout.title": "Fitness Coach",
  "workout.weeklyPlan": "Weekly Plan",
  "workout.completed": "completed",
  "workout.startNow": "Start Now",
  "workout.demoNote": "Demo mode — Workout plans are sample data. Not personalized medical exercise advice.",
  "workout.today": "Today",
  "wellness.title": "Wellness Check-in",
  "wellness.moodPrompt": "How's your mood today?",
  "wellness.submit": "Submit Check-in",
  "wellness.demoNote": "Demo mode — Responses are scripted, not AI-generated. Not a substitute for professional mental health support.",
  "timeline.title": "Health Timeline",
  "timeline.subtitle": "Your journey since Jan 2024",
  "timeline.milestones": "Milestones & Events",
  "timeline.sinceStart": "Since You Started",
  "timeline.kgLost": "kg lost",
  "timeline.demoNote": "Demo data — fictional timeline for prototype demonstration.",
  "progress.title": "Progress",
  "progress.demoNote": "Demo mode — All progress data is sample content.",
  "settings.title": "Settings",
  "settings.subtitle": "Profile, privacy & preferences",
  "settings.healthModules": "Health Modules",
  "settings.preferences": "Preferences",
  "settings.privacyData": "Privacy & Data",
  "settings.about": "About",
  "settings.safetyEngine": "Safety Engine Status",
  "settings.demoNote": "All data is fictional demo data. Not a medical device. Not a substitute for professional medical advice.",
  "onboarding.welcome": "Welcome",
  "onboarding.getStarted": "Get Started",
  "onboarding.continue": "Continue",
  "onboarding.finishSetup": "Finish Setup",
  "onboarding.startJourney": "Start My Journey",
  "welcome.tagline": "Your AI Personal Health Companion",
  "welcome.getStarted": "Get Started",
  "welcome.alreadyStarted": "I've already started",
  "common.back": "Back",
  "common.cancel": "Cancel",
  "common.save": "Save",
  "common.edit": "Edit",
}

const ar: Translations = {
  "nav.home": "الرئيسية",
  "nav.journey": "رحلتي",
  "nav.companion": "المرافق",
  "nav.coach": "المدرب",
  "nav.profile": "الملف",
  "greeting.morning": "صباح الخير",
  "greeting.afternoon": "مساء الخير",
  "greeting.evening": "مساء الخير",
  "home.focus": "تركيز اليوم",
  "home.stats": "إحصائيات اليوم",
  "home.viewAll": "عرض الكل",
  "home.viewWorkout": "عرض التمرين",
  "home.howYoureDoing": "كيف حالك",
  "home.checkIn": "تسجيل الوصول",
  "home.quickActions": "إجراءات سريعة",
  "home.medicationReminder": "تذكير الأدوية",
  "home.itemsPending": "أدوية معلقة اليوم",
  "home.view": "عرض",
  "home.demoMode": "الوضع التجريبي — جميع البيانات الصحية المعروضة وهمية ولأغراض النموذج الأولي فقط. ليست نصيحة طبية.",
  "companion.title": "المرافق الصحي",
  "companion.active": "نشط • يعرف رحلتك",
  "companion.placeholder": "أخبرني كيف تشعر...",
  "companion.quickPrompts": "أسئلة سريعة:",
  "companion.demoNote": "الوضع التجريبي • الردود مبرمجة وليست ذكاءً اصطناعياً • ليست نصيحة طبية",
  "symptom.title": "فحص الأعراض",
  "symptom.selectPrompt": "اختر ما تشعر به",
  "symptom.detailsPrompt": "بعض الأسئلة لفهم حالتك أفضل",
  "symptom.summaryPrompt": "ملخص أعراضك",
  "symptom.cantFind": "لا أجد عرضي",
  "symptom.continue": "متابعة",
  "symptom.getSummary": "احصل على الملخص",
  "symptom.startOver": "البدء من جديد",
  "symptom.talkToCompanion": "تحدث مع المرافق",
  "symptom.demoNote": "الوضع التجريبي — ليس تشخيصاً طبياً. استشر دائماً مختصاً صحياً مؤهلاً.",
  "labs.title": "ذكاء المختبر",
  "labs.uploadTitle": "رفع نتيجة المختبر",
  "labs.yourResults": "نتائجك وتحليلاتك",
  "labs.uploadNew": "رفع نتيجة جديدة",
  "labs.uploadPrompt": "ارفع ملف PDF أو صورة لنتائجك",
  "labs.howItWorks": "كيف يعمل",
  "labs.viewSample": "عرض نتيجة تحليل نموذجية",
  "labs.demoNote": "الوضع التجريبي — لا توجد معالجة فعلية للملفات. بيانات نموذجية.",
  "labs.addedToTimeline": "أُضيفت إلى جدولك الزمني",
  "labs.viewInTimeline": "عرض في الجدول الزمني",
  "meds.title": "الأدوية",
  "meds.adherence": "الالتزام والتذكيرات",
  "meds.todayAdherence": "التزام اليوم",
  "meds.dayAverage": "متوسط 30 يوماً",
  "meds.markTaken": "تسجيل كأخذ",
  "meds.takenToday": "تم الأخذ اليوم",
  "meds.addMed": "إضافة دواء أو مكمل",
  "meds.demoNote": "الوضع التجريبي — نساعدك في اتباع خطة علاجك الحالية. لا نصف الأدوية.",
  "workout.title": "مدرب اللياقة",
  "workout.weeklyPlan": "الخطة الأسبوعية",
  "workout.completed": "مكتمل",
  "workout.startNow": "ابدأ الآن",
  "workout.demoNote": "الوضع التجريبي — خطط التمرين بيانات نموذجية. ليست نصيحة طبية.",
  "workout.today": "اليوم",
  "wellness.title": "تسجيل الوصول الصحي",
  "wellness.moodPrompt": "كيف مزاجك اليوم؟",
  "wellness.submit": "إرسال",
  "wellness.demoNote": "الوضع التجريبي — الردود مبرمجة وليست ذكاءً اصطناعياً. ليست بديلاً عن الدعم النفسي المهني.",
  "timeline.title": "الجدول الزمني الصحي",
  "timeline.subtitle": "رحلتك منذ يناير 2024",
  "timeline.milestones": "الإنجازات والأحداث",
  "timeline.sinceStart": "منذ أن بدأت",
  "timeline.kgLost": "كجم خسرتها",
  "timeline.demoNote": "بيانات تجريبية — جدول زمني وهمي للنموذج الأولي.",
  "progress.title": "التقدم",
  "progress.demoNote": "الوضع التجريبي — جميع بيانات التقدم نموذجية.",
  "settings.title": "الإعدادات",
  "settings.subtitle": "الملف والخصوصية والتفضيلات",
  "settings.healthModules": "الوحدات الصحية",
  "settings.preferences": "التفضيلات",
  "settings.privacyData": "الخصوصية والبيانات",
  "settings.about": "حول",
  "settings.safetyEngine": "حالة محرك الأمان",
  "settings.demoNote": "جميع البيانات وهمية للعرض التجريبي. ليس جهازاً طبياً. ليس بديلاً عن الاستشارة الطبية.",
  "onboarding.welcome": "مرحباً",
  "onboarding.getStarted": "ابدأ",
  "onboarding.continue": "متابعة",
  "onboarding.finishSetup": "إنهاء الإعداد",
  "onboarding.startJourney": "ابدأ رحلتي",
  "welcome.tagline": "مرافقك الصحي الشخصي بالذكاء الاصطناعي",
  "welcome.getStarted": "ابدأ الآن",
  "welcome.alreadyStarted": "لقد بدأت بالفعل",
  "common.back": "رجوع",
  "common.cancel": "إلغاء",
  "common.save": "حفظ",
  "common.edit": "تعديل",
}

const translations: Record<Locale, Translations> = { en, ar }

let currentLocale: Locale = "en"

export function setLocale(locale: Locale): void {
  currentLocale = locale
  const dir = locale === "ar" ? "rtl" : "ltr"
  document.documentElement.setAttribute("lang", locale)
  document.documentElement.setAttribute("dir", dir)
}

export function getLocale(): Locale {
  return currentLocale
}

export function isRTL(): boolean {
  return currentLocale === "ar"
}

export function t(key: TranslationKey): string {
  return translations[currentLocale]?.[key] ?? translations.en[key] ?? key
}
