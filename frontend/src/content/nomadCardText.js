export const NOMAD_CARD_TEXT = {
  page: {
    title: "Nomad Card",
    subtitle: "Phase 3: The Subscription Firewall",
    status: "In Development / Coming Soon",
  },
  silentLeak: {
    heading: "The Silent Leak: Autopay and Subscription Creep",
    body: [
      "Recurring charges drain capital quietly through trials, forgotten software plans, and underused services.",
      "While users focus on visible daily spending, autopay can remove between ₦15,000 ($25) and ₦60,000 ($100) monthly.",
    ],
  },
  aggregation: {
    heading: "One Card. Total Aggregation.",
    body: [
      "The Nomad Card is not a traditional debit card. It is a discipline filter.",
      "Users will connect multiple bank accounts to view recurring obligations in one clinical ledger.",
      "Nomad detects patterns across rails; the user decides what survives.",
    ],
  },
  guillotine: {
    heading: "The Subscription Guillotine",
    body: [
      "For each recurring charge, Nomad presents two actions: Maintain or Guillotine.",
      "Guillotined subscriptions are terminated and the same amount is redirected into the Vault as locked capital.",
    ],
    tableHeaders: [
      "Subscription",
      "Monthly Leak",
      "10Y Leak (If Ignored)",
      "10Y Locked Track (Illustrative)",
    ],
    tableRows: [
      {
        label: "Streaming Stack",
        monthly: "₦9,500",
        leak10y: "₦1,140,000",
        locked10y: "₦1,140,000+ retained",
      },
      {
        label: "Music + Cloud",
        monthly: "₦7,000",
        leak10y: "₦840,000",
        locked10y: "₦840,000+ retained",
      },
      {
        label: "Unused Gym Plan",
        monthly: "₦18,000",
        leak10y: "₦2,160,000",
        locked10y: "₦2,160,000+ retained",
      },
      {
        label: "SaaS Drift",
        monthly: "₦25,000",
        leak10y: "₦3,000,000",
        locked10y: "₦3,000,000+ retained",
      },
    ],
  },
  globalControl: {
    heading: "Global Usage / Local Control",
    items: [
      "Zero-overdraft design: card actions only use matured (available) balance.",
      "Guillotined savings auto-enter lock protocol and reset discipline windows.",
      "Same control standard across local and international recurring charges.",
    ],
  },
  closing:
    "The Nomad Card is the final filter: every subscription must justify its existence against your long-term capital plan.",
};

