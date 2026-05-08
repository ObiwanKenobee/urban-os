import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { Droplets, Gauge, AlertTriangle, FlaskConical, Users } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/water")({
  head: () => ({ meta: [{ title: "Smart Water Systems · NEXUS" }, { name: "description", content: "Water distribution, leak detection, quality intelligence." }] }),
  component: WaterPage,
});

const flow = Array.from({ length: 24 }, (_, i) => ({
  h: `${i}h`, pressure: 3.2 + Math.sin(i / 3) * 0.4, flow: 280 + Math.cos(i / 4) * 50 + Math.random() * 20,
}));

const reservoirs = [
  { name: "Reservoir K-12", level: 78, capacity: "2.4 ML", status: "ok" },
  { name: "Tank Soweto E.", level: 42, capacity: "0.8 ML", status: "warn" },
  { name: "Hill Reserve C-2", level: 91, capacity: "1.2 ML", status: "ok" },
  { name: "Community T-7", level: 18, capacity: "0.3 ML", status: "crit" },
];

const leaks = [
  { id: "L-019", loc: "Sector B-19, main line", prob: 92, est: "8 m³/h loss", tone: "destructive" },
  { id: "L-018", loc: "Olympic Rd, lateral", prob: 64, est: "1.2 m³/h", tone: "warning" },
  { id: "L-017", loc: "Laini junction", prob: 31, est: "0.4 m³/h", tone: "info" },
];

const quality = [
  { name: "pH", v: 7.2, ok: true },
  { name: "Turbidity", v: 1.4, ok: true },
  { name: "Chlorine", v: 0.6, ok: true },
  { name: "E. coli", v: 0, ok: true },
  { name: "Lead", v: 4.1, ok: false },
];

const access = Array.from({ length: 8 }, (_, i) => ({ point: `WP-${i + 1}`, queue: Math.floor(Math.random() * 28) }));

function WaterPage() {
  return (
    <CommandLayout title="Smart Water Systems" subtitle="Distribution · Leak detection · Quality · Community access">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Total Flow" value="412" unit="m³/h" delta={3.4} icon={Droplets} tone="info" />
        <MetricCard label="Avg Pressure" value="3.2" unit="bar" delta={-0.5} icon={Gauge} tone="primary" />
        <MetricCard label="Active Leaks" value="3" hint="1 critical" icon={AlertTriangle} tone="destructive" />
        <MetricCard label="Quality Index" value="94" unit="/100" delta={1.2} icon={FlaskConical} tone="success" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Flow & Pressure · 24h" className="lg:col-span-2">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={flow} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Line type="monotone" dataKey="flow" stroke="var(--info)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="pressure" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard title="Reservoirs">
          <ul className="space-y-3">
            {reservoirs.map((r) => (
              <li key={r.name}>
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><StatusDot tone={r.status as any} />{r.name}</span>
                  <span className="tabular-nums text-muted-foreground">{r.level}%</span>
                </div>
                <Progress value={r.level} className="mt-1 h-1.5" />
                <p className="mt-0.5 text-[10px] text-muted-foreground">Capacity {r.capacity}</p>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="AI Leak Detection" description="Flow anomaly · pressure delta · acoustic">
          <ul className="space-y-2">
            {leaks.map((l) => (
              <li key={l.id} className="rounded-md border border-border/40 bg-secondary/30 p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium">{l.id} · {l.loc}</span>
                  <Badge variant="outline" className="text-[10px]">{l.prob}%</Badge>
                </div>
                <p className="mt-0.5 text-[10px] text-muted-foreground">{l.est}</p>
                <Progress value={l.prob} className="mt-1 h-1" />
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Water Quality">
          <ul className="space-y-2">
            {quality.map((q) => (
              <li key={q.name} className="flex items-center justify-between rounded border border-border/40 bg-secondary/30 px-3 py-2 text-xs">
                <span className="flex items-center gap-2"><StatusDot tone={q.ok ? "success" : "destructive"} />{q.name}</span>
                <span className="tabular-nums font-semibold">{q.v}</span>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Community Access · Queue length">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={access} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="point" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="queue" fill="var(--info)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground"><Users className="h-3 w-3" /> 8 active points · ~127 households served</p>
        </PanelCard>
      </div>
    </CommandLayout>
  );
}