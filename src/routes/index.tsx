import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { InfraMap } from "@/components/command/InfraMap";
import {
  Droplets, Sun, Trash2, Radio, Activity, Sparkles, AlertTriangle, Zap, Battery, Recycle,
} from "lucide-react";
import {
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid,
  RadialBarChart, RadialBar, PolarAngleAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NEXUS Infra · Command Center Overview" },
      { name: "description", content: "Live operational intelligence for water, energy, waste, and IoT infrastructure across regenerative cities." },
    ],
  }),
  component: Index,
});

const flowData = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}:00`,
  water: 320 + Math.sin(i / 3) * 60 + Math.random() * 20,
  energy: 220 + Math.cos(i / 4) * 80 + Math.random() * 15,
  waste: 60 + Math.sin(i / 5) * 20 + Math.random() * 10,
}));

const healthData = [
  { name: "Water", value: 92, fill: "var(--info)" },
  { name: "Energy", value: 87, fill: "var(--warning)" },
  { name: "Waste", value: 78, fill: "var(--accent)" },
  { name: "Sensors", value: 96, fill: "var(--primary)" },
];

const alerts = [
  { id: "A-401", t: "2m", tone: "destructive", title: "Pipe rupture detected · Sector B-19", meta: "Water · Critical" },
  { id: "A-400", t: "6m", tone: "warning", title: "Transformer T-9 approaching 92% load", meta: "Energy · High" },
  { id: "A-399", t: "14m", tone: "warning", title: "Waste bin overflow risk · Laini hub", meta: "Waste · Medium" },
  { id: "A-398", t: "22m", tone: "info", title: "Sensor F-3 latency spike (4.1s)", meta: "IoT · Low" },
  { id: "A-397", t: "38m", tone: "destructive", title: "Microgrid C-2 frequency deviation", meta: "Energy · Critical" },
] as const;

const aiRecs = [
  { title: "Redistribute 18kW from Soweto East → Zone B", impact: "Stabilize voltage, save 4.2 kWh", icon: Zap },
  { title: "Predictive maintenance on pump P-22 in 38h", impact: "Prevent 92% probability rupture", icon: Activity },
  { title: "Reroute waste truck #4 via Olympic road", impact: "−18% fuel · −22 min cycle", icon: Recycle },
  { title: "Pre-charge batteries before 16:00 demand peak", impact: "+12% community resilience", icon: Battery },
];

function Index() {
  return (
    <CommandLayout title="Global Infrastructure Overview" subtitle="Mission control · Kibera regenerative pilot">
      {/* Top metrics */}
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4 xl:grid-cols-6">
        <MetricCard label="Composite Health" value="89.4" unit="/100" delta={2.1} icon={Activity} tone="primary" hint="All systems nominal" />
        <MetricCard label="Water Flow" value="412" unit="m³/h" delta={3.4} icon={Droplets} tone="info" />
        <MetricCard label="Solar Output" value="284" unit="kW" delta={-1.2} icon={Sun} tone="warning" />
        <MetricCard label="Battery Reserve" value="76" unit="%" delta={5.2} icon={Battery} tone="success" />
        <MetricCard label="Sensors Online" value="1,284" unit="/1,312" delta={0.4} icon={Radio} tone="primary" />
        <MetricCard label="Open Alerts" value="14" unit="active" delta={-12} icon={AlertTriangle} tone="destructive" />
      </div>

      {/* Map + Right column */}
      <div className="mt-4 grid gap-4 xl:grid-cols-[1fr_360px]">
        <PanelCard
          title="Live Infrastructure Map"
          description="Pipelines · Solar nodes · Waste routes · Sensor clusters"
          action={<Badge variant="outline" className="gap-1.5"><span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" /> Streaming</Badge>}
          className="min-h-[460px]"
        >
          <div className="h-[420px]"><InfraMap /></div>
        </PanelCard>

        <div className="flex flex-col gap-4">
          <PanelCard title="Real-Time Alerts" action={<Button variant="ghost" size="sm" className="h-7 text-xs">View all</Button>}>
            <ul className="space-y-2">
              {alerts.map((a) => (
                <li key={a.id} className="flex items-start gap-3 rounded-md border border-border/40 bg-secondary/30 p-2.5">
                  <StatusDot tone={a.tone as any} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">{a.meta} · {a.t} ago · {a.id}</p>
                  </div>
                </li>
              ))}
            </ul>
          </PanelCard>

          <PanelCard title="AI Recommendations" action={<Sparkles className="h-3.5 w-3.5 text-primary" />}>
            <ul className="space-y-2">
              {aiRecs.map((r) => (
                <li key={r.title} className="rounded-md border border-primary/20 bg-primary/5 p-2.5">
                  <div className="flex items-start gap-2">
                    <r.icon className="mt-0.5 h-3.5 w-3.5 text-primary" />
                    <div>
                      <p className="text-xs font-medium">{r.title}</p>
                      <p className="text-[10px] text-muted-foreground">{r.impact}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </PanelCard>
        </div>
      </div>

      {/* Bottom row */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Resource Flow · 24h" description="Water (m³/h) · Energy (kW) · Waste (t/h)" className="lg:col-span-2">
          <div className="h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={flowData} margin={{ left: -20, right: 8, top: 8, bottom: 0 }}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--info)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--info)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--warning)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--warning)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g3" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="water" stroke="var(--info)" fill="url(#g1)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="energy" stroke="var(--warning)" fill="url(#g2)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="waste" stroke="var(--accent)" fill="url(#g3)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard title="System Health Score" description="Weighted by population & criticality">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart innerRadius="30%" outerRadius="100%" data={healthData} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
                <RadialBar background={{ fill: "var(--muted)" }} dataKey="value" cornerRadius={6} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-2 text-[11px]">
            {healthData.map((h) => (
              <div key={h.name} className="flex items-center justify-between rounded border border-border/40 bg-secondary/30 px-2 py-1">
                <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: h.fill }} />{h.name}</span>
                <span className="font-semibold tabular-nums">{h.value}</span>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      {/* Module shortcuts */}
      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
        {[
          { label: "Water leaks (24h)", v: "3", sub: "1 critical · 2 minor", icon: Droplets, tone: "info" },
          { label: "Solar peak today", v: "412kW", sub: "+8% vs forecast", icon: Sun, tone: "warning" },
          { label: "Waste collected", v: "184t", sub: "92% of routes done", icon: Trash2, tone: "accent" },
          { label: "Sensor uptime", v: "97.9%", sub: "28 offline · 3 degraded", icon: Radio, tone: "primary" },
        ].map((s) => (
          <MetricCard key={s.label} label={s.label} value={s.v} hint={s.sub} icon={s.icon} tone={s.tone as any} />
        ))}
      </div>
    </CommandLayout>
  );
}
