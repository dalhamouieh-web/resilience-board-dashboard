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

  // Six resilience outcomes, per quarter. Status = the worst reported status of the metrics listed (Level 1 RAS-OPR or Level 2 KRI
  // from the risk appetite workbook); the note names the metric that drives it. Generated, so status and note always agree.
  outcomes: [
    {"id": "govern", "name": "Govern & Own", "metrics": ["RAS-OPR-07", "RAS-OPR-10"], "status": ["red", "red", "red", "amber"], "note": ["40% of Board indicators traceable to a source and owner (appetite 90%)", "53% of Board indicators traceable to a source and owner (appetite 90%)", "68.6% of Board indicators traceable to a source and owner (appetite 90%)", "1 overdue high-rated finding on ICT and resilience (appetite 0)"]},
    {"id": "know", "name": "Know What Must Not Break", "metrics": ["KRI-RES-01", "KRI-RES-04"], "status": ["red", "red", "red", "red"], "note": ["9 of 12 Critical Operations have an approved tolerance", "9 of 12 Critical Operations have an approved tolerance", "10 of 12 Critical Operations have an approved tolerance", "8 of 12 Critical Operations mapped end to end"]},
    {"id": "protect", "name": "Protect & Detect", "metrics": ["RAS-OPR-04", "RAS-OPR-06"], "status": ["red", "red", "red", "red"], "note": ["Cyber control index 52 (appetite 80, tolerance 65)", "Cyber control index 55 (appetite 80, tolerance 65)", "Cyber control index 60 (appetite 80, tolerance 65)", "Cyber control index 64 (appetite 80, tolerance 65)"]},
    {"id": "respond", "name": "Respond & Recover", "metrics": ["RAS-OPR-02", "RAS-OPR-03"], "status": ["red", "red", "red", "red"], "note": ["7 of 12 Critical Operations recovered within tolerance", "7 of 12 Critical Operations recovered within tolerance", "8 of 12 Critical Operations recovered within tolerance; payments 6 h against 4 h", "8 of 12 Critical Operations recovered within tolerance; payments 6 h against 4 h"]},
    {"id": "third", "name": "Third Party & Concentration", "metrics": ["RAS-OPR-05", "KRI-TPR-01"], "status": ["red", "red", "red", "amber"], "note": ["5 of 9 critical providers lack a tested exit plan (appetite 2)", "5 of 9 critical providers lack a tested exit plan (appetite 2)", "5 of 9 critical providers lack a tested exit plan (appetite 2)", "4 of 9 critical providers lack a tested exit plan (appetite 2)"]},
    {"id": "test", "name": "Test & Assure", "metrics": ["KRI-RES-02", "KRI-RES-05"], "status": ["red", "red", "red", "red"], "note": ["7 of 12 Critical Operations tested in the last 12 months", "7 of 12 Critical Operations tested in the last 12 months", "8 of 12 Critical Operations tested in the last 12 months", "10 of 12 Critical Operations tested in the last 12 months"]}
  ],

  // One headline per quarter: what the Board must know and decide
  headlines: {
    "Q1 2026": {"position": "red", "text": "Only 7 of 12 Critical Operations can show they recover within tolerance, the cyber control index is 52, and fewer than half of the Board's numbers can be traced to a source.", "decisions": ["Approve the 2026 testing plan", "Approve tolerances for 9 of 12 Critical Operations; the remaining 3 by Q3"]},
    "Q2 2026": {"position": "red", "text": "One major incident (internet banking, 2 h 10 min), notified on time. Trade finance took 5 days to recover in testing against a 24-hour tolerance.", "decisions": ["Fund the trade finance recovery fix", "Endorse exit-plan testing for Vendor X and CloudCo"]},
    "Q3 2026": {"position": "red", "text": "Payments recovered in 6 hours against a 4-hour tolerance in September's test. Five critical providers still have no tested exit plan.", "decisions": ["Ask the Board Risk Committee to set provisional appetite thresholds", "Decide how payments will meet its 4-hour tolerance"]},
    "Q4 2026": { position: "red", text: "Three Board appetite metrics are red: Critical Operations within tolerance (payments recovered in 6 h against 4 h), the cyber control index, and Critical Operations that depend on one person. The external threat level remains elevated.",
                 decisions: ["Approve funding for a second payments processing site", "Accept or reject the risk on Vendor X until its exit plan is tested in Q2 2027", "Approve a trained deputy for the engineer behind three Critical Operations"] }
  },

  // Board risk appetite metrics (Level 1), from the Risk Appetite Statement RB-B2-RAF-01 and workbook RB-B2-TPL-03.
  // Four thresholds: green up to the appetite, amber up to the tolerance limit, red beyond it, 'beyond capacity' past the capacity point.
  // direction "up" = higher is worse; "down" = lower is worse. method: how the metric is calculated from the Level 2 KRIs.
  // level2: Level 2 KRIs under the metric per quarter [green, amber, red]. override: a Level 2 KRI linked to a Critical Operation
  // red for three months raises a green metric to amber. Quarters are restated against the 2027 thresholds.
  kris: [
    {"id": "RAS-OPR-01", "name": "Net operational risk losses, rolling 12 months", "unit": "AED m", "values": [31.0, 30.5, 29.7, 28.8], "target": 25, "appetite": 35, "tolerance": 70, "capacity": 160, "direction": "up", "method": "Direct", "owner": "CRO", "anchor": "ORM art. 2.5.5, 4.2.1", "level2": [[0, 1, 1], [0, 1, 1], [1, 0, 1], [1, 0, 1]], "override": [null, "KRI-LOS-02", "KRI-LOS-02", "KRI-LOS-02"]},
    {"id": "RAS-OPR-02", "name": "Critical Operations recovered within tolerance in their last test", "unit": "%", "values": [58.3, 58.3, 66.7, 66.7], "target": 100, "appetite": 100, "tolerance": 90, "capacity": 50, "direction": "down", "method": "Roll-up of units", "owner": "COO", "anchor": "ORM art. 4.2.2, 11.8, 11.10", "level2": [[0, 0, 5], [0, 0, 5], [0, 1, 4], [0, 3, 2]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-03", "name": "Severe ICT or cyber incidents affecting a Critical Operation, rolling 12 months", "unit": "", "values": [3, 3, 2, 2], "target": 0, "appetite": 1, "tolerance": 2, "capacity": 4, "direction": "up", "method": "Direct", "owner": "CIO", "anchor": "ORM art. 15.2", "level2": [[1, 1, 3], [1, 1, 3], [1, 1, 3], [1, 3, 1]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-04", "name": "ICT and cyber control effectiveness index", "unit": "index", "values": [52, 55, 60, 64], "target": 85, "appetite": 80, "tolerance": 65, "capacity": 50, "direction": "down", "method": "Composite index", "owner": "CISO", "anchor": "ORM art. 8.2", "level2": [[0, 0, 10], [0, 0, 10], [0, 3, 7], [0, 4, 6]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-05", "name": "Critical providers without a tested exit plan", "unit": "", "values": [5, 5, 5, 4], "target": 0, "appetite": 2, "tolerance": 4, "capacity": 6, "direction": "up", "method": "Direct", "owner": "COO", "anchor": "ORM art. 13; Outsourcing Reg. 14/2021", "level2": [[1, 2, 2], [1, 2, 2], [1, 2, 2], [1, 3, 1]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-06", "name": "Significant customer data breaches notified to the CBUAE, rolling 12 months", "unit": "", "values": [0, 0, 0, 0], "target": 0, "appetite": 0, "tolerance": 1, "capacity": 2, "direction": "up", "method": "Direct", "owner": "Chief Compliance Officer", "anchor": "Consumer Protection Reg. art. 6.1", "level2": [[1, 1, 1], [1, 1, 1], [1, 1, 1], [2, 0, 1]], "override": [null, "KRI-DAT-02", "KRI-DAT-02", "KRI-DAT-02"]},
    {"id": "RAS-OPR-07", "name": "Overdue high-rated audit and regulatory findings on ICT and resilience", "unit": "", "values": [2, 2, 1, 1], "target": 0, "appetite": 0, "tolerance": 3, "capacity": 6, "direction": "up", "method": "Direct", "owner": "CRO", "anchor": "ORM art. 4.3, 4.5", "level2": [[0, 0, 4], [0, 0, 4], [0, 2, 2], [0, 3, 1]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-08", "name": "Critical Operations that depend on one person without a trained deputy", "unit": "", "values": [9, 8, 6, 4], "target": 0, "appetite": 0, "tolerance": 2, "capacity": 4, "direction": "up", "method": "Direct", "owner": "COO", "anchor": "ORM art. 5.8, 11.4", "level2": [[0, 0, 3], [0, 0, 3], [0, 0, 3], [0, 1, 2]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-09", "name": "Internal and external fraud losses, rolling 12 months", "unit": "AED m", "values": [5.1, 5.4, 5.7, 5.9], "target": 5, "appetite": 8, "tolerance": 15, "capacity": 30, "direction": "up", "method": "Direct", "owner": "Head of Fraud", "anchor": "ORM art. 2.6", "level2": [[2, 0, 0], [2, 0, 0], [2, 0, 0], [2, 0, 0]], "override": [null, null, null, null]},
    {"id": "RAS-OPR-10", "name": "Board risk indicators with an owner, a source and a data contract", "unit": "%", "values": [40.0, 53.0, 68.6, 79.6], "target": 100, "appetite": 90, "tolerance": 75, "capacity": 50, "direction": "down", "method": "Roll-up of units", "owner": "CRO", "anchor": "ORM art. 4.7, 10.3", "level2": [[0, 0, 2], [0, 0, 2], [0, 0, 2], [0, 1, 1]], "override": [null, null, null, null]}
  ],

  // Critical Operations (register and maps: RB-B3-TPL-04), per quarter: tolerance for disruption (approved or proposed), last tested recovery (hours; null = never tested), month of that test, mapped end to end. Counts match RAS-OPR-02, KRI-RES-01, KRI-RES-02 and KRI-RES-04.
  criticalOperations: [
    {
      "name": "CO-01 Domestic payments",
      "owner": "Head of Payments",
      "keyDependencies": "Directory server; payment hub (one CloudCo region); Vendor X; key engineer",
      "toleranceHours": 4,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        5,
        5,
        6,
        6
      ],
      "testMonth": [
        "Nov 2025",
        "Nov 2025",
        "Sep 2026",
        "Sep 2026"
      ],
      "mapped": [
        true,
        true,
        true,
        true
      ]
    },
    {
      "name": "CO-02 Cross-border payments",
      "owner": "Head of Payments",
      "keyDependencies": "Payments messaging bureau (single provider); directory server",
      "toleranceHours": 8,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        6,
        6,
        6,
        6
      ],
      "testMonth": [
        "Mar 2026",
        "Mar 2026",
        "Mar 2026",
        "Mar 2026"
      ],
      "mapped": [
        false,
        false,
        true,
        true
      ]
    },
    {
      "name": "CO-03 Salaries (WPS)",
      "owner": "Head of Corporate Banking",
      "keyDependencies": "Payment hub (one region); Vendor X; key engineer",
      "toleranceHours": 4,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        5,
        5,
        6,
        6
      ],
      "testMonth": [
        "Nov 2025",
        "Nov 2025",
        "Sep 2026",
        "Sep 2026"
      ],
      "mapped": [
        true,
        true,
        true,
        true
      ]
    },
    {
      "name": "CO-04 Cards authorisation",
      "owner": "Head of Cards",
      "keyDependencies": "Vendor X card platform (single provider)",
      "toleranceHours": 2,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        1.5,
        1.5,
        1.5,
        1.5
      ],
      "testMonth": [
        "Feb 2026",
        "Feb 2026",
        "Feb 2026",
        "Feb 2026"
      ],
      "mapped": [
        true,
        true,
        true,
        true
      ]
    },
    {
      "name": "CO-05 Mobile and online banking",
      "owner": "Head of Retail and Digital",
      "keyDependencies": "CloudCo; directory server",
      "toleranceHours": 8,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        6,
        6,
        5,
        5
      ],
      "testMonth": [
        "Oct 2025",
        "Oct 2025",
        "Jul 2026",
        "Jul 2026"
      ],
      "mapped": [
        false,
        false,
        true,
        true
      ]
    },
    {
      "name": "CO-06 Cash access",
      "owner": "Head of Branches",
      "keyDependencies": "ATM switch; cash-in-transit company; colocation site",
      "toleranceHours": 24,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        12,
        12,
        12,
        12
      ],
      "testMonth": [
        "Jun 2025",
        "Jun 2025",
        "Jun 2025",
        "Nov 2026"
      ],
      "mapped": [
        false,
        false,
        false,
        true
      ]
    },
    {
      "name": "CO-07 Corporate cash",
      "owner": "Head of Corporate Banking",
      "keyDependencies": "Payment hub; Vendor X; directory server",
      "toleranceHours": 4,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        5,
        5,
        3.5,
        3.5
      ],
      "testMonth": [
        "Feb 2025",
        "Feb 2025",
        "Aug 2026",
        "Aug 2026"
      ],
      "mapped": [
        false,
        false,
        false,
        true
      ]
    },
    {
      "name": "CO-08 Trade finance issuance",
      "owner": "Head of Trade Finance",
      "keyDependencies": "TradeSoft (sole supplier); 15-year-old platform; key engineer; scans outside backup",
      "toleranceHours": 24,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        96,
        120,
        120,
        120
      ],
      "testMonth": [
        "Jan 2025",
        "Jun 2026",
        "Jun 2026",
        "Jun 2026"
      ],
      "mapped": [
        false,
        false,
        false,
        false
      ]
    },
    {
      "name": "CO-09 Treasury and liquidity",
      "owner": "Treasurer",
      "keyDependencies": "Treasury system; messaging bureau; directory server",
      "toleranceHours": 4,
      "approved": [
        true,
        true,
        true,
        true
      ],
      "testedHours": [
        3,
        3,
        2,
        2
      ],
      "testMonth": [
        "Mar 2025",
        "Mar 2025",
        "Aug 2026",
        "Aug 2026"
      ],
      "mapped": [
        false,
        false,
        false,
        true
      ]
    },
    {
      "name": "CO-10 Sanctions screening",
      "owner": "Chief Compliance Officer",
      "keyDependencies": "Screening engine on CloudCo; directory server",
      "toleranceHours": 4,
      "approved": [
        false,
        false,
        true,
        true
      ],
      "testedHours": [
        3,
        3,
        3,
        3
      ],
      "testMonth": [
        "Sep 2025",
        "Sep 2025",
        "Sep 2025",
        "Sep 2025"
      ],
      "mapped": [
        false,
        false,
        false,
        false
      ]
    },
    {
      "name": "CO-11 Government payments",
      "owner": "Head of Government Banking",
      "keyDependencies": "Gateway on CloudCo; one trained administrator",
      "toleranceHours": 8,
      "approved": [
        false,
        false,
        false,
        true
      ],
      "testedHours": [
        6,
        6,
        6,
        6
      ],
      "testMonth": [
        "Jan 2025",
        "Jan 2025",
        "Jan 2025",
        "Oct 2026"
      ],
      "mapped": [
        false,
        false,
        false,
        false
      ]
    },
    {
      "name": "CO-12 Digital wallet",
      "owner": "Head of Retail and Digital",
      "keyDependencies": "CloudCo and Vendor X (single provider); no map yet",
      "toleranceHours": 4,
      "approved": [
        false,
        false,
        false,
        false
      ],
      "testedHours": [
        null,
        null,
        null,
        null
      ],
      "testMonth": [
        "In build",
        "In build",
        "In build",
        "Live Dec 2026, not tested"
      ],
      "mapped": [
        false,
        false,
        false,
        false
      ]
    }
  ],

  incidents: {
    major: [0, 1, 0, 1],
    minor: [31, 35, 39, 47],
    onTimePct: [100, 100, 100, 100],
    majorList: [
      { quarter: "Q2 2026", title: "Internet banking outage", duration: "2 h 10 min", customers: 12000,
        classification: "Major", regulatory: "CBUAE notified within 4 h; summary within 24 h", appetite: "Within threshold", systemic: "Capacity alerting tuned; no further action" },
      { quarter: "Q4 2026", title: "Card payments outage", duration: "1 h 20 min", customers: 38000,
        classification: "Major", regulatory: "CBUAE notified within 4 h; summary within 24 h; recovery confirmed", appetite: "Within the 2 h tolerance for cards authorisation, with 40 min to spare",
        systemic: "Vendor may take 72 h to notify the bank; contract change requested" }
    ]
  },

  // Critical providers (5 of the 9 shown). Per quarter: SLA breaches affecting a Critical Operation (KRI-TPR-03) and exit plan status. Providers without a tested exit match RAS-OPR-05 (5, 5, 5, 4).
  thirdParties: [
    {
      "name": "CloudCo",
      "supports": "Cloud infrastructure",
      "criticalOps": 7,
      "slaBreaches": [
        0,
        0,
        0,
        0
      ],
      "exitPlan": [
        "Written, not tested",
        "Written, not tested",
        "Written, not tested",
        "Written, not tested"
      ],
      "status": [
        "amber",
        "amber",
        "amber",
        "amber"
      ]
    },
    {
      "name": "Vendor X",
      "supports": "Payment hub and card platform",
      "criticalOps": 5,
      "slaBreaches": [
        3,
        3,
        3,
        2
      ],
      "exitPlan": [
        "Not written",
        "Written, not tested",
        "Written, not tested",
        "Written, not tested"
      ],
      "status": [
        "amber",
        "amber",
        "amber",
        "amber"
      ]
    },
    {
      "name": "Payments messaging bureau",
      "supports": "SWIFT messaging for cross-border payments, trade finance and treasury",
      "criticalOps": 3,
      "slaBreaches": [
        0,
        0,
        0,
        0
      ],
      "exitPlan": [
        "Written, not tested",
        "Written, not tested",
        "Written, not tested",
        "Tested in Nov 2026"
      ],
      "status": [
        "amber",
        "amber",
        "amber",
        "green"
      ]
    },
    {
      "name": "Colocation provider",
      "supports": "Primary data centre",
      "criticalOps": 4,
      "slaBreaches": [
        0,
        0,
        0,
        0
      ],
      "exitPlan": [
        "Written, not tested",
        "Written, not tested",
        "Written, not tested",
        "Written, not tested"
      ],
      "status": [
        "amber",
        "amber",
        "amber",
        "amber"
      ]
    },
    {
      "name": "TradeSoft",
      "supports": "Trade finance platform",
      "criticalOps": 1,
      "slaBreaches": [
        0,
        0,
        0,
        0
      ],
      "exitPlan": [
        "Not written",
        "Not written",
        "Written, not tested",
        "Written, not tested"
      ],
      "status": [
        "amber",
        "amber",
        "amber",
        "amber"
      ]
    }
  ],

  // Testing per quarter. The first line matches KRI-RES-02.
  testing: [
    {
      "name": "Critical Operations tested in the last 12 months",
      "done": [
        7,
        7,
        8,
        10
      ],
      "total": 12
    },
    {
      "name": "Penetration tests on critical systems, year to date",
      "done": [
        2,
        5,
        8,
        9
      ],
      "total": 12
    },
    {
      "name": "Second-line control testing plan, year to date",
      "done": [
        18,
        40,
        62,
        78
      ],
      "total": 100
    },
    {
      "name": "Severe but plausible scenario exercises, year to date",
      "done": [
        0,
        1,
        2,
        2
      ],
      "total": 3
    }
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
        exposure: "red", exposureLabel: "Yes", why: "Containment takes 7 hours on median; cloud logs only partly monitored", ops: "All", action: "Automated containment playbooks; full cloud log coverage", owner: "CISO" },
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
      { item: "DFSA operational resilience framework (benchmark only: Bank Horizon has no DIFC entity)", status: "Proposed (consultation, March 2026)", impact: "Compare our tolerances with the proposed DIFC approach for critical business services", owner: "Head of Compliance" },
      { item: "CBUAE capital rules aligned to revised Basel III", status: "Planned", impact: "Assess the effect on operational risk capital", owner: "CFO, CRO" },
      { item: "Capital Market Authority rules, incl. cybersecurity for virtual assets", status: "New (2025)", impact: "Applies if the group launches virtual asset services", owner: "Head of Compliance" }
    ]
  },

  // Remediation, per quarter.
  remediation: {
    "Q1 2026": {
      "onTrack": 14,
      "late": 2,
      "atRisk": 0,
      "items": [
        {
          "action": "Retest corporate cash management recovery (5 h vs 4 h)",
          "source": "Recovery test",
          "owner": "COO",
          "due": "Aug 2026",
          "status": "green",
          "label": "On track"
        },
        {
          "action": "Name an owner for every tier-1 asset",
          "source": "Internal audit",
          "owner": "CIO",
          "due": "Sep 2026 (was Mar)",
          "status": "amber",
          "label": "Late"
        },
        {
          "action": "Approve tolerances for the last three Critical Operations",
          "source": "Self-identified",
          "owner": "COO",
          "due": "Sep 2026",
          "status": "green",
          "label": "On track"
        }
      ]
    },
    "Q2 2026": {
      "onTrack": 15,
      "late": 3,
      "atRisk": 1,
      "items": [
        {
          "action": "Fix trade finance recovery (5 days vs 24 h)",
          "source": "Recovery test",
          "owner": "CIO",
          "due": "Dec 2026",
          "status": "red",
          "label": "At risk"
        },
        {
          "action": "Name an owner for every tier-1 asset",
          "source": "Internal audit",
          "owner": "CIO",
          "due": "Sep 2026 (was Mar)",
          "status": "amber",
          "label": "Late"
        },
        {
          "action": "Retest corporate cash management recovery (5 h vs 4 h)",
          "source": "Recovery test",
          "owner": "COO",
          "due": "Aug 2026",
          "status": "green",
          "label": "On track"
        },
        {
          "action": "Write an exit plan for Vendor X",
          "source": "Third-party review",
          "owner": "Head of Procurement",
          "due": "Jun 2026",
          "status": "green",
          "label": "Done"
        }
      ]
    },
    "Q3 2026": {
      "onTrack": 16,
      "late": 3,
      "atRisk": 2,
      "items": [
        {
          "action": "Automate payments failover (6 h vs 4 h)",
          "source": "Recovery test",
          "owner": "COO",
          "due": "Mar 2027",
          "status": "red",
          "label": "At risk"
        },
        {
          "action": "Fix trade finance recovery (5 days vs 24 h)",
          "source": "Recovery test",
          "owner": "CIO",
          "due": "Dec 2026",
          "status": "red",
          "label": "At risk"
        },
        {
          "action": "Test Vendor X exit plan",
          "source": "Third-party review",
          "owner": "Head of Procurement",
          "due": "Q2 2027",
          "status": "amber",
          "label": "Late"
        },
        {
          "action": "Map the wallet end to end before launch",
          "source": "Self-identified",
          "owner": "COO",
          "due": "Nov 2026",
          "status": "amber",
          "label": "Late"
        }
      ]
    },
    "Q4 2026": {
      "onTrack": 17,
      "late": 4,
      "atRisk": 2,
      "items": [
        {
          "action": "Automate payments failover (6 h vs 4 h)",
          "source": "Recovery test",
          "owner": "COO",
          "due": "Mar 2027",
          "status": "red",
          "label": "At risk"
        },
        {
          "action": "Fix trade finance recovery (5 days vs 24 h)",
          "source": "Recovery test",
          "owner": "CIO",
          "due": "Jun 2027 (was Dec)",
          "status": "red",
          "label": "At risk"
        },
        {
          "action": "Test the wallet's recovery against its 4 h tolerance",
          "source": "Self-identified",
          "owner": "COO",
          "due": "May 2027",
          "status": "amber",
          "label": "Late"
        },
        {
          "action": "Test Vendor X exit plan",
          "source": "Third-party review",
          "owner": "Head of Procurement",
          "due": "Q2 2027",
          "status": "amber",
          "label": "Late"
        },
        {
          "action": "Reconcile cloud assets into the inventory",
          "source": "Self-identified",
          "owner": "CIO",
          "due": "Jan 2027",
          "status": "amber",
          "label": "Late"
        }
      ]
    }
  }
};
