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
    "Q4 2026": { position: "amber", text: "One key risk indicator is red: payments missed its tolerance for disruption in testing. The external threat level remains elevated.",
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
    { id: "training",  name: "Board members trained on resilience (of 9)",       unit: "",  values: [6, 7, 8, 9],      amber: 9,   red: 7,   direction: "down", anchor: "Board knowledge and oversight" },
    // Two indicators that show exposure to the external threat landscape
    { id: "kev",       name: "Actively exploited vulnerabilities open over 7 days", unit: "", values: [3, 2, 4, 5],    amber: 3,   red: 6,   direction: "up",   anchor: "Threat-led vulnerability management" },
    { id: "contain",   name: "Median hours to contain a critical security alert", unit: "",  values: [10, 8, 7, 6],    amber: 4,   red: 12,  direction: "up",   anchor: "Detection and response speed" }
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

  // External view: what is happening outside the bank, and what it means for us.
  // Inspired by public threat reports for the UAE and the region (for example Help AG, State of the Market Report 2026).
  // Threat level and exposure are Bank Horizon's own (fictional) assessment. Events marked "illustrative" are invented.
  externalView: {
    threatLevel: {
      "Q1 2026": { status: "red",   label: "High",     driver: "Regional escalation from late February: publicly reported attack volumes against UAE organisations rose sharply. DDoS and phishing waves." },
      "Q2 2026": { status: "amber", label: "Elevated", driver: "Attack volumes eased but stayed above 2025 levels. Identity-based attacks dominant." },
      "Q3 2026": { status: "amber", label: "Elevated", driver: "Ransomware groups shifting to control-first campaigns: they take over identity before stealing or encrypting data." },
      "Q4 2026": { status: "amber", label: "Elevated", driver: "Wiper and AI-accelerated intrusions reported in the region; the fastest attacks reach impact in under two days." }
    },
    threats: [
      { name: "Identity-based intrusion", signal: "Most breaches in the region start with phishing, stolen credentials or application exploits", trend: "Rising",
        exposure: "amber", exposureLabel: "Partly", why: "Vendor support accounts sit outside the access review", ops: "All", action: "Phishing-resistant MFA for all admins; vendor accounts into the review", owner: "CISO" },
      { name: "Control-first ransomware and wipers", signal: "Attackers take over identity first, then steal, encrypt or destroy data and backups", trend: "Rising",
        exposure: "amber", exposureLabel: "Partly", why: "Core banking backups not yet isolated; no full restore test this year", ops: "Customer accounts, payments", action: "Isolated backups and a full restore test in Q1 2027", owner: "CIO" },
      { name: "Persistent multi-vector DDoS", signal: "Attacks last longer and combine several techniques at once", trend: "Rising",
        exposure: "amber", exposureLabel: "Partly", why: "Payments gateway relies on the vendor's protection, never tested jointly", ops: "Mobile banking, payments", action: "Joint DDoS test with Vendor X", owner: "CISO, Head of Procurement" },
      { name: "AI-accelerated attacks", signal: "In the fastest cases, access to impact in under 48 hours", trend: "Rising",
        exposure: "red", exposureLabel: "Yes", why: "Containment takes 6 hours on median; cloud logs only partly monitored", ops: "All", action: "Automated containment playbooks; full cloud log coverage", owner: "CISO" },
      { name: "Provider and supply-chain compromise", signal: "Attackers reach banks through shared providers and software", trend: "Stable",
        exposure: "amber", exposureLabel: "Partly", why: "Two critical providers have no security attestation this year", ops: "Card processing, security monitoring", action: "Obtain attestations; add to contract reviews", owner: "Head of Procurement" },
      { name: "Post-quantum readiness", signal: "Data stolen today could be decrypted later; planning has started across the region", trend: "Emerging",
        exposure: "amber", exposureLabel: "Not assessed", why: "No inventory yet of where cryptography is used", ops: "Customer accounts, payments", action: "Cryptographic inventory in 2027", owner: "CISO" }
    ],
    events: {
      "Q1 2026": [
        { type: "Geopolitical", what: "Regional escalation; sharp rise in reported cyber attack volumes in the UAE (public reports)", soWhat: "Monitoring raised, daily threat briefings, DDoS readiness checked with providers" },
        { type: "Regulatory",   what: "CBUAE Financial Institution Resilience Package approved on 17 March (public)", soWhat: "Treasury and Risk reviewed the liquidity and capital relief; no change to resilience plans" }
      ],
      "Q2 2026": [
        { type: "Peer incident", what: "A regional bank's card outage traced to a vendor change (illustrative)", soWhat: "Reviewed change controls with Vendor X; one gap found and fixed" }
      ],
      "Q3 2026": [
        { type: "Provider alert", what: "Actively exploited vulnerability in a widely used remote-access product (illustrative)", soWhat: "Patched in 3 days; threat hunt found no compromise" }
      ],
      "Q4 2026": [
        { type: "Sector threat", what: "Wiper malware reported in incidents in the region (public reports)", soWhat: "Backup isolation for core banking brought forward" },
        { type: "Provider alert", what: "Critical provider announced a data-centre migration (illustrative)", soWhat: "Migration added to the risk committee agenda; recovery test requested" }
      ]
    },
    regulatory: [
      { item: "CBUAE Operational Risk Management Regulation", status: "In force (2026)", impact: "Close gaps on mapping, third parties and testing", owner: "CRO" },
      { item: "DFSA operational resilience framework (DIFC entity)", status: "Proposed (consultation, March 2026)", impact: "Prepare impact tolerances for critical business services", owner: "Head of Compliance" },
      { item: "CBUAE capital rules aligned to revised Basel III", status: "Planned", impact: "Assess the effect on operational risk capital", owner: "CFO, CRO" },
      { item: "Capital Market Authority rules, incl. cybersecurity for virtual assets", status: "New (2025)", impact: "Applies if the group launches virtual asset services", owner: "Head of Compliance" }
    ]
  },

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
