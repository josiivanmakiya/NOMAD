// Single source of truth for UI copy.

export const TEXT = {
  APP_NAME: "NOMAD",
  TAGLINE: "Time‑locked savings with disciplined access.",

  LANDING: {
    HERO: {
      headline: "The Financial Cost of Impulsive Spending.",
      subheadline:
        "Liquid capital is often lost to high-frequency behavioral leaks. Nomad is a closed-loop escrow system designed to enforce discipline where willpower fails.",
      ctaPrimary: "Enter Nomad",
      ctaSecondary: "View Rules",
      trustHint: "Closed-loop, verified-account-only withdrawals. No third-party transfers.",
      lossComparison: "₦1,440,000/year lost",
      savedComparison: "₦0 lost",
    },

    PROBLEM: {
      headline: "Identifying Behavioral Leaks.",
      intro:
        "Compulsive spending, whether on substances, betting, or minor daily impulses, is a technical drain on liquidity. Nomad quantifies these leaks to show capital recovery potential.",
      metrics: [
        "Daily Leak: ₦4,000",
        "Weekly Total: ₦28,000",
        "Monthly Total: ₦120,000",
        "Annual Total: ₦1,440,000",
      ],
      closing:
        "The goal of Nomad is not to make money, but to stop unmonitored exit of money you already have.",
    },

    HOW_IT_WORKS: {
      headline: "The Protocol.",
      body:
        "Your lock duration is determined automatically by the size of your deposit.",
      schedule: [
        { amount: "1,000 - 5,000", duration: "1 Day" },
        { amount: "5,001 - 15,000", duration: "3 Days" },
        { amount: "15,001 - 30,000", duration: "5 Days" },
        { amount: "30,001 - 50,000", duration: "7 Days" },
        { amount: "50,001 - 100,000", duration: "14 Days" },
        { amount: "100,001 - 250,000", duration: "21 Days" },
        { amount: "250,001 - 500,000", duration: "30 Days" },
        { amount: "500,001 - 999,999", duration: "60 Days" },
        { amount: "1,000,000 - 4,999,999", duration: "90 Days" },
        { amount: "5,000,000+", duration: "Custom (Contact Support)" },
      ],
    },

    TIMER_RESET: {
      headline: "The Timer Reset Rule",
      body:
        "Important: Any new deposit or relocking of matured funds resets the timer for all active locks to the full duration of the new deposit.",
    },

    BALANCE_TYPES: {
      headline: "Balance Types",
      items: [
        "Potential Balance: Total capital in Nomad (Locked + Matured).",
        "Available Balance: Capital that has completed lock duration.",
        "Closed-Loop System: Withdrawals return only to the verified originating account.",
      ],
    },

    FRICTION: {
      headline: "Costs of Early Withdrawal.",
      body:
        "Nomad is designed for total illiquidity. Early access triggers two friction layers that protect long-term goals.",
      points: [
        "Financial Friction: 3%-5% penalty fee on early withdrawal amount.",
        "Temporal Friction: Early unlock resets all other active timers.",
      ],
      closing:
        "Fees exist solely to deter impulsive decisions.",
    },

    VALUE: {
      headline: "Savings Comparison: Capital Protection",
      body:
        "The value of Nomad is retention of principal, not yield.",
      without:
        "Liquid Bank Account: High exposure to impulsive spend. ₦100,000 can reach ₦0 in days when access is immediate.",
      with:
        "Nomad Escrow: Zero exposure during lock. ₦100,000 remains ₦100,000 because spending access is removed for 14 days.",
      closing:
        "The profit of Nomad is principal retention.",
    },

    SECURITY: {
      headline: "Security",
      items: [
        "Data encryption in transit and at rest.",
        "Verified-account-only withdrawal path.",
        "Nomad is not a bank. Banking rails are provided by partner infrastructure (current environment partner: Providus Bank).",
        "No social tracking.",
      ],
    },

    FINAL_CTA: {
      headline: "Start Your Discipline Protocol.",
      primary: "Make a Deposit",
      secondary: "Contact Support for Deposits > ₦5,000,000",
      note: "Nomad is a private, single-user tool for capital preservation.",
    },
  },

  RULES: {
    eyebrow: "Read once",
    title: "NOMAD rules",
    intro: "This is the full set of rules. Read once.",
    items: [
      "Each deposit is its own lock.",
      "Lock time is set by total locked amount.",
      "₦1,000–₦5,000 → 1 day.",
      "₦5,001–₦15,000 → 3 days.",
      "₦15,001–₦30,000 → 5 days.",
      "₦30,001–₦50,000 → 7 days.",
      "₦50,001–₦100,000 → 14 days.",
      "₦100,001–₦250,000 → 21 days.",
      "₦250,001–₦500,000 → 30 days.",
      "₦500,001–₦999,999 → 60 days.",
      "₦1,000,000+ → Custom (≥90 days).",
      "You cannot shorten a lock.",
      "Any new deposit or relock resets the timer from now.",
      "Unmatured locks are not usable.",
      "Early unlock is allowed with a 3%–5% fee.",
      "Early unlock resets all active locks.",
      "Matured locks can be used or re-locked.",
      "Potential balance = all locks. Available balance = matured only.",
    ],
    taxChecklistTitle: "The Compliance Protocol",
    taxChecklist: [
      "Extract: Calculate 7.5% VAT and 10% WHT from each inflow.",
      "Vault: Move that amount into a Nomad Tax Lock immediately.",
      "Remit: On maturity, withdraw directly and pay the tax authority.",
    ],
    primaryCta: "I understand",
    secondaryCta: "Back",
  },

  SIGNUP: {
    title: "Create your NOMAD account",
    subtitle: "Set up your secure profile.",
    labels: {
      name: "Full name",
      businessName: "Business name",
      email: "Email",
      phone: "Phone number",
      userType: "Account type",
      password: "Password",
      confirmPassword: "Confirm password",
    },
    cta: "Start now",
    footer: {
      prompt: "Already have an account?",
      link: "Log in",
    },
    errors: {
      required: "Please complete all fields.",
      mismatch: "Passwords do not match.",
      businessNameRequired: "Business name is required for business signup.",
    },
  },

  LOGIN: {
    title: "Welcome back",
    subtitle: "Access your Safe and deposits.",
    
    labels: {
      email: "Email",
      password: "Password",
    },
    cta: "Continue",
    footer: {
      prompt: "New to NOMAD?",
      link: "Create an account",
    },
    errors: {
      required: "Email and password are required.",
    },
  },

  DASHBOARD: {
    title: "Safe",
    subtitle: "",
    balances: {
      available: "Available balance",
      potential: "Potential balance",
    },
    metrics: {
      activeLocks: "Active locks",
      nextUnlock: "Next unlock date",
    },
    insights: {
      title: "How your money is spaced",
      items: [
        "Every deposit is its own timer.",
        "Large deposits can use longer windows when you choose.",
        "Matured funds wait for your decision.",
      ],
    },
    actions: {
      delay: "Deposits",
      review: "View deposits",
    },
  },

  DEPOSIT: {
    title: "Deposits",
    subtitle: "Transfer from a linked account into NOMAD.",
    fields: {
      amount: "Amount",
      account: "From account",
      description: "Description",
    },
    rules: {
      label: "View lock rules",
      hint: "Lock duration is set by amount.",
    },
    placeholders: {
      amount: "Enter amount",
      account: "Select account",
      description: "Add a short description (optional)",
    },
    actions: {
      preview: "Preview lock",
      confirm: "Confirm deposit",
    },
    preview: {
      title: "Preview",
      maturity: "Maturity",
      duration: "Lock duration",
      amount: "Amount",
    },
    confirmed: {
      title: "Confirmed",
      body: "Deposit created and time‑locked.",
      idLabel: "Deposit ID",
    },
  },

  DEPOSITS: {
    title: "Deposits",
    subtitle: "Every deposit is listed with its time window.",
    empty: {
      title: "No deposits yet",
      body: "No deposits yet. Start when you're ready.",
    },
    columns: {
      amount: "Amount",
      status: "Status",
      matures: "Matures",
    },
    pagination: {
      previous: "Previous",
      next: "Next",
    },
  },

  DEPOSIT_DETAIL: {
    title: "Deposit detail",
    subtitle: "Review details before releasing funds.",
    labels: {
      amount: "Amount",
      status: "Status",
      maturity: "Maturity",
      rule: "Rule version",
    },
    preview: {
      title: "Release preview",
      penalty: "Penalty",
      net: "Net release",
      earlyFee: "Early unlock fee",
    },
    actions: {
      relock: "Lock again",
      release: "Release",
    },
    loading: "Loading details...",
  },

  RELEASE: {
    title: "Release decision",
    subtitle: "Choose the destination account and confirm.",
    loading: "Loading deposit details...",
    summary: {
      maturity: "Maturity",
      penalty: "Penalty",
      net: "Net release",
      mode: "Mode",
      fee: "Fee",
      timersReset: "Other timers reset",
      emergencyRemaining: "Emergency remaining",
    },
    modes: {
      single: "Unlock this deposit early",
      all: "Unlock all early",
    },
    emergency: {
      label: "Emergency unlock",
      no: "No emergency",
      yes: "Use emergency (no fees)",
    },
    fields: {
      destination: "Destination account",
      bank: "Bank",
      accountName: "Account name",
      accountNumber: "Account number",
      mode: "Unlock mode",
    },
    placeholders: {
      account: "Select account",
      bank: "Select bank",
      name: "Account holder name",
      number: "NUBAN account number",
    },
    status: {
      missingBank: "Bank account number and bank are required.",
    },
    actions: {
      confirm: "Confirm release",
    },
    complete: {
      title: "Release complete",
    },
  },

  RELOCK: {
    title: "Relock",
    subtitle: "Start a new lock with a fresh time window.",
    labels: {
      duration: "New lock duration",
      deposit: "Deposit",
    },
    hint: "Relock will be enabled when backend support is added.",
    action: "Delay again",
  },

  PROFILE: {
    title: "Profile",
    subtitle: "Verified identity and preferences.",
    accounts: {
      title: "Linked bank accounts",
      labels: {
        bank: "Bank name",
        last4: "Last 4 digits",
      },
      action: "Add account",
      empty:
        "No accounts yet. Add one when you are ready.",
      remove: "Remove",
      selectHint: "Select to use as destination.",
    },
    cards: {
      title: "Linked cards",
      labels: {
        name: "Name on card",
        last4: "Last 4 digits",
      },
      action: "Add card",
      empty:
        "Nothing is linked right now. NOMAD is here when you need it.",
      remove: "Remove",
    },
  },

  ACCOUNTS: {
    title: "Accounts",
    subtitle: "Only accounts matching your verified name are allowed.",
    labels: {
      bank: "Bank name",
      last4: "Last 4 digits",
    },
    action: "Add account",
    empty: "No accounts yet.",
    remove: "Remove",
  },

  SETTINGS: {
    title: "Settings",
    tone: {
      label: "Tone mode",
      calm: "Calm",
      strict: "Strict",
    },
    currency: {
      label: "Currency",
      hint: "Default is NGN.",
    },
    exit: {
      label: "Exit window",
      hint: "Coming soon.",
    },
    logout: "Log out",
  },
};

/**
 * FILE ROLE:
 * Centralized copy for the NOMAD frontend.
 *
 * CONNECTS TO:
 * - pages/LandingPage.jsx and other pages as copy is wired in
 *
 * USED BY:
 * - Frontend UI components and pages
 */

