export const GENESIS_TEXT = {
  page: {
    title: "NOMAD WAITLIST",
    subtitle:
      "Open enrollment for people ready to preserve capital with discipline.",
  },
  cta: {
    join: "JOIN THE FORTRESS",
  },
  labels: {
    email: "Email",
    phoneNumber: "Phone Number",
    biggestLeak: "Biggest Daily Behavioral Leak",
    tenYearGoal: "10-Year Ownership Goal",
    automation: "Enable Automated Discipline?",
    resetConsent: "I accept the Reset Rule for this protocol.",
  },
  automationOptions: [
    {
      value: "high_protocol",
      label: "High-Protocol (Recommended)",
      description:
        "Authorize scheduled extraction and auto-relock guardrails to reduce daily decision fatigue.",
    },
    {
      value: "manual",
      label: "Manual",
      description:
        "Send funds manually. You keep full day-to-day control over funding actions.",
    },
  ],
  leakRows: [
    { level: "Low", daily: "₦1,500", annual: "₦547,500", twentyYear: "₦10,950,000" },
    { level: "Mid", daily: "₦4,000", annual: "₦1,460,000", twentyYear: "₦29,200,000" },
    { level: "High", daily: "₦15,000", annual: "₦5,475,000", twentyYear: "₦109,500,000" },
  ],
};
