export const DYNASTY_TEXT = {
  page: {
    title: "Dynasty",
    subtitle: "The 20-Year Fortress",
    status: "In Development / Legacy Lock",
  },
  opening:
    "Most parents save for children in accounts they can still raid under pressure. Dynasty Lock is designed to preserve transfer intent across decades.",
  legacyLock: {
    heading: "Legacy Lock",
    points: [
      "Maturity trigger is age-based (18, 21, 25, 30), not date-only.",
      "After irrevocable conversion, parent-side early unlock is disabled.",
      "Goal: protect beneficiary capital from future impulsive pressure.",
    ],
  },
  legalModel: {
    heading: "Legal Fortress Model (Operational Direction)",
    points: [
      "Digital trust deed flow for long-term transfer intent.",
      "Minor beneficiary verification path (birth record/NIN where applicable).",
      "Transfer readiness event starts 30 days before target age.",
    ],
  },
  math: {
    heading: "Dynasty Math Snapshot",
    headers: ["Scenario", "Monthly Deposit", "20Y Outcome"],
    rows: [
      {
        label: "Leak Path (Unstructured)",
        monthly: "₦10,000",
        outcome: "Frequent borrowing from fund, unstable terminal value",
      },
      {
        label: "Fortress Path (Locked)",
        monthly: "₦10,000",
        outcome: "₦2.4M principal preserved before Phase 2 deployment",
      },
    ],
  },
  hNwi: {
    heading: "Private Client Layer (Future)",
    body:
      "For high balances, an asset-transition specialist can guide post-maturity deployment while keeping discipline controls intact.",
  },
  handoverProtocol: {
    heading: "The Handover Protocol",
    body:
      "An unplanned inheritance is often consumed quickly. Dynasty defines a sovereignty transfer path: beneficiary verification, timed transfer window, and guided deployment to reduce liquidation behavior after handover.",
    points: [
      "Transfer-readiness notice starts before target age.",
      "Beneficiary identity verification is required before ownership migration.",
      "Capital moves as protocol-defined transfer intent, not ad-hoc spending cash.",
      "Nomad Insight guidance supports preservation-first deployment after handover.",
    ],
  },
  stories: {
    heading: "Dynasty User Stories",
    items: [
      {
        title: "User Story 1: The Foundation (Initialization)",
        roleLine:
          "As a parent, I want to create an unbreakable foundation for my newborn, so adulthood begins with capital, not debt.",
        points: [
          "Grantor creates a Legacy Lock and sets beneficiary identity (name + DOB).",
          "Target age is selected (for example, 21).",
          "Monthly deposit protocol starts (for example, ₦10,000).",
          "After consistency threshold, grantor can set Irrevocable mode with explicit warning.",
        ],
      },
      {
        title: "User Story 2: The Crisis (Protection from Self)",
        roleLine:
          "As a parent in financial stress, I need my child's vault to remain protected from my short-term pressure.",
        points: [
          "Grantor faces emergency liquidity needs.",
          "Dynasty balance is visible but inaccessible once irrevocable.",
          "No parent-side early unlock path is available.",
          "Protocol protects the beneficiary from grantor-side impulse.",
        ],
      },
      {
        title: "User Story 3: The Handover (Maturity)",
        roleLine:
          "As the beneficiary, I want a secure transfer at target age and guidance for disciplined deployment.",
        points: [
          "System triggers transfer-readiness notifications before maturity.",
          "Beneficiary completes identity checks at handover.",
          "Vault ownership migrates to beneficiary dashboard.",
          "Nomad Insight guidance supports deployment vs celebration-spend behavior.",
        ],
      },
      {
        title: "User Story 4: The Private Client (HNWI)",
        roleLine:
          "As an HNWI family, I want specialist guidance so large maturity balances are managed, not consumed.",
        points: [
          "High-balance vaults can trigger private client prep before maturity.",
          "Beneficiary receives structured transition planning.",
          "Capital is framed as a yield machine, not spending cash.",
          "Objective: preserve dynasty intent across generations.",
        ],
      },
    ],
  },
  summaryTable: {
    heading: "Dynasty Flow Summary",
    headers: ["Action", "Result"],
    rows: [
      {
        action: "Setup",
        result: "Grantor defines Age of Sovereignty (18-30).",
      },
      {
        action: "Reset Rule",
        result: "New deposits maintain disciplined lock structure.",
      },
      {
        action: "Irrevocability",
        result: "Parent-side early unlock is disabled after conversion.",
      },
      {
        action: "Handover",
        result: "Secure beneficiary transfer at target age.",
      },
      {
        action: "Guidance",
        result: "Nomad Insight supports asset-focused deployment.",
      },
    ],
  },
  closing:
    "Dynasty is a sovereignty transfer protocol: you are not only saving money, you are preserving intent.",
};
