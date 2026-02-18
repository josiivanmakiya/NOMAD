import { TEXT } from "./text.js";
import { GENESIS_TEXT } from "./genesisText.js";
import { VALUES_TEXT } from "./valuesText.js";
import { PROTOCOL_TEXT } from "./protocolText.js";
import { ROADMAP_TEXT } from "./roadmapText.js";
import { NOMAD_CARD_TEXT } from "./nomadCardText.js";
import { DYNASTY_TEXT } from "./dynastyText.js";
import { TAX_EFFICIENCY_TEXT } from "./taxEfficiencyText.js";
import { KNOWLEDGE_TEXT } from "./knowledgeText.js";
import { settingsCopy } from "./settingsCopy.js";
import { AUTH_FLOW_COPY } from "./authFlowCopy.js";
import { HISTORY_SPEC } from "./historySpec.js";
import { NOMAD_INSIGHT_GUIDE } from "./nomadInsightGuide.js";
import { UI_ACTION_MAP } from "./uiActionMap.js";

export const GLOBAL_TEXT = {
  appName: "NOMAD",
  home: {
    nav: {
      home: "Home",
      whyNomad: "Why Nomad",
      rules: "Rules",
      login: "Login",
    },
    hero: {
      tagline: "NOMAD: The Capital Preservation Protocol.",
      line1: "Manage your leaks. Secure your capital. Build your dynasty.",
      line2: "Nomad is a closed-loop, time-locked escrow for the disciplined.",
      line3: "Phone number only. 10-second entry.",
      waitlistCta: "Join Waitlist",
      enterCta: "Enter Nomad",
      loginCta: "Login",
      waitlistHint: "Open waitlist enrollment is live.",
    },
    sections: {
      auditTitle: "The Audit",
      featuresTitle: "Core Features",
      futureTitle: "The Future (Phase 2)",
      comparisonTitle: "The Comparison",
    },
    footer: {
      product: "Nomad service.",
      security: "Security: Data encryption and verified-account-only transfer rules.",
      support: "Support: help@nomad.app",
    },
  },
  whyNomad: {
    title: "Why Nomad",
    intro:
      "Nomad is a closed-loop discipline protocol. It is not a bank. It is built to preserve capital by removing immediate access during impulse windows.",
    sections: {
      coreLogic: "The Core Logic",
      math: "The Math",
      includes: "What Nomad Includes",
      access: "Access",
    },
  },
  modules: {
    text: TEXT,
    genesis: GENESIS_TEXT,
    values: VALUES_TEXT,
    protocol: PROTOCOL_TEXT,
    roadmap: ROADMAP_TEXT,
    nomadCard: NOMAD_CARD_TEXT,
    dynasty: DYNASTY_TEXT,
    taxEfficiency: TAX_EFFICIENCY_TEXT,
    knowledge: KNOWLEDGE_TEXT,
    settings: settingsCopy,
    authFlow: AUTH_FLOW_COPY,
    historySpec: HISTORY_SPEC,
    nomadInsightGuide: NOMAD_INSIGHT_GUIDE,
    uiActionMap: UI_ACTION_MAP,
  },
};
