export const VALUES_TEXT = {
  page: {
    title: "The Economics of Discipline",
    subtitle: "Preservation vs. interest.",
  },
  intro: {
    label: "Behavioral leakage: the unseen tax",
    body:
      "A behavioral leak is money spent without conscious intent. Nomad exists to pause impulse and preserve principal.",
  },
  sections: {
    ngnTitle: "Nigerian impact: from leaks to land",
    usdTitle: "Global impact: from coffee to capital",
  },
  table: {
    headers: ["Leak Level", "Daily", "1 Year", "10 Years", "20 Years"],
    ngnRows: [
      {
        level: "Low (₦1,500)",
        daily: "₦1,500",
        year1: "₦547,500",
        year10: "₦5,475,000",
        year20: "₦10,950,000",
        ownership10: "Entry-level developed plot",
        ownership20: "Land + construction reserve",
      },
      {
        level: "Mid (₦4,000)",
        daily: "₦4,000",
        year1: "₦1,460,000",
        year10: "₦14,600,000",
        year20: "₦29,200,000",
        ownership10: "Prime plot or logistics fleet",
        ownership20: "Multi-unit rental base",
      },
      {
        level: "High (₦15,000)",
        daily: "₦15,000",
        year1: "₦5,475,000",
        year10: "₦54,750,000",
        year20: "₦109,500,000",
        ownership10: "Commercial property deposit",
        ownership20: "Large property portfolio base",
      },
    ],
    usdRows: [
      {
        level: "Low ($7)",
        daily: "$7",
        year1: "$2,555",
        year10: "$25,550",
        year20: "$51,100",
        ownership10: "Small property reserve or tuition fund",
        ownership20: "Major tuition + mobility reserve",
      },
      {
        level: "Mid ($30)",
        daily: "$30",
        year1: "$10,950",
        year10: "$109,500",
        year20: "$219,000",
        ownership10: "Major-city down payment",
        ownership20: "Full suburban home trajectory",
      },
      {
        level: "High ($100)",
        daily: "$100",
        year1: "$36,500",
        year10: "$365,000",
        year20: "$730,000",
        ownership10: "Early-retirement foundation",
        ownership20: "High-capital independence path",
      },
    ],
  },
  timeline: {
    label: "Ownership timeline",
  },
  theorem: {
    label: "The Nomad theorem",
    ngn:
      "Stopping a ₦4,000 daily leak preserves ₦1,460,000 yearly. Typical savings interest on ₦1,000,000 at 15% is ₦150,000. Preservation dominates interest.",
    usd:
      "Stopping a $30 daily leak preserves $10,950 yearly. Yield on a depleting balance cannot outperform consistent leak prevention.",
  },
  taxLeak: {
    label: "The Tax Leak: Penalties vs Provisioning",
    body:
      "Tax is a predictable leak. Most users do not evade tax, they fail to provision. Spending money owed to tax authorities converts liquidity into avoidable penalties.",
    exampleProblem:
      "Problem example: You receive ₦200,000, spend ₦190,000, and later owe about ₦35,000 (VAT + tax liability). If only ₦10,000 remains, you are exposed to debt and penalties.",
    exampleFix:
      "Nomad fix: Move ₦35,000 into a 30-day Tax Vault immediately. At maturity, remit and stay compliant.",
    checklistTitle: "Compliance protocol",
    checklist: [
      "Extract: Calculate 7.5% VAT and 10% WHT from each inflow.",
      "Vault: Lock that amount immediately in a Tax Lock.",
      "Remit: On maturity, withdraw and pay the authority.",
    ],
  },
  calculator: {
    label: "Tax Provisioning Calculator",
    hint:
      "Enter your inflow. Nomad estimates VAT (7.5%), WHT (10%), and recommended Tax Vault amount.",
    fields: {
      income: "Monthly inflow",
      vat: "VAT (7.5%)",
      wht: "WHT (10%)",
      recommended: "Tax Vault recommendation",
      spendable: "Estimated spendable now",
    },
  },
  illiquidityExplainer: {
    label: "Illiquidity Premium (Simple Explanation)",
    intro:
      "Illiquidity means your money is locked. The premium is the extra return people get for accepting that lock. Easy access usually gives low return. Controlled access can unlock higher return paths.",
    rows: [
      {
        title: "Standard Bank Savings",
        body:
          "Access is easy, so returns are usually low. Because money stays liquid, impulse spending risk stays high.",
      },
      {
        title: "Nomad Preserved Capital (Now)",
        body:
          "Nomad currently delivers retention. You may not earn interest yet, but you keep principal that would have leaked.",
      },
      {
        title: "Phase 2: RWA Structured Credit",
        body:
          "Future model: matured locked capital can be allocated to regulated real-economy credit rails with higher long-duration yield profiles.",
      },
      {
        title: "Phase 2: Emerging Market Real Estate",
        body:
          "Future model: fractional exposure to growth corridors where value is less liquid but long-term upside can be stronger.",
      },
    ],
    summary:
      "Core message: if your goal is long-term growth, permanent easy access can work against you.",
    analogyTitle: "Seed Analogy",
    analogy:
      "A liquid balance is a seed in your pocket: easy to consume, hard to grow. A locked balance is a seed planted behind a fence: harder to touch now, more likely to become a tree later.",
  },
  maturity: {
    label: "The maturity protocol",
    body:
      "Impulse spending is a leak you regret. Conscious spending is a reward you chose. Nomad does not decide for you; it delays impulse so the final spend is intentional.",
  },
  democratization: {
    label: "The Democratization of Wealth",
    body:
      "High-yield opportunities were historically gated by high entry capital. Nomad reframes entry capital as discipline. A stopped daily leak becomes self-funded access.",
  },
  localToGlobal: {
    label: "The Local-to-Global Bridge",
    body:
      "The transition is from local liquid cash to global tokenized assets. Nomad starts with preservation, then supports disciplined deployment when maturity is reached.",
  },
  africanRwa: {
    label: "African RWAs (Phase 2)",
    tag: "In Development",
    items: [
      "Fractional Land Ownership in developing commercial corridors.",
      "Commodity and Export Finance for sectors like cashew, cocoa, and ginger.",
      "Agro-Industrial Loops focused on value-add processing capacity.",
    ],
  },
  rwaHub: {
    label: "RWA deployment hub",
    tag: "coming soon",
    intro:
      "Nomad does not push users into assets immediately. It first builds discipline capital, then opens regulated RWA rails when maturity and behavior thresholds are met.",
    thesis: [
      "Preservation first: principal survives before any yield decisions.",
      "Deployment second: only matured balances can enter RWA pathways.",
      "Control always: lock logic and release rules remain active after deployment.",
    ],
    tracksTitle: "asset tracks",
    tracksHeaders: ["track", "focus", "why it matters"],
    tracksRows: [
      {
        track: "nigeria land corridors",
        focus: "fractional access to verified growth zones",
        reason: "hard-asset base with long-duration discipline",
      },
      {
        track: "commodity export cycles",
        focus: "cashew, cocoa, ginger, and warehousing rails",
        reason: "yield tied to production and trade activity",
      },
      {
        track: "africa trade receivables",
        focus: "invoice and settlement-backed structures",
        reason: "cash-flow visibility with regulated route controls",
      },
      {
        track: "agro-processing capacity",
        focus: "value-add plants and supply-chain loops",
        reason: "turns raw output into higher-value asset exposure",
      },
    ],
    controlsTitle: "risk and control layer",
    controls: [
      "Verified account rail only for withdrawals and maturity exits.",
      "Allocation caps per user tier to avoid concentration risk.",
      "Cooling-off windows before final deployment confirmation.",
      "Read-only Nomad Insight guidance for scenario checks.",
      "Audit-first logging for every deployment and release action.",
    ],
    readinessTitle: "readiness gates before deployment",
    readinessHeaders: ["gate", "minimum signal", "status impact"],
    readinessRows: [
      {
        gate: "discipline points",
        signal: "sustained score growth from maturity behavior",
        impact: "unlocks broader track access",
      },
      {
        gate: "no early unlock pattern",
        signal: "clean behavior window over recent cycles",
        impact: "raises allocation confidence",
      },
      {
        gate: "lock streak",
        signal: "consistent commitment days",
        impact: "improves trust profile tier",
      },
      {
        gate: "matured balance threshold",
        signal: "minimum deployable capital per track",
        impact: "enables phase-based entry",
      },
    ],
    flowTitle: "deployment flow",
    flow: [
      "Step 1: Preserve capital with lock discipline.",
      "Step 2: Reach maturity and pass readiness gates.",
      "Step 3: Select an asset track with bounded allocation.",
      "Step 4: Confirm deployment under control rules.",
      "Step 5: Monitor performance and re-lock proceeds.",
    ],
  },
  rwaLandscape: {
    label: "africa and nigeria landscape",
    tag: "coming soon",
    intro:
      "This phase is focused on local relevance first: preserve capital in phase 1, then route matured balances into disciplined african and nigerian asset pathways.",
    africaTitle: "africa focus",
    africaPoints: [
      "regional commodity and export growth corridors",
      "infrastructure-linked financing rails",
      "cross-border settlement and custody improvements",
    ],
    nigeriaTitle: "nigeria focus",
    nigeriaPoints: [
      "land and logistics belts around high-demand cities",
      "agro and processing value chains with real demand",
      "disciplined tax-aware deployment through verified rails",
    ],
    note:
      "All modules stay gated by discipline signals, lock maturity, and release controls before deployment.",
  },
  noBarrier: {
    label: "The No-Barrier Promise",
    body:
      "Whether you lock ₦2,000 or ₦2,000,000, protocol rules are identical. Small starts are valid starts.",
    line:
      "You do not need to be rich to start. You need to be disciplined to stay rich.",
  },
  navigator: {
    label: "Nomad Insight Role (Phase 2)",
    tag: "In Development",
    body:
      "The AI navigator is designed to map matured balance thresholds to verified local and global opportunity rails, using cold-math guidance.",
  },
  sovereigntyPath: {
    label: "Path to Sovereignty",
    steps: [
      "Step 1: Identify the leak.",
      "Step 2: Activate the Nomad lock.",
      "Step 3: Build the war chest.",
      "Step 4: Deploy via Nomad Insight (Phase 2).",
    ],
  },
};
