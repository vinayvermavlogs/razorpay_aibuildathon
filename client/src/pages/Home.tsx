/* Cortex Shield style reminder: match the supplied Recovery workspace with a black-glass shell, compact sidebar, cyan-blue controls, semantic data colors, and operational microcopy. */
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import {
  Activity,
  ArrowDownToLine,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Beaker,
  Bot,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Code2,
  Copy,
  CreditCard,
  FileClock,
  FileText,
  Gauge,
  GitBranch,
  Globe2,
  LayoutDashboard,
  LifeBuoy,
  LockKeyhole,
  Menu,
  MessageCircleMore,
  Network,
  Play,
  RefreshCcw,
  RotateCcw,
  ScanSearch,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  Tag,
  UserCheck,
  UsersRound,
  WalletCards,
  X,
  Zap,
} from "lucide-react";

type Page =
  | "summary"
  | "feed"
  | "cases"
  | "analytics"
  | "approvals"
  | "simulator"
  | "policy"
  | "audit"
  | "campaigns"
  | "portal"
  | "doc"
  | "track";

type IconType = typeof LayoutDashboard;

type NavItem = { id: Page; label: string; icon: IconType };

type Campaign = {
  id: string;
  customer: string;
  issue: string;
  amount: string;
  numericAmount: number;
  state: "Recovered" | "Uncovered" | "Queued" | "Link ready";
  tone: string;
  lastAction: string;
  channel: string;
};

const navItems: NavItem[] = [
  { id: "summary", label: "Executive summary", icon: LayoutDashboard },
  { id: "track", label: "Track 3 · AI revenue recovery", icon: LifeBuoy },
  { id: "feed", label: "Live recovery feed", icon: Activity },
  { id: "cases", label: "Recovery cases", icon: UsersRound },
  { id: "analytics", label: "Revenue analytics", icon: Gauge },
  { id: "approvals", label: "Human approvals", icon: UserCheck },
  { id: "simulator", label: "AI simulator", icon: Beaker },
  { id: "campaigns", label: "Campaigns", icon: BarChart3 },
  { id: "policy", label: "Policy & guardrails", icon: ShieldCheck },
  { id: "audit", label: "Audit trail", icon: FileClock },
  { id: "portal", label: "Checkout portal", icon: CreditCard },
  { id: "doc", label: "Pitch & architecture", icon: Network },
];

const topNavItems: NavItem[] = [
  { id: "summary", label: "Dashboard", icon: LayoutDashboard },
  { id: "simulator", label: "AI Simulator", icon: Zap },
  { id: "campaigns", label: "Campaigns (4)", icon: BarChart3 },
  { id: "portal", label: "Checkout Portal", icon: CreditCard },
  { id: "doc", label: "Pitch & Architecture", icon: Network },
];

// Add your own pitch video URL here before submitting the hackathon form. Leave empty to show the editable placeholder.
const PITCH_VIDEO_URL = "";

const failureRows = [
  { label: "Soft decline / insufficient funds", count: "130", pct: 38, color: "#4198ff" },
  { label: "Bank network outage / downtime", count: "89", pct: 26, color: "#f7ae38" },
  { label: "Card expired / invalid details", count: "62", pct: 18, color: "#ee4e9f" },
  { label: "Mandate drop / autopay auth", count: "41", pct: 12, color: "#9b6cff" },
  { label: "OTP timeout & customer abandon", count: "20", pct: 6, color: "#fb5d61" },
];

const feedItems = [
  { time: "14:42:18", title: "Recovery case opened", detail: "INV-1048 · Aurora Cloud · ₹14,200", tone: "blue", tag: "DETECT" },
  { time: "14:41:52", title: "Smart retry deferred", detail: "HDFC issuer node below uptime threshold", tone: "amber", tag: "DIAGNOSE" },
  { time: "14:40:09", title: "WhatsApp nudge dispatched", detail: "Personalized reminder · 10% incentive held", tone: "magenta", tag: "INTERVENE" },
  { time: "14:38:44", title: "UPI intent link recovered", detail: "CASE-4821 · ₹8,900 collected", tone: "green", tag: "RECOVER" },
  { time: "14:37:22", title: "Human approval requested", detail: "High-value recovery · ₹1,24,000", tone: "purple", tag: "ESCALATE" },
];

const campaigns: Campaign[] = [
  { id: "RC-1045", customer: "Halcyon Robotics Inc", issue: "Overdue receivable", amount: "$96,400", numericAmount: 96400, state: "Queued", tone: "amber", lastAction: "Wire retry queued", channel: "Wire" },
  { id: "RC-1041", customer: "Nimbus Logistics Pvt Ltd", issue: "Overdue receivable", amount: "$24,280", numericAmount: 24280, state: "Uncovered", tone: "red", lastAction: "Bank account follow-up", channel: "Netbanking" },
  { id: "RC-1048", customer: "Delta Freight Co", issue: "Failed payment", amount: "$4,320", numericAmount: 4320, state: "Link ready", tone: "blue", lastAction: "UPI intent generated", channel: "Card" },
  { id: "RC-1043", customer: "Fernwood Studio", issue: "Failed payment", amount: "$1,840", numericAmount: 1840, state: "Recovered", tone: "green", lastAction: "Paid via smart link", channel: "UPI" },
  { id: "RC-1039", customer: "Aurora Cloud", issue: "Checkout drop-off", amount: "$890", numericAmount: 890, state: "Recovered", tone: "green", lastAction: "Customer completed checkout", channel: "UPI" },
  { id: "RC-1034", customer: "Marigold Studio", issue: "Card expired", amount: "$6,480", numericAmount: 6480, state: "Uncovered", tone: "red", lastAction: "Card update requested", channel: "Card" },
];

const caseRows = [
  { id: "CASE-4821", customer: "Aurora Cloud", issue: "Soft decline", amount: "₹8,900", state: "Recovered", tone: "green" },
  { id: "CASE-4818", customer: "Northstar Labs", issue: "Bank outage", amount: "₹14,200", state: "Retry queued", tone: "amber" },
  { id: "CASE-4812", customer: "Paper Kite Co.", issue: "Card expired", amount: "₹6,480", state: "Awaiting reply", tone: "blue" },
  { id: "CASE-4807", customer: "Marigold Studio", issue: "Mandate drop", amount: "₹22,800", state: "Needs approval", tone: "purple" },
  { id: "CASE-4799", customer: "Voxel Market", issue: "OTP timeout", amount: "₹3,260", state: "Link dispatched", tone: "magenta" },
];

