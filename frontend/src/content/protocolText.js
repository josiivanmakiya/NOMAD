export const PROTOCOL_TEXT = {
  page: {
    title: "The Protocol",
    subtitle:
      "Hostile to impulse. Supportive of sovereignty.",
  },
  partnerBank: {
    name: "Providus Bank",
    note: "Banking rails and partner integrations are configured per deployment environment.",
  },
  rwaCounter: {
    label: "Projected Tokenized Asset Market by 2030 (BCG/Citibank Data)",
    value: "$16,000,000,000,000",
    caption: "Phase 2 thesis: global RWA tokenization is a structural shift, not a trend cycle.",
  },
  blackrockSignal: {
    label: "Institutional Signal",
    quote:
      "The next generation for markets, the next generation for securities, will be the tokenization of securities.",
    source: "Larry Fink, CEO BlackRock",
    note: "BUIDL is cited as an institutional move toward on-chain fund infrastructure.",
  },
  antiBank: {
    heading: "The Anti-Bank Philosophy",
    statement:
      "Nomad is not a bank. It is a closed-loop, time-locked behavioral escrow protocol.",
    body: [
      "Banks optimize liquidity: fast transfers, fast spending, fast leakage.",
      "Nomad optimizes preservation: delayed access, controlled withdrawal path, disciplined retention.",
      "Keep your bank for bills. Use Nomad as the firewall between your liquid account and impulsive decisions.",
    ],
    table: {
      headers: ["Feature", "Traditional Bank", "Nomad Protocol"],
      rows: [
        {
          feature: "Primary Goal",
          bank: "Facilitate spending and debt flows",
          nomad: "Enforce preservation and discipline",
        },
        {
          feature: "Liquidity",
          bank: "High (easy to move and spend)",
          nomad: "Controlled (time-locked access)",
        },
        {
          feature: "Philosophy",
          bank: "Profit from movement",
          nomad: "Protect through stillness",
        },
        {
          feature: "Transfer Structure",
          bank: "Open-loop (many destinations)",
          nomad: "Closed-loop (verified account return)",
        },
      ],
    },
    security: [
      "Closed-loop safety: withdrawals return only to your verified account rail.",
      "Narrow attack surface: no peer-to-peer spend features inside protocol flows.",
      "Single mandate: preserve capital until maturity.",
    ],
    line:
      "We do not want to be your bank. We want to be the reason your bank account still has money years from now.",
  },
  illiquidityTable: {
    label: "Illiquidity Premium Snapshot",
    headers: ["Investment Type", "Typical ROI", "Access Level"],
    rows: [
      {
        type: "Standard Bank Savings",
        roi: "1% - 15%",
        access: "High (Liquid)",
      },
      {
        type: "Nomad Preserved Capital",
        roi: "Retention (100%)",
        access: "Controlled",
      },
      {
        type: "Phase 2: RWA Structured Credit",
        roi: "18% - 24%",
        access: "Locked (Nomad)",
      },
      {
        type: "Phase 2: Emerging Market RE",
        roi: "25% - 35%",
        access: "Locked (Nomad)",
      },
    ],
  },
  loops: {
    heading: "Self-Sustaining Financial Loops",
    body: [
      "A self-sustaining loop is the point where preserved principal can generate enough cash-flow to support baseline living costs, while principal discipline remains intact.",
      "Illustrative path: preserving a daily leak and deploying matured capital into disciplined long-duration structures can transform behavioral savings into sovereign cash-flow.",
    ],
    math: [
      "Daily leak preserved: ₦4,000 (~$30).",
      "10-year preserved principal: ~₦14.6M (~$109k).",
      "Illustrative 20% annual yield on principal: ~₦2.9M (~$21k) yearly cash-flow.",
    ],
  },
  analogy: {
    heading: "Bitcoin 2008 / AI 1950 Analogy",
    body: [
      "2008 framed digital scarcity before mainstream adoption.",
      "1950 framed AI theory before infrastructure dominance.",
      "Nomad frames discipline infrastructure before the broad RWA era.",
    ],
  },
  sections: [
    {
      id: "banking-rails",
      heading: "Banking Rails Model (Not a Bank)",
      tag: "Operating Model",
      body: [
        "Nomad runs as a discipline layer on top of licensed banking rails through a partner model.",
        "Banking services are provided by partner infrastructure; Nomad enforces the lock protocol and release rules.",
        "Current banking rail partner shown in this environment: Providus Bank.",
      ],
      bullets: [
        "Partner model: license-by-proxy via regulated institution.",
        "Virtual account flow: each user can receive a unique funding rail.",
        "Closed-loop withdrawals: release only to verified linked account.",
        "Compliance path: KYC, AML controls, and data protection standards.",
      ],
    },
    {
      id: "cognitive-firewall",
      heading: "The Cognitive Firewall",
      body: [
        "The digital economy is optimized to extract spending through frictionless dopamine loops: one-click buys, betting feeds, and subscription drift.",
        "Nomad is the antidote. It acts as an external prefrontal layer for capital decisions. We do not optimize for spending velocity; we optimize for delayed, intentional action.",
      ],
    },
    {
      id: "liquidity-crisis",
      heading: "The Liquidity Crisis",
      body: [
        "When capital is permanently liquid, it is permanently vulnerable to behavioral leaks.",
        "Nomad turns liquid cash into frozen capital. By the time funds mature, impulse pressure usually decays and decision quality improves.",
      ],
    },
    {
      id: "phase-two",
      heading: "Phase 2: Beyond Currency",
      tag: "In Development",
      body: [
        "Future integrations are focused on asset pathways for matured capital, including access rails for regulated real-world asset products.",
        "Long-term direction: move users from pure preservation to disciplined capital deployment once maturity and stability thresholds are met.",
        "Opportunity framing: 97% of productive asset classes are still inaccessible to average users without institutional rails.",
      ],
      bullets: [
        "RWA access rails for matured balances.",
        "Structured pathways for fractional, regulated asset exposure.",
        "Regional expansion without changing the core lock discipline model.",
      ],
    },
    {
      id: "nomad-insight",
      heading: "Nomad Insight",
      tag: "In Development",
      body: [
        "Nomad AI is designed as a read-only discipline engine: it observes history, quantifies behavioral cost, and returns reality-based guidance.",
        "Mandate: no transaction execution, no custody decisions, no unauthorized movement of funds.",
      ],
      bullets: [
        "Read-only audit interpretation.",
        "Discipline pattern analysis.",
        "Cold-math reality checks for impulsive decisions.",
      ],
    },
    {
      id: "institutional",
      heading: "Institutional Trajectory",
      tag: "In Development",
      body: [
        "A long-term goal is to establish discipline history as a trust signal for financial institutions.",
        "Nomad measures consistency under time-lock constraints, not short-term spending aesthetics.",
      ],
    },
  ],
  disclaimer:
    "Disclaimer: Nomad currently provides capital preservation. RWA gateway and high-yield loop features are part of Phase 2 deployment.",
  closing:
    "Nomad is the bank for the version of you that exists after impulsive pressure is removed.",
};
