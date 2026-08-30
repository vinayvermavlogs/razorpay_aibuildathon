# 🛡️ Cortex Shield — Autonomous Razorpay Revenue Recovery

> **Razorpay AI Builder Internship 2026 Submission**  
> **Track:** Track 3 — AI Revenue Recovery  
> **Target Stipend:** ₹75,000 / month (Bangalore)  
> **Objective:** Turn revenue leakage into recoverable revenue through autonomous AI-driven detection, diagnosis, intervention, and recovery


---

## 📌 Solution Overview

Revenue leakage across **failed payments, subscription failures, checkout abandonment, and overdue receivables** can quickly turn into lost merchant revenue and involuntary churn.

**Cortex Shield** closes this gap with an autonomous multi-agent recovery engine that **detects revenue at risk, diagnoses the root cause, scores recovery risk, chooses the next best action, and executes bounded recovery workflows**.

📊 Recovery Metrics:
**`₹96.2L at risk → ₹18.6L recovered → 19.4% recovery → 8 cases → 343 failures → 5 loss types`**

It processes events such as `payment.failed`, `subscription.halted`, `invoice.payment_failed`, **checkout abandonment**, and **mandate authorization drops**, then triggers **smart retries, personalized WhatsApp/Email dunning, and UPI Intent/Checkout recovery links** with **guardrails, stopping rules, and a complete audit trail**.

---

## 🔄 Core Recovery Flow

| 🔍 Detect | 🧠 Diagnose | 🎯 Decide | 🛡️ Guardrail | ⚡ Execute | 💳 Recover | 📊 Audit |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Revenue Risk | Root Cause | Next Action | Retry / Stop | Recovery | Payment | Outcome |

**` Detect → Diagnose → Decide → Guardrail → Execute → Verify → Recover `**

---

## 🧩 Multi-Agent Architecture

<div align="center">

<pre>
RAZORPAY EVENTS
│
┌───────────────────────┼───────────────────────┐
│                       │                       │
payment.failed       checkout.abandoned        invoice.overdue
│                       │                       │
└───────────────────────┼───────────────────────┘
│
▼
┌─────────────────────────────┐
│    CORTEX SHIELD INGESTION  │
└──────────────┬──────────────┘
│
▼
┌─────────────────────────────┐
│         🔍 AGENT 1          │
│      FAILURE DIAGNOSER      │
│   Root Cause + Risk Score   │
└──────────────┬──────────────┘
│
▼
┌─────────────────────────────┐
│         ⚡ AGENT 2          │
│ SMART RETRY & UPTIME ROUTER │
│   When / Whether to Retry   │
└──────────────┬──────────────┘
│
▼
┌─────────────────────────────┐
│         💬 AGENT 3          │
│    CONVERSATIONAL DUNNING   │
│   WhatsApp / Email / Offer  │
└──────────────┬──────────────┘
│
▼
┌─────────────────────────────┐
│       💳 AGENT 4            │
│   PAYMENT LINK DISPATCHER   │
│   UPI / Checkout Recovery   │
└──────────────┬──────────────┘
│
▼
         CUSTOMER PAYS
│
▼
        REVENUE RECOVERED
│
▼
        📊 AUDIT TRAIL
</pre>

</div>

1. **Failure Diagnoser Agent:** Classifies failures into Bank Network Outage, Insufficient Funds, Expired Card, or Mandate Auth Drop and assigns a churn risk score (0–100).

2. **Smart Retry & Uptime Router Agent:** Checks gateway health and selects the best retry time and route while avoiding active outages.

3. **Conversational Dunning Agent:** Creates personalized WhatsApp/Email messages with targeted incentives for high-risk customers.

4. **Recovery Link Dispatcher Agent:** Sends 1‑tap UPI Intent and Razorpay Checkout links to recover failed payments.

5. **Guardrail Agent:** Enforces retry limits, cooldowns, incentive caps, and stopping rules.

6. **Recovery Monitor Agent:** Tracks recovery outcomes and maintains a complete audit trail.

---

## 🚀 Key Features & UI Sections

1. **Revenue Intelligence Dashboard**: Revenue at Risk, Recovered Revenue, Recovery Rate & Agent Status
2. **AI Failure Simulator & Diagnosis**: Simulate failure events, identify root causes & calculate risk scores
3. **Smart Recovery Engine**: Uptime-aware retries, guardrails, cooldowns & stopping rules
4. **AI Dunning & Recovery Links**: Personalized WhatsApp / Email outreach with UPI Intent & Checkout recovery
5. **Campaign Management**: Track recovery cases, actions, statuses & execution timelines
6. **Customer Payment Portal**: Simulate UPI, Card & NetBanking recovery flows
7. **Analytics & Audit**: Recovery funnel, failure breakdown, ₹ recovered & complete action history
8. **Pitch & Architecture Guide**: Problem statement, agent architecture, data flow & Track 03 alignment
---

## 💻 Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express.js, REST APIs
- **AI:** Multi-Agent Recovery Engine, Risk Scoring, Failure Diagnosis, Decision Workflows

---

## 🛠️ Quick Start & Local Execution

### Prerequisites

- Node.js `18+`
- npm

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

Open **`http://localhost:3000`** in your browser.

### 3. Build for Production

```bash
npm run build
```

---

## 📋 Razorpay Buildathon Evaluation Checklist

- [x] **Chosen Track:** Track 03 — AI Revenue Recovery
- [x] **Public GitHub Repo:** Clean, modular codebase with clear architecture and documentation.
- [x] **Live Interactive Prototype:** Interactive merchant dashboard with AI simulation, recovery workflows and payment demo.
- [x] **5-Minute Pitch Ready:** End-to-end agent workflow with recovery metrics and Razorpay business impact.

---

## 🌐 Live Demo

**[Cortex Shield Live ](https://cortexshieldbuildathon.vercel.app/)**

**Dashboard → AI Simulator → Diagnosis → Decision → Recovery → Payment Portal → ₹ Recovered → Audit**

---