function PageHeading({ eyebrow, title, detail, onBack }: { eyebrow: string; title: string; detail: string; onBack: () => void }) {
  return (
    <div className="page-heading">
      <div><div className="eyebrow">{eyebrow}</div><h2>{title}</h2><p>{detail}</p></div>
      <button className="secondary-button" onClick={onBack}><ArrowLeft size={15} /> Executive summary</button>
    </div>
  );
}

function StatusPill({ children, tone = "blue" }: { children: React.ReactNode; tone?: string }) {
  return <span className={`status-pill ${tone}`}>{children}</span>;
}

function MetricCard({ label, value, detail, tone, icon: Icon }: { label: string; value: string; detail: string; tone: string; icon: IconType }) {
  return <article className={`metric-card ${tone}`}><div className="metric-label">{label}</div><div className="metric-value">{value}</div><div className="metric-detail">{detail}</div><Icon className="metric-icon" size={18} /></article>;
}

function FailureBreakdown() {
  return <section className="diagnostic-grid">
    <article className="panel diagnostic-panel">
      <div className="panel-heading"><div><h3>Payment failure diagnostic breakdown</h3><p className="panel-subtitle">Categorized in real time by the Cortex Shield Failure Analysis Agent.</p></div><span className="failure-total mono">Total failures: 343</span></div>
      <div className="failure-list">{failureRows.map((row) => <div className="failure-row" key={row.label}><div className="failure-meta"><strong>{row.label}</strong><span><b className="mono">{row.count}</b> events <em style={{ color: row.color }}>{row.pct}%</em></span></div><div className="failure-track"><i style={{ width: `${row.pct * 2.1}%`, background: row.color }} /></div></div>)}</div>
    </article>
    <article className="panel fleet-panel"><div className="panel-heading"><div><h3>Autonomous agent fleet</h3><p className="panel-subtitle">Live operators on the recovery loop.</p></div><Bot size={18} className="panel-heading-icon" /></div><div className="fleet-list">{[{ title: "Failure Diagnoser Agent", detail: "Ingests webhooks, inspects gateway logs & classifies root causes.", icon: ScanSearch, tone: "blue" }, { title: "Smart Retry & Uptime Router", detail: "Monitors issuer bank uptime to avoid redundant decline fees.", icon: RotateCcw, tone: "amber" }, { title: "Conversational Dunning Bot", detail: "Generates personalized WhatsApp / Email outreach with incentives.", icon: MessageCircleMore, tone: "magenta" }, { title: "Cortex Link Dispatcher", detail: "Issues instant UPI intent & Magic Checkout recovery links.", icon: WalletCards, tone: "purple" }].map(({ title, detail, icon: Icon, tone }) => <div className="fleet-card" key={title}><div className={`fleet-icon ${tone}`}><Icon size={15} /></div><div><strong>{title}</strong><span>{detail}</span></div><StatusPill tone="green">ONLINE</StatusPill></div>)}</div></article>
  </section>;
}

function SummaryPage({ onRunDemo, onNavigate }: { onRunDemo: () => void; onNavigate: (page: Page) => void }) {
  return <>
    <section className="demo-banner panel"><div className="demo-icon"><Sparkles size={22} /></div><div className="demo-copy"><span className="eyebrow">Recovery control / sandbox</span><h2>Recovery control surface</h2><p>8 synthetic cases queued · 4 agents standing by · policy checks armed for every action.</p><button className="primary-button" onClick={onRunDemo}><Play size={15} fill="currentColor" /> Launch diagnostic run <ArrowRight size={16} /></button><div className="demo-telemetry"><span><i className="telemetry-dot cyan" /> Gateway listening</span><span><i className="telemetry-dot green" /> Policy checks armed</span><span><i className="telemetry-dot amber" /> 8 cases in queue</span></div></div></section>
    <section className="metric-grid metric-grid-main" aria-label="Executive metrics"><MetricCard label="Total revenue at risk" value="₹96,22,868" detail="8 open cases across 5 loss types" tone="danger" icon={ShieldAlert} /><MetricCard label="Revenue recovered" value="₹18,64,320" detail="2 of 8 cases closed with money in" tone="success" icon={CircleDollarSign} /><MetricCard label="Recovery rate" value="19.4%" detail="ROI 3.1× on ₹6.0L of outreach cost" tone="primary" icon={ArrowUpRight} /><MetricCard label="Escalations & approvals" value="2 / 3" detail="Escalated to humans / waiting on approval" tone="warning" icon={UserCheck} /></section>
    <section className="metric-grid metric-grid-small" aria-label="Failure totals"><MetricCard label="Failed payments" value="3" detail="₹5.4L exposure" tone="neutral" icon={WalletCards} /><MetricCard label="Abandoned checkouts" value="1" detail="₹7.9K exposure" tone="neutral" icon={ArrowDownToLine} /><MetricCard label="Overdue invoices" value="3" detail="₹90.7L exposure" tone="neutral" icon={FileText} /></section>
    <section className="analytics-grid"><article className="panel chart-panel"><div className="panel-heading"><div><h3>Recovered revenue trend</h3></div><span className="mono muted">last 7 days</span></div><div className="chart-wrap"><div className="chart-y-labels"><span>₹22L</span><span>₹11L</span><span>₹0</span></div><svg className="line-chart" viewBox="0 0 650 220" role="img" aria-label="Recovered revenue trend chart"><defs><linearGradient id="recoveryFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#27c980" stopOpacity=".22" /><stop offset="1" stopColor="#27c980" stopOpacity="0" /></linearGradient></defs><g className="chart-grid"><path d="M0 24H650 M0 92H650 M0 160H650 M0 208H650" /><path d="M65 0V220 M170 0V220 M275 0V220 M380 0V220 M485 0V220 M590 0V220" /></g><path className="chart-area" d="M0 195 L65 184 L170 190 L275 150 L380 162 L485 130 L590 145 L650 82 L650 220 L0 220 Z" /><path className="chart-line green-line" d="M0 195 L65 184 L170 190 L275 150 L380 162 L485 130 L590 145 L650 82" /><path className="chart-line red-line" d="M0 190 L65 170 L170 174 L275 154 L380 140 L485 120 L590 102 L650 42" /><circle cx="650" cy="82" r="4" className="green-dot" /><circle cx="650" cy="42" r="4" className="red-dot" /></svg><div className="chart-x-labels"><span>Aug 24</span><span>Aug 25</span><span>Aug 26</span><span>Aug 27</span><span>Aug 28</span><span>Aug 29</span><span>Today</span></div></div><div className="legend"><span><i className="legend-dot recovered" /> Recovered revenue</span><span><i className="legend-dot risk" /> Revenue at risk</span></div></article><article className="panel funnel-panel"><div className="panel-heading"><h3>Recovery funnel</h3><span className="mono muted">8 cases</span></div><div className="funnel-list"><div className="funnel-row"><div><span>At risk</span><b>₹96.2L</b></div><div className="funnel-bar risk-bar" style={{ width: "100%" }} /></div><div className="funnel-row"><div><span>Contacted</span><b>₹52.4L</b></div><div className="funnel-bar diagnosed-bar" style={{ width: "54%" }} /></div><div className="funnel-row"><div><span>Recovery attempt</span><b>₹31.8L</b></div><div className="funnel-bar intervened-bar" style={{ width: "33%" }} /></div><div className="funnel-row"><div><span>Recovered</span><b>₹18.6L</b></div><div className="funnel-bar recovered-bar" style={{ width: "19.4%" }} /></div></div><div className="funnel-foot"><ShieldCheck size={15} /> 3 approval checkpoints · all actions logged with recorded consent.</div></article></section>
    <FailureBreakdown />
    <section className="panel highest-value-panel"><div className="panel-heading"><div><h3>Highest-value cases</h3><p className="panel-subtitle">Cases that need the clearest next action.</p></div><button className="text-button" onClick={() => onNavigate("campaigns")}>View all campaigns <ArrowRight size={13} /></button></div><div className="highest-value-list">{campaigns.slice(0, 4).map((campaign) => <div className="highest-value-row" key={campaign.id}><div><strong>{campaign.customer}</strong><span className="mono">{campaign.id} · {campaign.issue}</span></div><div><b>{campaign.amount}</b><span>{campaign.state} · {campaign.channel}</span></div><StatusPill tone={campaign.tone}>{campaign.state}</StatusPill><button className="icon-button" onClick={() => onNavigate(campaign.state === "Recovered" ? "campaigns" : "portal")} aria-label={`Open ${campaign.id}`}><ChevronRight size={16} /></button></div>)}</div></section>
  </>;
}

