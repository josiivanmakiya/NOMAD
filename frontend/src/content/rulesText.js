export const RULES_TEXT = {
  page: {
    eyebrow: "Read once. Operate clearly.",
    title: "Rule Set",
    subtitle:
      "Clear behavioral finance rules for preservation, maturity, relock discipline, and long-horizon capital growth.",
  },
  basics: {
    title: "1. Deposit & Lock Basics",
    items: [
      "Each deposit is independent and has its own lock.",
      "Lock duration scales with deposit size (larger deposits -> longer locks).",
      "Matured deposits can be used or re-locked.",
      "Unmatured deposits are not usable.",
      "Potential Balance = all deposits (matured + unmatured).",
      "Available Balance = matured deposits only.",
    ],
  },
  tiers: {
    title: "2. Lock Duration Tiers (NGN)",
    headers: ["Deposit Size", "Lock Duration"],
    rows: [
      { amount: "N1,000 - N5,000", duration: "1 day" },
      { amount: "N5,001 - N15,000", duration: "3 days" },
      { amount: "N15,001 - N30,000", duration: "5 days" },
      { amount: "N30,001 - N50,000", duration: "7 days" },
      { amount: "N50,001 - N100,000", duration: "14 days" },
      { amount: "N100,001 - N250,000", duration: "21 days" },
      { amount: "N250,001 - N500,000", duration: "30 days" },
      { amount: "N500,001 - N999,999", duration: "60 days" },
      { amount: "N1,000,000 - N2,500,000", duration: "90 days" },
      { amount: "N2,500,001 - N5,000,000", duration: "120 days" },
      { amount: "N5,000,001 - N10,000,000", duration: "150 days" },
      { amount: "N10,000,001 - N20,000,000", duration: "180 days" },
      {
        amount: "N20,000,001+",
        duration: "Custom >=180 days (system recommendation required)",
      },
    ],
    note: "High-value deposits require a minimum-duration recommendation before confirmation.",
  },
  relock: {
    title: "3. Relock & Timer",
    items: [
      "Any new deposit or manual relock resets the timer for that deposit.",
      "Auto-relock applies to matured deposits after 6 hours of inactivity.",
      "Auto-relock duration is half the original lock duration.",
      "Users receive notification before/after auto-relock execution.",
    ],
  },
  unlock: {
    title: "4. Early Unlock",
    items: [
      "Early unlock is allowed with a 3%-5% fee (size-based).",
      "Fee is proportional to amount to discourage impulse decisions.",
      "Only the selected unlocked deposit is affected in this rule design.",
      "If re-locked after early unlock, timer restarts from new lock time.",
    ],
  },
  custom: {
    title: "5. Custom Locks (N20,000,000+)",
    items: [
      "Custom durations are allowed only above the system minimum.",
      "Extra user confirmation is required before custom lock activation.",
      "Custom lock intent flow adds friction to reduce impulsive overrides.",
    ],
  },
  rewards: {
    title: "6. Discipline Rewards",
    intro:
      "Rewards are financial-behavior incentives, not vanity badges.",
    pointsHeaders: ["Action", "Points", "Rule"],
    pointsRows: [
      { action: "Matured deposit", points: "+1", rule: "Per deposit matured without early unlock" },
      { action: "Auto-relock compliance", points: "+2", rule: "Matured funds left beyond 6-hour window" },
      { action: "No early unlock streak", points: "+5", rule: "Per 30 days without early unlock" },
      { action: "Lock streak milestone", points: "+10", rule: "Every 30 consecutive discipline days" },
      { action: "Phase 2 prep", points: "+15", rule: "N500k+ held >=30 days" },
      { action: "Tax Vault compliance", points: "+2", rule: "VAT/WHT provisioning behavior" },
      { action: "Early unlock trigger", points: "-5", rule: "Impulse breach penalty" },
    ],
    levelHeaders: ["Level", "Points", "Meaningful Benefit"],
    levelRows: [
      { level: "Seedling", points: "10", benefit: "Disciplined user status" },
      { level: "Sapling", points: "50", benefit: "Micro-loan preview and Phase 2 early insight" },
      { level: "Tree", points: "150", benefit: "Capital bonus and small-asset guidance" },
      { level: "Forest", points: "300", benefit: "Community pool and higher protocol flexibility" },
      { level: "Ecosystem", points: "600", benefit: "Larger loan and early RWA allocation window" },
      { level: "Sovereign", points: "1,000", benefit: "Behavior-based alternative credit tier" },
      { level: "Legacy", points: "2,000", benefit: "High-value RWA access and private guidance" },
    ],
  },
  dashboard: {
    title: "7. Dashboard Visibility",
    items: [
      "Per-deposit countdown and maturity status.",
      "Auto-relock threshold visibility when maturity approaches 6-hour window.",
      "Notifications for maturity, auto-relock, and early unlock events.",
    ],
  },
  definitions: {
    title: "8. Key Definitions",
    items: [
      "Potential Balance: all deposits regardless of lock status.",
      "Available Balance: matured deposits only.",
      "Auto-Relock: matured funds re-locked after 6-hour inactivity.",
      "Discipline Points: behavior score based on preservation consistency.",
    ],
  },
  taxChecklist: {
    title: "Tax Vault Compliance Protocol",
    items: [
      "Extract: Calculate 7.5% VAT and 10% WHT from each inflow.",
      "Vault: Lock the tax amount immediately in a dedicated tax lock.",
      "Remit: On maturity, withdraw and pay the authority directly.",
    ],
  },
  cta: {
    primary: "I understand the rules",
    secondary: "Back to home",
  },
};
