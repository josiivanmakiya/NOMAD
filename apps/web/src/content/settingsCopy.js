export const settingsCopy = {
  root: {
    title: "Settings",
  },
  security: {
    title: "Safe Security",
    changePin: {
      title: "Change PIN",
      description: "Update the PIN that protects withdrawals and settings.",
    },
    biometrics: {
      title: "Biometric Access",
      description: "Use Face ID or Touch ID to unlock NOMAD.",
    },
  },
  identity: {
    title: "Identity",
    bvnVerified: "BVN verified",
    bvnRequired: "Verify BVN",
    bvnDescription: "Required to secure your Safe and confirm identity.",
    ninRequired: "Verify NIN",
    ninDescription: "Required to secure your funds.",
    personalInfo: {
      title: "Personal Information",
      description: "Your basic account details.",
    },
  },
  banking: {
    title: "Funding & Withdrawal",
    funding: {
      title: "Funding Accounts",
      description:
        "Accounts used to fund NOMAD. Must match your verified name.",
      add: "Add account",
    },
    withdrawal: {
      title: "Withdrawal Accounts",
      description:
        "Accounts where released funds are sent. Must match your verified name.",
      add: "Add account",
    },
  },
  documents: {
    title: "Documents",
    statement: {
      title: "Account Statement",
      description: "Download your NOMAD activity.",
    },
  },
  rules: {
    title: "Lock Rules",
    description: "Duration is set by amount.",
    tiers: [
      "₦1,000 – ₦5,000 → 1 day",
      "₦5,001 – ₦15,000 → 3 days",
      "₦15,001 – ₦30,000 → 5 days",
      "₦30,001 – ₦50,000 → 7 days",
      "₦50,001 – ₦100,000 → 14 days",
      "₦100,001 – ₦250,000 → 21 days",
      "₦250,001 – ₦500,000 → 30 days",
      "₦500,001 – ₦999,999 → 60 days",
      "₦1,000,000+ → Custom (≥90 days)",
    ],
    notes: [
      "Any new deposit or relock resets the timer from now.",
      "Early unlock applies a 3%–5% fee and resets all active locks.",
    ],
  },
  app: {
    title: "App",
    darkMode: {
      title: "Dark Mode",
      description: "Reduce brightness and stay focused.",
    },
  },
  support: {
    title: "Support",
    contact: "Contact Support",
    helper: "For account or transaction issues.",
  },
  session: {
    title: "Session",
    description: "Log out of this device.",
    logout: "Log out",
  },
};