function FeedPage({ onNavigate }: { onNavigate: (page: Page) => void }) { return <><PageHeading eyebrow="Operations / live feed" title="Live recovery feed" detail="A real-time stream of every detection, diagnosis, intervention and recovery action." onBack={() => onNavigate("summary")} /><section className="panel feed-panel"><div className="panel-heading"><div><h3>Agent activity</h3><p className="panel-subtitle">Cortex Shield is monitoring 8 active recovery loops.</p></div><StatusPill tone="green"><span className="pulse-dot" /> Live</StatusPill></div><div className="feed-list">{feedItems.map((item) => <div className="feed-row" key={item.time}><span className="feed-time mono">{item.time}</span><span className={`feed-marker ${item.tone}`} /><div className="feed-body"><strong>{item.title}</strong><span>{item.detail}</span></div><StatusPill tone={item.tone}>{item.tag}</StatusPill><button className="icon-button" title="Open related recovery cases" onClick={() => onNavigate("cases")}><ChevronRight size={16} /></button></div>)}</div></section></>; }

function CasesPage({ onNavigate }: { onNavigate: (page: Page) => void }) { return <><PageHeading eyebrow="Operations / cases" title="Recovery cases" detail="Every failed payment becomes an auditable, policy-aware recovery case." onBack={() => onNavigate("summary")} /><section className="panel table-panel"><div className="panel-heading"><div><h3>Open recovery queue</h3><p className="panel-subtitle">Sorted by exposure and next best action.</p></div><button className="secondary-button" onClick={() => toast.success("Case queue refreshed")}><RefreshCcw size={14} /> Refresh queue</button></div><div className="table-wrap"><table><thead><tr><th>Case</th><th>Customer</th><th>Failure</th><th>Exposure</th><th>Status</th><th /></tr></thead><tbody>{caseRows.map((row) => <tr key={row.id}><td className="mono strong-cell">{row.id}</td><td>{row.customer}</td><td>{row.issue}</td><td className="strong-cell">{row.amount}</td><td><StatusPill tone={row.tone}>{row.state}</StatusPill></td><td><button className="text-button" onClick={() => toast(`Opened ${row.id}`, { description: "Case details are ready for review." })}>Open case <ArrowRight size={13} /></button></td></tr>)}</tbody></table></div></section></>; }

function AnalyticsPage({ onNavigate }: { onNavigate: (page: Page) => void }) { return <><PageHeading eyebrow="Insights / revenue" title="Revenue analytics" detail="Measure exposure, recovery efficiency, and the economics of every outreach path." onBack={() => onNavigate("summary")} /><div className="analytics-stat-grid"><MetricCard label="Potential ARR protected" value="₹1.42Cr" detail="Across current open cases" tone="primary" icon={ArrowUpRight} /><MetricCard label="Best intervention" value="UPI intent" detail="28.4% conversion this week" tone="success" icon={Zap} /><MetricCard label="Avg. time to recover" value="4.2h" detail="Down 38% from manual baseline" tone="neutral" icon={Clock3} /></div><section className="panel insight-panel"><div className="panel-heading"><div><h3>Recovery efficiency by channel</h3><p className="panel-subtitle">Conversion rate after a first intervention.</p></div><span className="mono muted">7 day window</span></div><div className="efficiency-list"><div><span>UPI intent</span><div className="efficiency-track"><i style={{ width: "82%", background: "#27c980" }} /></div><b>28.4%</b></div><div><span>WhatsApp nudge</span><div className="efficiency-track"><i style={{ width: "61%", background: "#4198ff" }} /></div><b>21.1%</b></div><div><span>Email recovery</span><div className="efficiency-track"><i style={{ width: "44%", background: "#9b6cff" }} /></div><b>15.6%</b></div><div><span>Smart retry</span><div className="efficiency-track"><i style={{ width: "34%", background: "#f7ae38" }} /></div><b>11.8%</b></div></div></section></>; }

function ApprovalsPage({ onNavigate }: { onNavigate: (page: Page) => void }) { const [approved, setApproved] = useState<string[]>([]); const approve = (id: string) => { setApproved((items) => [...items, id]); toast.success(`${id} approved`, { description: "The recovery policy can now continue." }); }; return <><PageHeading eyebrow="Human-in-the-loop" title="Human approvals" detail="High-value or policy-sensitive actions wait here for an accountable decision." onBack={() => onNavigate("summary")} /><section className="approval-grid">{["CASE-4807", "CASE-4794", "CASE-4789"].map((id, index) => <article className="panel approval-card" key={id}><div className="approval-top"><StatusPill tone="amber">Awaiting review</StatusPill><span className="mono muted">{index === 0 ? "₹22,800" : index === 1 ? "₹1,24,000" : "₹74,500"}</span></div><h3>{id} · {index === 0 ? "Mandate recovery" : index === 1 ? "High-value invoice" : "Incentive override"}</h3><p>{index === 0 ? "Approve a one-time UPI intent link after a mandate authorization drop." : "A human decision is required before a high-value customer incentive is dispatched."}</p><div className="approval-actions">{approved.includes(id) ? <div className="approved-state"><CheckCircle2 size={16} /> Approved and queued</div> : <><button className="primary-button compact" onClick={() => approve(id)}><Check size={14} /> Approve</button><button className="secondary-button compact" onClick={() => toast("Skipped for now", { description: `${id} stays in the approval queue.` })}>Skip</button></>}</div></article>)}</section></>; }

