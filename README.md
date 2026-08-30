# Cortex Shield — Autonomous Razorpay Revenue Recovery

> **Razorpay AI Builder Internship 2026 Submission**  
> **Track:** Track 03 — AI Revenue Recovery

---

## 🏆 Executive Summary

Revenue leakage across **failed payments, subscription failures, checkout abandonment, and overdue receivables** can quickly turn into lost merchant revenue and involuntary churn.

**Cortex Shield** closes this gap with an autonomous multi-agent recovery engine that **detects revenue at risk, diagnoses the root cause, scores recovery risk, chooses the next best action, and executes bounded recovery workflows**.

**₹96.2L at risk → ₹18.6L recovered → 19.4% recovery → 8 cases → 343 failures → 5 loss types**

It processes events such as `payment.failed`, `subscription.halted`, `invoice.payment_failed`, **checkout abandonment**, and **mandate authorization drops**, then triggers **smart retries, personalized WhatsApp/Email dunning, and UPI Intent/Checkout recovery links** with **guardrails, stopping rules, and a complete audit trail**.

---

## 🔄 Core Recovery Flow

| 🔍 Detect | 🧠 Diagnose | 🎯 Decide | 🛡️ Guardrail | ⚡ Execute | 💳 Recover | 📊 Audit |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| Revenue Risk | Root Cause | Next Action | Retry / Stop | Recovery | Payment | Outcome |

**`Detect → Diagnose → Decide → Guardrail → Execute → Verify → Recover`**

---

## 🤖 Multi-Agent Architecture

<div align="center">

<pre>
┌─────────────────────────────────────────────────────────────┐
│                      RAZORPAY EVENTS                        │
│                                                             │
│  payment.failed • subscription.halted • invoice.payment...  │
│  Checkout Abandonment • Mandate Authorization Drop          │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 🔍 AGENT 1 — FAILURE DIAGNOSER & RISK SCORING              │
│                                                             │
│ Root Cause Classification • Customer Risk Score             │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ ⚡ AGENT 2 — SMART RETRY & UPTIME ROUTER                    │
│                                                             │
│ Bank / Gateway Health • Retry Timing • Stop Rules           │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 💬 AGENT 3 — CONVERSATIONAL DUNNING                        │
│                                                             │
│ Personalized WhatsApp / Email • Recovery Incentives        │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 💳 AGENT 4 — RAZORPAY PAYMENT LINK DISPATCHER              │
│                                                             │
│ UPI Intent • Checkout Recovery • Payment Link              │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│                      CUSTOMER PAYMENT                       │
│                                                             │
│              Pay → Verify → Recover Revenue                 │
└──────────────────────────────┬──────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────┐
│ 📊 ANALYTICS & AUDIT                                       │
│                                                             │
│ ₹ Recovered • Status • Actions • Execution Logs             │
└─────────────────────────────────────────────────────────────┘
</pre>

</div>

| Agent | Responsibility |
|---|---|
| 🔍 **Failure Diagnoser Agent** | Classifies root cause and calculates customer risk score |
| ⚡ **Smart Retry & Uptime Router** | Schedules retries based on gateway/bank availability |
| 💬 **Conversational Dunning Bot** | Generates personalized WhatsApp/Email recovery outreach |
| 💳 **Razorpay Link Dispatcher** | Generates UPI Intent and Checkout recovery links |
| 📊 **Analytics & Audit Layer** | Tracks recovery impact, actions and execution history |

---

## 🚀 Key Features

| Feature | Description |
|---|---|
| **Revenue Dashboard** | ARR at Risk, Recovered ARR, Recovery Rate & Recovery Time |
| **AI Simulator** | Simulates Razorpay payment-failure events and runs the agent pipeline |
| **AI Diagnosis** | Root-cause classification with customer risk scoring |
| **Smart Retry** | Uptime-aware retry scheduling to avoid redundant failures |
| **AI Dunning** | Personalized WhatsApp/Email recovery messaging |
| **Recovery Links** | UPI Intent & Checkout payment recovery |
| **Campaign Management** | Tracks active, recovered and action-required cases |
| **Audit Logs** | Complete recovery decision and execution timeline |
| **Payment Portal** | Simulated customer checkout and successful recovery flow |
| **Analytics** | Recovery funnel, failure breakdown and ₹ recovered |

---

## 📊 Demo Metrics

| Metric | Value |
|---|---:|
| **Revenue at Risk** | ₹96.2L |
| **Revenue Recovered** | ₹18.6L |
| **Recovery Rate** | 19.4% |
| **Open Cases** | 8 |
| **Payment Failures Analyzed** | 343 |
| **Loss Types** | 5 |

### Payment Failure Breakdown

- **Soft Decline / Insufficient Funds:** 130 — **38%**
- **Bank Network Outage / Downtime:** 89 — **26%**
- **Card Expired / Invalid Details:** 62 — **18%**
- **Mandate Drop / Autopay Auth:** 41 — **12%**
- **OTP Timeout & Customer Abandonment:** 20 — **6%**

---

## 🎯 Track 03 Alignment

| Razorpay Requirement | Cortex Shield |
|---|---|
| Detect revenue at risk | Revenue-risk event detection |
| Diagnose the problem | AI failure diagnosis + risk scoring |
| Determine intervention | Next-best-action decision engine |
| Execute recovery | Retry, dunning & payment recovery |
| Bounded automation | Guardrails, approvals & stopping rules |
| Measure money recovered | ₹ Recovered & Recovery Rate |
| Audit trail | Complete decision & action logs |

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

**[Cortex Shield — Live Demo](https://cortexshieldbuildathon.vercel.app/)**

**Dashboard → AI Simulator → Diagnosis → Decision → Recovery → Payment Portal → ₹ Recovered → Audit**

---

<div align="center">

**Built for Razorpay AI Builder Buildathon 2026**

**Track 03 — AI Revenue Recovery**

**Detect → Diagnose → Decide → Recover → Measure**

</div>
