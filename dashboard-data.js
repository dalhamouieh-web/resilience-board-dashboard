// Sample data for the Resilience Board Dashboard.
// Bank Horizon UAE is a FICTIONAL bank. Every figure below is illustrative dummy data.
// Edit this file (or the CSVs in data/csv/) to load your own numbers.

window.DASHBOARD_DATA = {
  meta: {
    institution: "Bank Horizon UAE (fictional)",
    reportTitle: "Operational Resilience & ICT Risk Dashboard",
    framework: "Aligned to the CBUAE Operational Risk Management Regulation (Circular 1/2026)",
    quarters: ["Q1 2026", "Q2 2026", "Q3 2026", "Q4 2026"],
    defaultQuarter: "Q4 2026"
  },

  // Six resilience outcomes, status per quarter: "green" | "amber" | "red"
  outcomes: [
    { id: "govern",  name: "Govern & Own",                status: ["amber", "green", "green", "green"], note: "Appetite and tolerance for disruption approved by the Board" },
    { id: "know",    name: "Know What Must Not Break",    status: ["amber", "amber", "amber", "amber"], note: "11 of 14 Critical Operations fully mapped" },
    { id: "protect", name: "Protect & Detect",            status: ["amber", "amber", "green", "amber"], note: "Critical vulnerability backlog above threshold" },
    { id: "respond", name: "Respond & Recover",           status: ["green", "amber", "amber", "red"],   note: "Payments recovery test: 6 h against a 4 h tolerance" },
    { id: "third",   name: "Third Party & Concentration", status: ["amber", "amber", "amber", "amber"], note: "4 of 9 critical providers lack a tested exit plan" },
    { id: "test",    name: "Test & Assure",               status: ["amber", "amber", "green", "green"], note: "Testing programme on track" }
  ],

  // One headline per quarter: what the Board must know and decide
  headlines: {
    "Q1 2026": { position: "amber", text: "Testing programme starting; Board resilience training incomplete.", decisions: ["Approve the 2026 testing plan"] },
    "Q2 2026": { position: "amber", text: "One major incident (internet banking), notified on time.", decisions: ["Approve tolerance for disruption for 14 Critical Operations"] },
    "Q3 2026": { position: "amber", text: "Control effectiveness improving; vendor exit plans lagging.", decisions: ["Endorse exit-plan testing for Vendor X and Vendor Y"] },
    "Q4 2026": { position: "amber", text: "One of eight key risk indicators is red: payments missed its tolerance for disruption in testing.",
                 decisions: ["Approve funding for a second payments processing site", "Accept or reject the risk on Vendor X until its exit plan is tested in Q2 2027"] }
  },

  // Key risk indicators. direction "up" = higher is worse; "down" = lower is worse.
  // amber / red are thresholds; null means no amber band.
  kris: [
    { id: "major",     name: "Major ICT incidents in the quarter",              unit: "",  values: [0, 1, 0, 1],      amber: 1,   red: 2,   direction: "up",   anchor: "Incident management and notification" },
    { id: "breach",    name: "Recovery tests that breached tolerance",           unit: "",  values: [0, 0, 0, 1],      amber: null, red: 1,  direction: "up",   anchor: "Board-approved tolerance for disruption" },
    { id: "single",    name: "Critical Operations reliant on one provider",      unit: "%", values: [33, 34, 36, 36],  amber: 30,  red: 40,  direction: "up",   anchor: "Third-party concentration and substitutability" },
    { id: "tested",    name: "Critical Operations tested in the last 12 months", unit: "%", values: [64, 70, 74, 78],  amber: 80,  red: 60,  direction: "down", anchor: "Annual BCP and DR testing" },
    { id: "controls",  name: "Key controls rated effective (second line)",       unit: "%", values: [84, 85, 86, 91],  amber: 90,  red: 80,  direction: "down", anchor: "Internal control system" },
    { id: "vulns",     name: "High-severity vulnerabilities past deadline",      unit: "",  values: [7, 8, 9, 14],     amber: 10,  red: 20,  direction: "up",   anchor: "ICT and cyber risk controls" },
    { id: "notify",    name: "Regulator notifications on time (4h, 24h, 72h)",   unit: "%", values: [100, 100, 100, 100], amber: 100, red: 95, direction: "down", anchor: "CBUAE notification deadlines" },
    { id: "training",  name: "Board members trained on resilience (of 9)",       unit: "",  values: [6, 7, 8, 9],      amber: 9,   red: 7,   direction: "down", anchor: "Board knowledge and oversight" }
  ],

  // Critical Operations: tolerance for disruption vs latest tested recovery (hours)
  criticalOperations: [
    { name: "Domestic payments",               toleranceHours: 4,  testedHours: 6,    testMonth: "Sep 2026", mapped: "Yes" },
    { name: "Card processing (vendor-run)",    toleranceHours: 4,  testedHours: null, testMonth: "Not yet tested", mapped: "Partly" },
    { name: "Mobile and online banking",       toleranceHours: 8,  testedHours: 5,    testMonth: "Jul 2026", mapped: "Yes" },
    { name: "Liquidity and treasury",          toleranceHours: 8,  testedHours: 7,    testMonth: "Aug 2026", mapped: "Partly" },
    { name: "Customer accounts and records",   toleranceHours: 24, testedHours: 10,   testMonth: "Jun 2026", mapped: "Yes" }
  ],

  incidents: {
    major: [0, 1, 0, 1],
    minor: [31, 35, 39, 47],
    onTimePct: [100, 100, 100, 100],
    majorList: [
      { quarter: "Q2 2026", title: "Internet banking outage", duration: "2 h 10 min", customers: 12000,
        classification: "Major", regulatory: "CBUAE notified within 4 h; summary within 24 h", appetite: "Within threshold", systemic: "Capacity alerting tuned; no further action" },
      { quarter: "Q4 2026", title: "Card payments outage", duration: "3 h 20 min", customers: 38000,
        classification: "Major", regulatory: "CBUAE notified within 4 h; summary within 24 h; recovery confirmed", appetite: "Within threshold, 40 min short of the 4 h tolerance",
        systemic: "Vendor may take 72 h to notify the bank; contract change requested" }
    ]
  },

  thirdParties: [
    { name: "CloudCo",              supports: "Infrastructure",      criticalOps: 6, slaMet: "3 of 3", exitPlan: "Tested in Q2",          status: "amber" },
    { name: "Vendor Y",             supports: "Core banking",        criticalOps: 4, slaMet: "3 of 3", exitPlan: "Written, not tested",   status: "amber" },
    { name: "Group IT (intragroup)", supports: "Security monitoring", criticalOps: 3, slaMet: "3 of 3", exitPlan: "No written agreement",  status: "amber" },
    { name: "Vendor X",             supports: "Card processing",     criticalOps: 2, slaMet: "2 of 3", exitPlan: "Written, not tested",   status: "amber" },
    { name: "Vendor Z",             supports: "Contact centre",      criticalOps: 1, slaMet: "3 of 3", exitPlan: "Tested in Q3",          status: "green" }
  ],

  testing: [
    { name: "BCP and DR tests on Critical Operations", done: 11, total: 14 },
    { name: "Penetration tests on critical systems",   done: 9,  total: 12 },
    { name: "Second-line control testing plan",        done: 78, total: 100 },
    { name: "Severe but plausible scenario exercises", done: 2,  total: 3 }
  ],

  remediation: {
    onTrack: 17, late: 4, atRisk: 2,
    items: [
      { action: "Automate payments failover",          source: "Recovery test",      owner: "COO",                 due: "Mar 2027",              status: "red",   label: "At risk" },
      { action: "Identity platform migration",         source: "Internal audit",     owner: "CIO",                 due: "Jun 2027 (was Mar)",    status: "amber", label: "Late" },
      { action: "Test Vendor X exit plan",             source: "Third-party review", owner: "Head of Procurement", due: "Q2 2027",               status: "amber", label: "Late" },
      { action: "Reconcile cloud assets into inventory", source: "Self-identified",  owner: "CIO",                 due: "Jan 2027",              status: "amber", label: "Late" }
    ]
  }
};