function SimulatorPage({ linkActive, onDispatch, onOpenPayment, onNavigate }: { linkActive: boolean; onDispatch: () => void; onOpenPayment: () => void; onNavigate: (page: Page) => void }) {
  const [preset, setPreset] = useState("soft_decline");
  const [eventState, setEventState] = useState("Ready for webhook event");
  const dispatch = () => { setEventState("Webhook accepted · AI pipeline complete"); onDispatch(); };
  return <><PageHeading eyebrow="AI operations / simulator" title="AI Simulator" detail="Replay a payment failure, dispatch a webhook, and open the customer recovery path in a controlled sandbox." onBack={() => onNavigate("summary")} /><section className="simulator-layout"><article className="panel simulator-console"><div className="simulator-console-top"><div><span className="eyebrow">Failure event composer</span><h3>Dispatch a Razorpay webhook event</h3></div><StatusPill tone={linkActive ? "green" : "blue"}>{linkActive ? "Link active" : "Sandbox"}</StatusPill></div><p className="simulator-intro">Select a failure preset or customize the event. Cortex Shield will diagnose the issue, choose an intervention, and prepare a smart recovery link.</p><label className="field-label" htmlFor="failure-preset">Failure preset</label><select id="failure-preset" className="dark-select" value={preset} onChange={(event) => setPreset(event.target.value)}><option value="soft_decline">Soft decline · insufficient funds</option><option value="card_expired">Card expired / invalid details</option><option value="otp_timeout">OTP timeout & customer abandonment</option><option value="bank_outage">Bank network outage / downtime</option></select><div className="code-event"><div><span className="code-key">event</span><span>payment.failed</span></div><div><span className="code-key">reason</span><span>{preset.replaceAll("_", " ")}</span></div><div><span className="code-key">amount</span><span>₹14,200.00</span></div><div><span className="code-key">case</span><span>CASE-4821</span></div></div><button className="primary-button dispatch-button" onClick={dispatch}><Zap size={15} fill="currentColor" /> Dispatch Razorpay webhook event <ArrowRight size={15} /></button><div className="simulator-note"><CheckCircle2 size={14} /> {eventState}</div></article><article className="panel agent-trace"><div className="panel-heading"><div><h3>Autonomous agent trace</h3><p className="panel-subtitle">One event, four coordinated operators.</p></div><Code2 size={17} className="panel-heading-icon" /></div><div className="trace-list"><div className="trace-item complete"><span className="trace-number">01</span><div><strong>Failure Analysis Agent</strong><span>Classifies the gateway reason and customer risk.</span></div><StatusPill tone="green">ONLINE</StatusPill></div><div className="trace-item complete"><span className="trace-number">02</span><div><strong>Smart Retry & Uptime Router</strong><span>Checks issuer health before scheduling a retry.</span></div><StatusPill tone="green">ONLINE</StatusPill></div><div className={`trace-item ${linkActive ? "complete" : "pending"}`}><span className="trace-number">03</span><div><strong>Conversational Dunning Bot</strong><span>Builds a consent-aware WhatsApp recovery message.</span></div><StatusPill tone={linkActive ? "green" : "amber"}>{linkActive ? "DONE" : "WAITING"}</StatusPill></div><div className={`trace-item ${linkActive ? "complete" : "pending"}`}><span className="trace-number">04</span><div><strong>Razorpay Link Dispatcher</strong><span>Activates a 1-tap UPI intent and smart checkout link.</span></div><StatusPill tone={linkActive ? "green" : "amber"}>{linkActive ? "ACTIVE" : "WAITING"}</StatusPill></div></div></article></section>{linkActive && <section className="panel smart-link-card"><div className="smart-link-orb"><WalletCards size={22} /></div><div><span className="eyebrow">Recovery link generated</span><h3>Smart Link activated for CASE-4821</h3><p>Customer-safe payment portal ready with UPI, cards, and netbanking. This is a simulated checkout and sends no live request.</p><div className="smart-link-url mono">cortex.shield/pay/CASE-4821?mode=smart</div></div><button className="primary-button" onClick={onOpenPayment}>Open simulated payment screen <ArrowRight size={15} /></button></section>}</>; }

function downloadReceipt({ amount, paymentId, route, customer }: { amount: string; paymentId: string; route: string; customer: string }) {
  const doc = new jsPDF();
  const printableAmount = amount.replace("₹", "INR ");
  const issuedAt = new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
  doc.setFillColor(8, 17, 29); doc.rect(0, 0, 210, 44, "F");
  doc.setTextColor(236, 244, 253); doc.setFont("helvetica", "bold"); doc.setFontSize(18); doc.text("CORTEX SHIELD", 18, 20);
  doc.setTextColor(121, 165, 231); doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.text("AUTONOMOUS PAYMENT RECOVERY", 18, 29);
  doc.setTextColor(67, 215, 151); doc.setFontSize(8); doc.text("RECOVERY COMPLETE", 158, 20);
  doc.setTextColor(107, 126, 149); doc.text("Sandbox demo receipt", 158, 28);
  doc.setTextColor(91, 108, 129); doc.setFontSize(8); doc.text(`Receipt ID  ${paymentId}`, 18, 60); doc.text(`Issued  ${issuedAt}`, 18, 67);
  doc.setDrawColor(207, 218, 231); doc.line(18, 75, 192, 75);
  doc.setTextColor(30, 45, 64); doc.setFont("helvetica", "bold"); doc.setFontSize(13); doc.text("PAYMENT RECEIPT", 18, 91);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(91, 108, 129); doc.text("Cortex Shield recovery portal", 18, 99);
  doc.setDrawColor(218, 227, 237); doc.roundedRect(18, 112, 174, 38, 4, 4, "S");
  doc.setFontSize(8); doc.setTextColor(105, 122, 143); doc.text("AMOUNT PAID", 27, 125); doc.text("STATUS", 136, 125);
  doc.setFont("helvetica", "bold"); doc.setFontSize(19); doc.setTextColor(25, 43, 66); doc.text(printableAmount, 27, 141);
  doc.setFontSize(11); doc.setTextColor(34, 164, 108); doc.text("RECOVERED", 136, 140);
  doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(105, 122, 143); doc.text("PAYMENT DETAILS", 18, 178);
  doc.setDrawColor(230, 236, 243); doc.line(18, 184, 192, 184);
  const rows = [["Customer", customer], ["Route", route], ["Payment ID", paymentId], ["Purpose", "Revenue recovery / failed payment resolution"]];
  rows.forEach(([label, value], index) => { const y = 199 + index * 14; doc.setFont("helvetica", "bold"); doc.setTextColor(75, 92, 113); doc.text(label, 18, y); doc.setFont("helvetica", "normal"); doc.setTextColor(34, 49, 70); doc.text(value, 73, y); });
  doc.setFillColor(242, 247, 252); doc.roundedRect(18, 267, 174, 30, 4, 4, "F"); doc.setFont("helvetica", "bold"); doc.setFontSize(9); doc.setTextColor(38, 62, 92); doc.text("Thank you for completing this recovery payment.", 27, 280); doc.setFont("helvetica", "normal"); doc.setFontSize(8); doc.setTextColor(99, 117, 138); doc.text("This is a simulated sandbox receipt. No real money was moved.", 27, 289);
  doc.setDrawColor(207, 218, 231); doc.line(18, 317, 192, 317); doc.setFontSize(8); doc.setTextColor(113, 130, 150); doc.text("Cortex Shield Engine  ·  Autonomous recovery operations  ·  2026", 18, 330);
  doc.save(`cortex-shield-receipt-${paymentId}.pdf`);
}

