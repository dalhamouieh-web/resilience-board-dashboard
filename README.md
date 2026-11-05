# Resilience Board Dashboard (sample)

A sample Board-level dashboard for **operational resilience and ICT risk** at a bank, aligned to the **CBUAE Operational Risk Management Regulation (Circular 1/2026)**. It turns the questions a Board must be able to answer into one interactive page.

**Live demo:** https://dalhamouieh-web.github.io/resilience-board-dashboard/
> All data is fictional. *Bank Horizon UAE* is not a real institution, and every figure is dummy data for illustration.

![Dashboard preview](dashboard-preview.png)

## Objectives

- Show what a decision-ready Board report on resilience looks like: decisions first, every number against an approved threshold.
- Translate regulatory requirements (CBUAE 1/2026, with DORA as the European reference) into measurable indicators.
- Provide a reusable template that anyone can load with their own data.

## What the dashboard shows

| Panel | Board question it answers | Regulatory anchor (CBUAE 1/2026) |
| --- | --- | --- |
| Overall position and decisions | Where do we stand, and what must we decide? | Board approval of appetite and tolerance |
| Six resilience outcomes | Is each part of resilience green, amber or red? | Operational risk framework and resilience strategy |
| **External view: threats and our exposure** (new) | What is happening outside, and do we have the same weakness? | Internal and external indicators; emerging risks |
| **External events and regulatory horizon** (new) | Which outside events and rule changes matter for us this quarter? | Relevant external events and regulatory changes |
| Key risk indicators and trend | Are we within appetite, and which way are we moving? | Thresholds, limits, monitoring and reporting |
| Critical Operations vs tolerance | Can we recover our most important services in time? | Critical Operations mapping and tolerance for disruption |
| Incidents and notifications | What went wrong, and did we tell the regulator on time? | Notices within 4 h, 24 h and 72 h |
| Major incidents: four questions | Classification, regulatory status, appetite, what it reveals | Incident management |
| Third parties and concentration | Who do we depend on, and could we replace them? | Third-party strategy, non-objection, exit plans |
| Testing programme | Have we tested what matters this year? | BCP and DR testing, stress tests |
| Remediation | Are we fixing what we found, on time? | Annual report on internal control |

**Interactivity:** a quarter filter (Q1 to Q4), selectable indicators with a trend chart, hover tooltips on every chart, a "View as table" option for each chart, and automatic light and dark mode.

## Dataset

Fictional quarterly data for 2026, provided in two formats:

- `data/dashboard-data.js`: the file the dashboard reads
- `data/csv/*.csv`: the same data as CSV, for Excel, Power BI or other tools

| File | Contents |
| --- | --- |
| `kri_history.csv` | 10 key risk indicators by quarter, with amber and red thresholds (two of them measure exposure to external threats) |
| `threat_level.csv` | External threat level by quarter, with its main driver |
| `external_threats.csv` | Top external threats, whether the same weakness exists here, actions and owners |
| `external_events.csv` | Geopolitical, sector, peer and provider events by quarter, with "so what for us" |
| `regulatory_horizon.csv` | Rules in force, proposed or planned, and what they require |
| `outcomes.csv` | Status of the six resilience outcomes by quarter |
| `critical_operations.csv` | Tolerance for disruption vs latest tested recovery time |
| `incidents.csv` | Major and minor incidents and notification timeliness by quarter |
| `major_incidents.csv` | Major incidents framed by the four Board questions |
| `third_parties.csv` | Critical providers, concentration, SLAs and exit plans |
| `testing.csv` | Testing programme progress |
| `remediation.csv` | Late and at-risk remediation actions |

## Key insights (sample data, Q4 2026)

- **The external threat level is elevated:** identity-based intrusion, control-first ransomware and wipers, persistent DDoS and AI-accelerated attacks are rising; the bank has the same weakness, at least partly, for five of six.
- **One key risk indicator is red:** a recovery test for domestic payments took 6 hours against a 4-hour tolerance.
- **Vulnerabilities past deadline rose from 9 to 14**, now above the amber threshold.
- **Concentration:** one provider supports 6 of 14 Critical Operations, and 4 of 9 critical providers lack a tested exit plan.
- **Notifications:** 100% of regulatory notifications were made on time throughout the year.
- **Control effectiveness improved** from 84% to 91%, crossing back into green.

## Tools

Plain HTML, CSS and JavaScript, with hand-drawn SVG charts. No framework, no build step and no external dependencies, so it runs anywhere and deploys free on GitHub Pages.

## Run it locally

Open `index.html` in any browser. That's it.

## Deploy on GitHub Pages

1. Create a new repository named `resilience-board-dashboard` and upload these files (or push them with git).
2. In the repository, go to **Settings > Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
4. After a minute, the dashboard is live at `https://<your-github-username>.github.io/resilience-board-dashboard/`.

## Use your own data

Edit `data/dashboard-data.js`. Each block is commented: change the values, thresholds, names or quarters, and refresh the page. Statuses for key risk indicators are calculated automatically from the thresholds: for `direction: "up"`, higher is worse; for `"down"`, lower is worse.

## Files in this repository

```
index.html               the dashboard page
style.css                styles, including light and dark themes
app.js                   rendering, charts, tooltips and filters
dashboard-data.js        sample data the page reads
*.csv                    the same sample data as CSV files
dashboard-preview.png    screenshot used in this README
```

## About the external view

The CBUAE expects Board reporting to use internal and external indicators and to cover emerging risks, relevant external events and regulatory changes. The external view shows one way to do it: each outside threat or event is paired with the bank's own answer to "do we have the same weakness?", an action and an owner. The threat themes are inspired by public threat reporting for the UAE and the region, such as Help AG's *State of the Market Report 2026*. Items marked "public" refer to publicly reported events; items marked "illustrative" are invented; all assessments are fictional.

## Roadmap

- Add an onshore vs free-zone view (CBUAE, DFSA and FSRA) for groups with several regulated entities
- Load data directly from CSV files
- Add a printable one-page Board report view
- Add a risk-appetite heatmap across business lines

## About

Built by **Dima Alhamouieh** as part of *The Resilience Bridge*, a series on bringing lessons from Europe's DORA to resilience in the Gulf, onshore and free zone.

## License

MIT. See `LICENSE`.
