/* ============ Mentib DeepMatch — seed data ============
   Profiles from the AGIF ecosystem + sample family funds. */
(function (global) {
  "use strict";

  const PROFILES = [
    {
      id: "worldforge", type: "startup", name: "WorldForge", tagline: "41 agentic training worlds on real Earth maps.",
      description: "Walkable 3-D worlds with satellite imagery, elevation, OSM buildings, robot digital twins, and union trade certification courses. Powered by AGI Corp.",
      sectors: ["spatial", "robotics", "education"], stage: "launched", raiseTarget: 2500,
      geography: ["US", "global"], thesis: ["open-standards", "union-labor", "spatial-computing", "workforce-training"],
      traction: 78, links: { site: "https://worldforge.agifuturefoundation.org", github: "https://github.com/AGIFutureFoundation/WorldForge-Browser" }
    },
    {
      id: "smartcitix", type: "startup", name: "SmartCiti.X — Trade Craft Academy", tagline: "Gamified training for robotic + human integration.",
      description: "111 union halls, quests, authored wild worlds (427.9 km²), and the ACP Adaptive Stack with 9,267 passing checks.",
      sectors: ["spatial", "robotics", "education"], stage: "launched", raiseTarget: 1500,
      geography: ["US", "global"], thesis: ["open-standards", "union-labor", "spatial-computing", "workforce-training"],
      traction: 82, links: { site: "https://smartciti.x.agifuturefoundation.org", github: "https://github.com/AGIFutureFoundation/SmartCiti.X" }
    },
    {
      id: "wave", type: "startup", name: "WAVE — Wild Animal Voice Engine", tagline: "AI bioacoustics: decode the voices of Earth in 5–7 seconds.",
      description: "Translates, visualizes, and researches animal communication in real time. MIT-licensed engine, 12,000+ species, edge-ready TinyML deployment.",
      sectors: ["ai", "bioacoustics", "climate"], stage: "launched", raiseTarget: 800,
      geography: ["global"], thesis: ["open-source", "conservation", "edge-ai"],
      traction: 74, links: { site: "https://bioacoustics.cloud", github: "https://github.com/WAVETranslator" }
    },
    {
      id: "diagnosticx", type: "startup", name: "Diagnostic.X", tagline: "Healthcare diagnostics under an AGI-safety mandate.",
      description: "A commercial healthcare and systems-diagnostics platform governed by an AGI-safety mandate, liability-isolated inside 66-W3.",
      sectors: ["ai", "health"], stage: "building", raiseTarget: 5000,
      geography: ["US"], thesis: ["agi-safety", "fiduciary-governance", "healthcare"],
      traction: 55, links: { site: "https://diagnostic.x.agifuturefoundation.org" }
    },
    {
      id: "roboticsdao", type: "startup", name: "Robotics DAO", tagline: "Governing physical-AI deployment, on-chain.",
      description: "On-chain governance for commercial robot deployment — combining DAO structure with a safety mandate. Companion to WorldForge's fleet of 10 robot types.",
      sectors: ["robotics", "web3"], stage: "building", raiseTarget: 3000,
      geography: ["US", "global"], thesis: ["agi-safety", "physical-ai", "dao-governance"],
      traction: 60, links: { site: "https://robotics.agifuturefoundation.org" }
    },
    {
      id: "trueforge", type: "startup", name: "trueforge", tagline: "The open-source agent harness.",
      description: "The runtime layer that turns an LLM into a working agent — the plumbing beneath the agentic web.",
      sectors: ["ai"], stage: "launched", raiseTarget: 1200,
      geography: ["global"], thesis: ["open-source", "agent-infrastructure"],
      traction: 66, links: { github: "https://github.com/AGIFutureFoundation/trueforge" }
    },
    {
      id: "plaudguard", type: "startup", name: "PlaudGuard-AI", tagline: "Meeting audio → graph-grounded corporate compliance.",
      description: "An enterprise agentic guardian converting meeting audio into compliance, enforcing fiduciary critic vetoes before commitments execute.",
      sectors: ["ai", "security"], stage: "building", raiseTarget: 2000,
      geography: ["US"], thesis: ["fiduciary-governance", "enterprise-ai"],
      traction: 48, links: { github: "https://github.com/AGIFutureFoundation/PlaudGuard-AI" }
    },
    {
      id: "sentinel", type: "startup", name: "Sentinel Stream", tagline: "Real-time threat detection for LLM agents.",
      description: "A self-evolving deep cybersecurity hive with the Omega-Claw multi-agent framework — production-grade, v0.3.0.",
      sectors: ["ai", "security"], stage: "launched", raiseTarget: 1000,
      geography: ["US", "global"], thesis: ["agent-infrastructure", "security"],
      traction: 70, links: { github: "https://github.com/AGIFutureFoundation/sentinel-stream" }
    },
    {
      id: "dyva", type: "startup", name: "Dyva", tagline: "An AI router for the untamed wild web.",
      description: "Routes agents safely across the open internet — the trust layer for the agentic web.",
      sectors: ["ai", "security"], stage: "building", raiseTarget: 900,
      geography: ["global"], thesis: ["agent-infrastructure", "open-source"],
      traction: 52, links: { github: "https://github.com/AGIFutureFoundation/dyva-agentic-network" }
    },
    {
      id: "sapientx", type: "startup", name: "Sapient.X", tagline: "One action per signal, for small business.",
      description: "Takes a signal a small shop already has — returns, shrinkage, ad winners, POS sales — and returns exactly one tested action. Built at the Itchathon, powered by AGI Corp.",
      sectors: ["ai"], stage: "building", raiseTarget: 750,
      geography: ["US"], thesis: ["small-business", "evidence-first"],
      traction: 44, links: { github: "https://github.com/AGIFutureFoundation/Itchathon-tools" }
    },
    {
      id: "locatorx", type: "startup", name: "Locator.X", tagline: "Real estate analytics & mapping for the smart city.",
      description: "The physical-layer analytics engine of the SmartCiti.X stack.",
      sectors: ["realestate", "spatial"], stage: "building", raiseTarget: 1100,
      geography: ["US"], thesis: ["spatial-computing", "smart-cities"],
      traction: 50, links: { github: "https://github.com/AGIFutureFoundation/Locator.X" }
    },
    {
      id: "cognitionx", type: "startup", name: "Cognition.X — Flow Zone", tagline: "Modular learning frameworks for the next generation.",
      description: "Education-based learning modular frameworks inside the SmartCiti.X ecosystem.",
      sectors: ["education", "ai"], stage: "idea", raiseTarget: 600,
      geography: ["US", "global"], thesis: ["workforce-training", "education"],
      traction: 35, links: { github: "https://github.com/AGIFutureFoundation/Cognition.X" }
    },
    {
      id: "agif-pbc", type: "investor", name: "AGI Future Foundation PBC", tagline: "Architecting global AGI prosperity — Open Global Investment.",
      description: "California Public Benefit Corporation. The Fiduciary Shield, OGI share classes (A/B/C), and the Windfall Clause. Invests to keep humanity and AGI aligned.",
      sectors: ["ai", "robotics", "spatial", "health", "security", "education"], stages: ["idea", "building", "launched", "scaling"],
      checkMin: 500, checkMax: 5000, geography: ["US", "global"],
      thesis: ["agi-safety", "fiduciary-governance", "open-standards", "dao-governance"],
      traction: 90, links: { site: "https://agifuturefoundation.org" }
    },
    {
      id: "w3llc", type: "investor", name: "66-W3 Commercial Engine", tagline: "The Wyoming Series house — 33 agentic subsidiaries.",
      description: "The commercial engine of the Foundation: a Wyoming Series LLC holding specialized agentic subsidiaries with isolated assets and liability.",
      sectors: ["ai", "robotics", "web3", "spatial"], stages: ["building", "launched", "scaling"],
      checkMin: 250, checkMax: 3000, geography: ["US"],
      thesis: ["dao-governance", "physical-ai", "fiduciary-governance"],
      traction: 72, links: { site: "https://agifuturefoundation.org#architecture" }
    },
    {
      id: "agiaccelerator", type: "investor", name: "AGI Accelerator Fund", tagline: "Live-in residency capital for AI founders in San Francisco.",
      description: "60-day live-in residency — $5K all-inclusive with housing, co-working, events, and deep investor matching. Operated by AGI Corp & AGI Future Foundation.",
      sectors: ["ai", "robotics", "spatial"], stages: ["idea", "building"],
      checkMin: 50, checkMax: 250, geography: ["US"],
      thesis: ["founder-residency", "agi-safety"],
      traction: 65, links: { site: "https://agi.lease" }
    },
    {
      id: "metropolis-fund", type: "investor", name: "Metropolis Track 04 Fund", tagline: "On-chain capital — ERC-8004 agents, x402 payments, Monad.",
      description: "The on-chain fund of the Metropolis-SmartCiti stack: agent identity, micropayment flows, and 2-of-3 passkey steward governance.",
      sectors: ["web3", "ai", "robotics", "spatial"], stages: ["building", "launched"],
      checkMin: 100, checkMax: 1500, geography: ["global"],
      thesis: ["dao-governance", "x402", "open-standards"],
      traction: 58, links: { github: "https://github.com/AGIFutureFoundation/Metropolis-SmartCiti" }
    },
    {
      id: "agicorp", type: "corporation", name: "AGI Corp", tagline: "Agents operate; people govern.",
      description: "The operating company of the family — powers WorldForge, SmartCiti.X, the Accelerator, and the agentic subsidiary network.",
      sectors: ["ai", "robotics", "spatial", "education"], stages: ["building", "launched", "scaling"],
      checkMin: 200, checkMax: 4000, geography: ["US", "global"],
      thesis: ["agi-safety", "workforce-training", "spatial-computing", "physical-ai"],
      traction: 85, links: { site: "https://agifuturefoundation.org#ventures" }
    },
    {
      id: "metaversal", type: "corporation", name: "Metaversal Corporation (RP1 / 8-P)", tagline: "Connect the world through an open metaverse.",
      description: "Builders of the RP1 open metaverse ecosystem: Sneeze engine, Rubidium browser, Artemis, the VRS Universal Map, RMAP, and Statabase. Partners via OMBI standards.",
      sectors: ["spatial", "ai", "robotics"], stages: ["building", "launched", "scaling"],
      checkMin: 1000, checkMax: 10000, geography: ["US", "global"],
      thesis: ["open-standards", "spatial-computing", "physical-ai"],
      traction: 88, links: { site: "https://rp1.com" }
    },
    {
      id: "hunterspoint", type: "family_fund", name: "Hunters Point Family Fund", tagline: "San Francisco-rooted, community-first capital. (sample)",
      description: "A Bayview–Hunters Point anchored family fund investing in local workforce, remediation, and community AI. Sample profile.",
      sectors: ["realestate", "education", "climate"], stages: ["idea", "building", "launched"],
      checkMin: 25, checkMax: 500, geography: ["US"],
      thesis: ["workforce-training", "small-business", "conservation"],
      traction: 40, links: {}
    },
    {
      id: "goldgate", type: "family_fund", name: "Gold Gate Family Office", tagline: "Patient capital for the spatial age. (sample)",
      description: "Multi-generational family office with a thesis on spatial computing and the open metaverse. Sample profile.",
      sectors: ["spatial", "ai", "web3"], stages: ["building", "launched", "scaling"],
      checkMin: 250, checkMax: 2000, geography: ["US", "global"],
      thesis: ["open-standards", "spatial-computing"],
      traction: 45, links: {}
    }
  ];

  global.MENTIB_DATA = {
    PROFILES: PROFILES,
    SECTORS: ["ai", "robotics", "spatial", "climate", "health", "education", "security", "web3", "bioacoustics", "realestate"],
    STAGES: ["idea", "building", "launched", "scaling"]
  };
})(this);