function CampaignsPage({ onOpenPayment, onNavigate }: { onOpenPayment: (campaign?: Campaign) => void; onNavigate: (page: Page) => void }) {
  const [filter, setFilter] = useState<"ALL" | "RECOVERED" | "UNCOVERED">("ALL");
  const [inspect, setInspect] = useState<Campaign | null>(null);
  const [copied, setCopied] = useState(false);
  useEffect(() => { if (!inspect) return; const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setInspect(null); }; window.addEventListener("keydown", closeOnEscape); return () => window.removeEventListener("keydown", closeOnEscape); }, [inspect]);
  const filtered = useMemo(() => filter === "ALL" ? campaigns : campaigns.filter((item) => filter === "RECOVERED" ? item.state === "Recovered" : item.state !== "Recovered"), [filter]);
  const copyLink = async (campaign: Campaign) => { await navigator.clipboard?.writeText(`https://cortex.shield/recover/${campaign.id}`); setCopied(true); toast.success("Payment link copied", { description: `Recovery link for ${campaign.id} is ready to share.` }); window.setTimeout(() => setCopied(false), 1600); };
  return <><PageHeading eyebrow="Recovery / campaigns" title="Campaigns" detail="Review recovered and uncovered cases, inspect the agent log, and open the next payment path." onBack={() => onNavigate("summary")} /><div className="campaign-summary"><div className="campaign-count recovered-count"><span>Recovered</span><b>{campaigns.filter((item) => item.state === "Recovered").length}</b><small>cases closed with money in</small></div><div className="campaign-count uncovered-count"><span>Uncovered</span><b>{campaigns.filter((item) => item.state !== "Recovered").length}</b><small>cases need another action</small></div><div className="campaign-count exposure-count"><span>Open exposure</span><b>$126,980</b><small>across active loops</small></div></div><section className="panel campaign-panel"><div className="panel-heading"><div><h3>Recovery campaign queue</h3><p className="panel-subtitle">The next best action is always one click away.</p></div><div className="filter-pills">{["ALL", "RECOVERED", "UNCOVERED"].map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item as typeof filter)}>{item === "ALL" ? "All" : item[0] + item.slice(1).toLowerCase()}</button>)}</div></div><div className="campaign-list">{filtered.map((campaign) => <div className="campaign-row" key={campaign.id}><div className="campaign-main"><strong>{campaign.customer}</strong><span className="mono">{campaign.id} · {campaign.issue}</span></div><div className="campaign-money"><b>{campaign.amount}</b><span>{campaign.state === "Recovered" ? "Recovered" : "at risk"} · {campaign.channel}</span></div><div className="campaign-score"><div className="score-track"><i style={{ width: `${Math.min(96, 48 + campaign.numericAmount / 4000)}%`, background: campaign.tone === "green" ? "#27c980" : campaign.tone === "red" ? "#fb5d61" : "#f7ae38" }} /></div><span>{campaign.state === "Recovered" ? "100" : "66"}</span></div><StatusPill tone={campaign.tone}>{campaign.state}</StatusPill><div className="campaign-actions">{campaign.state !== "Recovered" && <button className="text-button" onClick={() => onOpenPayment(campaign)}>Recover <ArrowRight size={13} /></button>}<button className="text-button inspect-button" onClick={() => { setInspect(campaign); setCopied(false); }}><ScanSearch size={13} /> Inspect log</button></div></div>)}</div></section>{inspect && <div className="inspect-overlay" role="presentation" onClick={() => setInspect(null)}><section className="panel inspect-panel inspect-modal" role="dialog" aria-modal="true" aria-labelledby="inspect-title" onClick={(event) => event.stopPropagation()}><div className="inspect-heading">
<div><span className="eyebrow">Agent solution copy / {inspect.id}</span><h3 id="inspect-title">Recommended recovery path</h3>
</div><button className="icon-button" onClick={() => setInspect(null)} aria-label="Close inspect log"><X size={17} /></button></div><div className="inspect-grid"><div className="log-copy"><div className="log-line"><span className="log-label">DIAGNOSIS</span><p>{inspect.issue} detected after a failed customer payment. The next attempt should avoid the current channel and preserve customer consent.</p></div><div className="log-line"><span className="log-label">SOLUTION</span><p>Send a short recovery message with a one-time Cortex Shield smart link. Route the customer to the preferred payment method and log the final outcome.</p></div><div className="copy-link-row"><span className="mono">https://cortex.shield/recover/{inspect.id}</span><button className="secondary-button compact" onClick={() => copyLink(inspect)}><Copy size={13} /> {copied ? "Copied" : "Copy payment link"}</button></div></div><button className="primary-button portal-button" onClick={() => onOpenPayment(inspect)}>Open recovery portal <ArrowRight size={15} /></button></div></section></div>}</>; }

function PaymentPortal({ paymentSuccess, method, setMethod, onPay, onBack, activeCampaign }: { paymentSuccess: boolean; method: "upi" | "card" | "netbanking"; setMethod: (method: "upi" | "card" | "netbanking") => void; onPay: (event: React.FormEvent<HTMLFormElement>) => void; onBack: () => void; activeCampaign: Campaign | null }) {
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const amount = activeCampaign?.amount ?? "₹14,200";
  const paymentId = useMemo(() => `pay_cx_${Math.random().toString(36).slice(2, 9)}`, []);
  const routeLabel = method === "upi" ? "UPI intent" : method === "card" ? "Credit / debit card" : "Netbanking";
  if (paymentSuccess) return <section className="payment-success panel"><div className="success-check"><Check size={31} /></div><span className="eyebrow">Payment confirmed</span><h2>Recovery complete</h2><p>Your demo payment of <strong>{amount}</strong> was captured successfully. Cortex Shield has written the recovery event to the audit trail.</p><div className="success-details"><span><small>Payment ID</small><b className="mono">{paymentId}</b></span><span><small>Route</small><b>{routeLabel}</b></span><span><small>Status</small><StatusPill tone="green">Recovered</StatusPill></span></div><div className="success-actions"><button className="primary-button" onClick={onBack}>Back to campaigns <ArrowRight size={15} /></button><button className="secondary-button" onClick={() => { downloadReceipt({ amount, paymentId, route: routeLabel, customer: activeCampaign?.customer ?? "Aurora Cloud" }); toast.success("Receipt downloaded", { description: "Your Cortex Shield demo receipt PDF is ready." }); }}>Download receipt <ArrowDownToLine size={14} /></button></div></section>;
  return <section className="portal-layout"><div className="portal-shell"><div className="portal-brand"><div className="portal-brand-mark"><img src="/images/foursquare.png" alt="Cortex Shield" /></div><div><strong>Cortex Shield Smart Checkout</strong><span>Secure recovery portal · sandbox mode</span></div><LockKeyhole size={17} className="portal-lock" /></div><div className="portal-merchant"><div><span className="eyebrow">Payment recovery</span><h2>Complete your payment</h2><p>Aurora Cloud · {activeCampaign?.issue ?? "Soft decline recovery"}</p></div><div className="portal-amount"><small>Amount due</small><b>{amount}</b></div></div><div className="payment-method-tabs">{[{ id: "upi", label: "UPI", icon: Zap }, { id: "card", label: "Credit / debit", icon: CreditCard }, { id: "netbanking", label: "Netbanking", icon: Globe2 }].map(({ id, label, icon: Icon }) => <button key={id} className={method === id ? "active" : ""} onClick={() => setMethod(id as typeof method)}><Icon size={15} />{label}</button>)}</div><form className="payment-form" onSubmit={onPay}>{method === "upi" && <><label className="field-label" htmlFor="upi-id">UPI ID</label><input id="upi-id" required value={upiId} onChange={(event) => setUpiId(event.target.value)} placeholder="name@bank" /><div className="payment-hint"><Zap size={14} /> A secure intent request will open in your UPI app.</div></>}{method === "card" && <><label className="field-label" htmlFor="card-number">Card number</label><input id="card-number" required value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} placeholder="4242 4242 4242 4242" inputMode="numeric" /><label className="field-label" htmlFor="card-name">Name on card</label><input id="card-name" required value={cardName} onChange={(event) => setCardName(event.target.value)} placeholder="Aarav Mehta" /><div className="card-inline"><input required placeholder="MM / YY" /><input required placeholder="CVV" inputMode="numeric" /></div></>}{method === "netbanking" && <><label className="field-label" htmlFor="bank">Select your bank</label><select id="bank" className="dark-select" defaultValue="hdfc"><option value="hdfc">HDFC Bank</option><option value="icici">ICICI Bank</option><option value="sbi">State Bank of India</option><option value="axis">Axis Bank</option></select><div className="payment-hint"><Globe2 size={14} /> You will be redirected to your bank's secure login.</div></>}<button className="primary-button pay-button" type="submit"><LockKeyhole size={14} /> Pay {amount} securely <ArrowRight size={15} /></button><p className="secure-copy"><ShieldCheck size={13} /> Encrypted sandbox payment · no real money is moved</p></form></div><aside className="portal-side panel"><div className="eyebrow">Smart link context</div><h3>Why this recovery path?</h3><p>Cortex Shield selected this portal after diagnosing the payment failure and checking the current issuer route.</p><div className="portal-reason"><span className="reason-icon"><ScanSearch size={15} /></span><div><strong>Diagnosis</strong><span>{activeCampaign?.issue ?? "Soft decline / insufficient funds"}</span></div></div><div className="portal-reason"><span className="reason-icon"><GitBranch size={15} /></span><div><strong>Recommended route</strong><span>UPI intent first, smart retry fallback</span></div></div><button className="secondary-button" onClick={onBack}><ArrowLeft size={14} /> Back to AI Simulator</button></aside></section>;
}

function PitchPage({ onNavigate }: { onNavigate: (page: Page) => void }) { return <><PageHeading eyebrow="Story / system design" title="Pitch & Architecture" detail="The Cortex Shield model: autonomous revenue recovery with transparent handoffs, controls, and proof of outcome." onBack={() => onNavigate("summary")} /><section className="pitch-hero panel"><div><span className="eyebrow">Cortex Shield · build hackathon</span><h3>Turn failed payments into controlled recovery paths.</h3><p>Four specialized agents coordinate around a single objective: recover revenue quickly without compromising customer consent or operator visibility.</p></div><div className="pitch-stat"><b>4</b><span>specialized agents</span></div><div className="pitch-stat"><b>1</b><span>auditable recovery loop</span></div></section><section className="architecture-flow panel"><div className="panel-heading"><div><h3>Autonomous recovery loop</h3><p className="panel-subtitle">From webhook signal to captured payment.</p></div><StatusPill tone="green">Guardrails on</StatusPill></div><div className="architecture-steps">{[{ step: "01", title: "Detect", detail: "Ingest payment.failed webhooks and create a recovery case.", icon: Activity, color: "blue" }, { step: "02", title: "Diagnose", detail: "Classify failure reason, issuer health, and customer risk.", icon: ScanSearch, color: "amber" }, { step: "03", title: "Intervene", detail: "Choose retry, dunning, incentive, or human approval.", icon: MessageCircleMore, color: "magenta" }, { step: "04", title: "Recover", detail: "Dispatch smart link, capture payment, and write the audit event.", icon: CheckCircle2, color: "green" }].map(({ step, title, detail, icon: Icon, color }, index) => <div className="architecture-step" key={title}><div className={`architecture-icon ${color}`}><Icon size={19} /></div><span className="architecture-number mono">{step}</span><h4>{title}</h4><p>{detail}</p>{index < 3 && <ArrowRight className="architecture-arrow" size={17} />}</div>)}</div></section><section className="agent-principles"><article className="panel principle-card"><Network size={18} /><h3>Composable by design</h3><p>Each agent owns one decision surface and publishes a structured event for the next operator.</p></article><article className="panel principle-card"><LockKeyhole size={18} /><h3>Human when it matters</h3><p>Value thresholds, incentive caps, and consent checks prevent automation from becoming a black box.</p></article><article className="panel principle-card"><FileClock size={18} /><h3>Proof, not promises</h3><p>Every decision, message, link, and payment outcome is written to an immutable audit trail.</p></article></section></>; }

function TrackPage({ onNavigate }: { onNavigate: (page: Page) => void }) {
  const architecture = [
    { step: "01", title: "Detect risk", detail: "Razorpay payment.failed webhooks, checkout drop-offs, and overdue receivables enter one recovery queue.", icon: Activity, tone: "blue" },
    { step: "02", title: "Diagnose cause", detail: "Failure Analysis Agent classifies soft declines, expired cards, OTP failures, and issuer outages.", icon: ScanSearch, tone: "amber" },
    { step: "03", title: "Choose action", detail: "Policy-aware agents select smart retry, UPI intent, dunning, incentive, or human approval.", icon: GitBranch, tone: "magenta" },
    { step: "04", title: "Recover safely", detail: "Link Dispatcher opens a customer-safe portal, captures payment, and records proof in the audit trail.", icon: CheckCircle2, tone: "green" },
  ];
  return <><PageHeading eyebrow="Razorpay Build Hackathon / Track 3" title="AI Revenue Recovery" detail="Find revenue that’s slipping away and win it back" onBack={() => onNavigate("summary")} /><section className="track-hero panel"><div><span className="eyebrow">Track 3 · AI Revenue Recovery</span><h3>Build an agent that detects revenue at risk, determines the right intervention, and executes a bounded recovery workflow.</h3><p>From payment failures and checkout abandonment to overdue receivables, Cortex Shield turns a lost-payment signal into a transparent, consent-aware recovery path.</p><div className="track-actions"><button className="primary-button" onClick={() => onNavigate("simulator")}><Play size={14} fill="currentColor" /> See the live solution <ArrowRight size={15} /></button><button className="secondary-button" onClick={() => onNavigate("doc")}><Network size={14} /> Open architecture pitch</button></div></div><div className="track-hero-badge"><LifeBuoy size={30} /><strong>Revenue recovery</strong><span>bounded · auditable · human-aware</span></div></section><section className="track-problem-grid"><article className="panel track-story"><span className="eyebrow">The problem</span><h3>Revenue loss rarely arrives as one clean failure.</h3><p>Funds can slip through a soft decline, a dropped checkout, a timed-out OTP, or an invoice that quietly ages past due. Operators need more than another alert—they need the next best action, with guardrails.</p><div className="track-proof"><span><b>343</b> failure signals</span><span><b>4</b> coordinated agents</span><span><b>1</b> auditable loop</span></div></article><article className="panel track-story solution-story"><span className="eyebrow">The Cortex Shield solution</span><h3>Autonomy with a clear handoff at every step.</h3><p>Each agent owns one decision surface. The system checks issuer health, customer consent, value thresholds, and policy before it sends a recovery link or asks a human to decide.</p><button className="text-button" onClick={() => onNavigate("campaigns")}>Review recovery campaigns <ArrowRight size={13} /></button></article></section><section className="panel track-architecture"><div className="panel-heading"><div><span className="eyebrow">Solution architecture</span><h3>From Razorpay signal to recovered revenue</h3><p className="panel-subtitle">A bounded loop designed to be easy to demo, explain, and trust.</p></div><StatusPill tone="green">Guardrails on</StatusPill></div><div className="track-flow">{architecture.map(({ step, title, detail, icon: Icon, tone }, index) => <div className="track-flow-step" key={step}><div className={`track-flow-icon ${tone}`}><Icon size={20} /></div><span className="track-flow-number mono">{step}</span><h4>{title}</h4><p>{detail}</p>{index < architecture.length - 1 && <ArrowRight className="track-flow-arrow" size={20} />}</div>)}</div><div className="track-outcome"><div className="track-outcome-icon"><CheckCircle2 size={18} /></div><div><strong>Outcome for Razorpay merchants</strong><span>Fewer abandoned recoveries, faster customer resolution, and a complete decision trail for every rupee recovered.</span></div><button className="primary-button compact" onClick={() => onNavigate("portal")}>Open demo portal <ArrowRight size={14} /></button></div></section><section className="panel submission-checklist"><div className="panel-heading"><div><span className="eyebrow">Final handoff / Razorpay AI Internship</span><h3>Submission Checklist for Razorpay AI Internship Evaluation</h3><p className="panel-subtitle">Package the working proof, pitch, and form submission so the Track 3 story is easy to review.</p></div><StatusPill tone="blue">Track 3</StatusPill></div><div className="submission-bubbles"><article className="checklist-bubble"><div className="checklist-number">01</div><div><h4>Public GitHub Repo</h4><p>Clean modular code with standard README.md, setup instructions & architecture diagram.</p></div><button className="text-button" onClick={() => onNavigate("doc")}>Review architecture <ArrowRight size={13} /></button></article><article className="checklist-bubble"><div className="checklist-number">02</div><div><h4>5-Minute Pitch Video</h4><p>Demonstrate the live judge simulator triggering failure events & recovering ARR instantly.</p>{PITCH_VIDEO_URL ? <a className="checklist-link" href={PITCH_VIDEO_URL} target="_blank" rel="noreferrer">Open pitch video <ArrowUpRight size={13} /></a> : <span className="checklist-link checklist-link-placeholder"><FileText size={13} /> Add your pitch video link in PITCH_VIDEO_URL</span>}</div></article><article className="checklist-bubble"><div className="checklist-number">03</div><div><h4>Form Submission</h4><p>Select <strong>Track 3: AI Revenue Recovery</strong> in the Razorpay form and paste your GitHub & pitch-video link.</p><div className="checklist-ready"><CheckCircle2 size={14} /> Ready for final submission</div></div></article></div></section></>;
}

function PolicyPage({ onNavigate }: { onNavigate: (page: Page) => void }) { const [enabled, setEnabled] = useState({ retry: true, incentive: true, approval: true }); return <><PageHeading eyebrow="Controls / guardrails" title="Policy & guardrails" detail="Define what Cortex Shield can do autonomously and what requires a human decision." onBack={() => onNavigate("summary")} /><section className="policy-grid">{[{ key: "retry", title: "Smart retry window", detail: "Defer retries when issuer uptime is below 92%.", icon: RotateCcw }, { key: "incentive", title: "Dynamic incentive cap", detail: "Never exceed a 10% discount without approval.", icon: Tag }, { key: "approval", title: "High-value escalation", detail: "Require review for any recovery above ₹75,000.", icon: ShieldAlert }].map(({ key, title, detail, icon: Icon }) => <article className="panel policy-card" key={key}><div className="policy-icon"><Icon size={18} /></div><div className="policy-copy"><h3>{title}</h3><p>{detail}</p></div><button className={`toggle ${enabled[key as keyof typeof enabled] ? "on" : ""}`} aria-label={`Toggle ${title}`} onClick={() => setEnabled((current) => ({ ...current, [key]: !current[key as keyof typeof enabled] }))}><span /></button></article>)}</section></>; }

function AuditPage({ onNavigate }: { onNavigate: (page: Page) => void }) { return <><PageHeading eyebrow="Governance / audit" title="Audit trail" detail="A searchable record of agent decisions, human approvals, and customer-facing actions." onBack={() => onNavigate("summary")} /><section className="panel table-panel"><div className="panel-heading"><div><h3>Recent decisions</h3><p className="panel-subtitle">Immutable activity log for this sandbox workspace.</p></div><button className="secondary-button" onClick={() => toast.success("Audit export prepared")}><ArrowDownToLine size={14} /> Export CSV</button></div><div className="audit-list">{feedItems.map((item, index) => <div className="audit-row" key={`${item.time}-${index}`}><span className="audit-icon"><FileText size={15} /></span><div><strong>{item.title}</strong><span>{item.detail}</span></div><span className="mono muted">{item.time}</span><StatusPill tone="green">Logged</StatusPill></div>)}</div></section></>; }

export default function Home() {
  const [page, setPage] = useState<Page>("summary");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [step, setStep] = useState(0);
  const [resetCount, setResetCount] = useState(0);
  const [linkActive, setLinkActive] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [activeCampaign, setActiveCampaign] = useState<Campaign | null>(null);

  useEffect(() => { if (!isRunning) return; const timer = window.setInterval(() => { setStep((current) => { const next = current + 1; if (next >= 4) { window.clearInterval(timer); window.setTimeout(() => setIsRunning(false), 350); return 4; } return next; }); }, 850); return () => window.clearInterval(timer); }, [isRunning]);

  const navigate = (nextPage: Page) => { setPage(nextPage); setSidebarOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const runDemo = () => { setStep(0); setIsRunning(true); navigate("simulator"); toast("Diagnostic run launched", { description: "Cortex Shield is tracing 8 synthetic recovery cases." }); };
  const resetDemo = () => { setIsRunning(false); setStep(0); setLinkActive(false); setPaymentSuccess(false); setActiveCampaign(null); setResetCount((count) => count + 1); navigate("summary"); toast.success("Workspace reset", { description: "Demo state returned to the initial recovery queue." }); };
  const dispatchWebhook = () => { setLinkActive(true); toast.success("Smart link activated", { description: "A recovery portal is ready for the simulated customer." }); };
  const openPayment = (campaign?: Campaign) => { setActiveCampaign(campaign ?? null); setPaymentSuccess(false); setPaymentMethod("upi"); navigate("portal"); };
  const handlePay = (event: React.FormEvent<HTMLFormElement>) => { event.preventDefault(); setPaymentSuccess(true); toast.success("Demo payment successful", { description: "Recovery outcome written to the Cortex Shield audit trail." }); };
  const activeLabel = navItems.find((item) => item.id === page)?.label ?? "Executive summary";

  return <div className="cortex-app">
<div className={`mobile-scrim ${sidebarOpen ? "visible" : ""}`} onClick={() => setSidebarOpen(false)} /><aside className={`sidebar ${sidebarOpen ? "open" : ""}`}><div className="brand-lockup"><button className="brand-mark-button" onClick={() => navigate("summary")} aria-label="Go to Cortex Shield executive summary"><img src="/images/foursquare.png" alt="Cortex Shield mark" /></button><button className="brand-text" onClick={() => navigate("summary")}><strong>Cortex Shield</strong><span>AI revenue recovery</span></button><button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Close navigation"><X size={18} /></button></div><div className="sidebar-rule" /><nav className="sidebar-nav" aria-label="Workspace navigation">{navItems.map(({ id, label, icon: Icon }) => <button className={`sidebar-item ${page === id ? "active" : ""}`} key={id} onClick={() => navigate(id)}><Icon size={18} /><span>{label}</span>{page === id && <ChevronRight size={14} className="selected-chevron" />}</button>)}</nav><div className="sidebar-footer"><div className="workspace-badge"><span className="online-dot" /> Sandbox workspace <span className="mono">v2.4</span></div><p>Payments protected by policy-aware agents.</p></div></aside><div className="workspace-shell"><header className="topbar"><div className="topbar-left"><button className="mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Open navigation"><Menu size={20} /></button><div><h1>Revenue recovery workspace</h1><p>Detect → diagnose → intervene → recover, with guardrails on every action</p></div></div><nav className="top-nav" aria-label="Primary workspace navigation">{topNavItems.map(({ id, label, icon: Icon }) => <button key={id} className={page === id ? "active" : ""} onClick={() => navigate(id)}><Icon size={13} />{label}</button>)}</nav><div className="topbar-actions"><button className="reset-button" onClick={resetDemo}><RefreshCcw size={15} /> <span>Reset</span></button><button className="primary-button top-action" onClick={runDemo}><Play size={14} fill="currentColor" /> <span>Launch recovery run</span></button></div></header><main className="workspace-content"><div className="active-context"><span className="context-dot" /> Cortex Shield / {activeLabel}<span className="mono">#{String(resetCount + 1).padStart(2, "0")}</span></div>{page === "summary" && <SummaryPage onRunDemo={runDemo} onNavigate={navigate} />}{page === "feed" && <FeedPage onNavigate={navigate} />}{page === "cases" && <CasesPage onNavigate={navigate} />}{page === "analytics" && <AnalyticsPage onNavigate={navigate} />}{page === "approvals" && <ApprovalsPage onNavigate={navigate} />}{page === "simulator" && <SimulatorPage linkActive={linkActive} onDispatch={dispatchWebhook} onOpenPayment={() => openPayment()} onNavigate={navigate} />}{page === "campaigns" && <CampaignsPage onOpenPayment={openPayment} onNavigate={navigate} />}{page === "portal" && <PaymentPortal paymentSuccess={paymentSuccess} method={paymentMethod} setMethod={setPaymentMethod} onPay={handlePay} onBack={() => navigate("simulator")} activeCampaign={activeCampaign} />}{page === "policy" && <PolicyPage onNavigate={navigate} />}{page === "audit" && <AuditPage onNavigate={navigate} />}{page === "doc" && <PitchPage onNavigate={navigate} />}{page === "track" && <TrackPage onNavigate={navigate} />}</main><footer className="workspace-footer"><span>Built for autonomous recovery operations</span><span className="mono">Cortex Shield Engine · Sandbox mode · {new Date().getFullYear()}</span></footer></div></div>;
}
