export const APP_ACCOUNTS = {
  patient: { email: "patient@carehub.local", password: "patient123" },
  doctor: { email: "doctor@carehub.local", password: "doctor123" },
};

export const COMMON_PROBLEMS = [
  { id: "headache", icon: "◉", name: "Headache", description: "Head or facial pain", tone: "cyan" },
  { id: "fever", icon: "°", name: "Fever", description: "Raised temperature", tone: "amber" },
  { id: "cough", icon: "⌁", name: "Cough", description: "Cough or throat irritation", tone: "teal" },
  { id: "cold", icon: "✧", name: "Cold & Flu", description: "Cold, sneezing or flu-like symptoms", tone: "blue" },
  { id: "stomach", icon: "◌", name: "Stomach Pain", description: "Abdominal discomfort", tone: "violet" },
  { id: "chest", icon: "♡", name: "Chest Discomfort", description: "Chest pain or pressure", tone: "rose" },
  { id: "back", icon: "╱", name: "Back Pain", description: "Neck or back discomfort", tone: "orange" },
  { id: "fatigue", icon: "◇", name: "Fatigue", description: "Tiredness or low energy", tone: "green" },
];

export const INTERVIEW_QUESTIONS = [
  {
    id: "duration",
    label: "Duration",
    question: "When did this problem begin?",
    placeholder: "For example: 3 days ago",
    type: "text",
  },
  {
    id: "pattern",
    label: "Pattern",
    question: "How often does it happen?",
    options: ["Occasionally", "Several times a day", "Most of the day", "Constantly"],
    type: "choice",
  },
  {
    id: "severity",
    label: "Severity",
    question: "How severe is the problem right now?",
    options: ["Mild", "Moderate", "Severe"],
    type: "choice",
  },
  {
    id: "associated",
    label: "Associated symptoms",
    question: "Are you experiencing any other symptoms with it?",
    placeholder: "Tell us anything else you have noticed.",
    type: "textarea",
  },
  {
    id: "history",
    label: "Medical history",
    question: "Do you have any existing medical conditions or previous surgeries?",
    placeholder: "Mention conditions, surgeries, or write 'None'.",
    type: "textarea",
  },
  {
    id: "medications",
    label: "Medication",
    question: "Are you currently taking any medicines or supplements?",
    placeholder: "List them or write 'None'.",
    type: "textarea",
  },
  {
    id: "allergies",
    label: "Allergies",
    question: "Do you have any known medicine or food allergies?",
    placeholder: "List allergies or write 'None known'.",
    type: "text",
  },
];

export const problemSeed = {
  headache: "Persistent headache",
  fever: "Fever",
  cough: "Cough",
  cold: "Cold and flu-like symptoms",
  stomach: "Stomach pain",
  chest: "Chest discomfort",
  back: "Back pain",
  fatigue: "Fatigue",
};