import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { Sun, Battery, Zap, CloudSun } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Bar, Line } from "recharts";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/energy")({
  head: () => ({ meta: [{ title: "Solar Microgrid · NEXUS" }, { name: "description", content: "Decentralized renewable infrastructure monitoring." }] }),
  component: EnergyPage,
});

const gen = Array.from({ length: 24 }, (_, i) => {
  const sun = Math.max(0, Math.sin(((i - 6) / 12) * Math.PI)) * 320;
  return { h: `${i}`, solar: Math.round(sun + Math.random() * 12), demand: 180 + Math.cos(i / 3) * 60, battery: 40 + (i * 2) % 60 };
});

const batteries = [
  { id: "BAT-A", soc: 84, health: 96, cycles: 412 },
  { id: "BAT-B", soc: 62, health: 91, cycles: 587 },
  { id: "BAT-C", soc: 41, health: 78, cycles: 1024 },
  { id: "BAT-D", soc: 92, health: 99, cycles: 88 },
];

const loads = [
  { name: "Residential", v: 38 },
  { name: "Health clinic", v: 22 },
  { name: "Schools", v: 14 },
  { name: "Water pumps", v: 18 },
  { name: "Streetlights", v: 8 },
];

function EnergyPage() {
  return (
    <CommandLayout title="Solar Microgrid Monitoring" subtitle="Generation · Distribution · Storage · Forecast">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Live Generation" value="284" unit="kW" delta={4.1} icon={Sun} tone="warning" />
        <MetricCard label="Demand" value="241" unit="kW" delta={-2.3} icon={Zap} tone="primary" />
        <MetricCard label="Battery Reserve" value="76" unit="%" delta={5.2} icon={Battery} tone="success" />
        <MetricCard label="Forecast Peak (16h)" value="412" unit="kW" hint="Cloud cover 18%" icon={CloudSun} tone="info" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Generation vs Demand · 24h" className="lg:col-span-2">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={gen} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="var(--warning)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--warning)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="h" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="solar" stroke="var(--warning)" fill="url(#sg)" strokeWidth={1.5} />
                <Line type="monotone" dataKey="demand" stroke="var(--primary)" strokeWidth={2} dot={false} />
                <Bar dataKey="battery" fill="var(--success)" opacity={0.4} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard title="Distribution Mix">
          <ul className="space-y-3">
            {loads.map((l) => (
              <li key={l.name}>
                <div className="flex items-center justify-between text-xs">
                  <span>{l.name}</span><span className="tabular-nums text-muted-foreground">{l.v}%</span>
                </div>
                <Progress value={l.v} className="mt-1 h-1.5" />
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {batteries.map((b) => (
          <PanelCard key={b.id} title={b.id} description={`${b.cycles} cycles · health ${b.health}%`}>
            <div className="flex items-end justify-between">
              <div>
                <div className="text-3xl font-semibold tabular-nums text-success">{b.soc}<span className="text-sm text-muted-foreground">%</span></div>
                <p className="text-[11px] text-muted-foreground">State of charge</p>
              </div>
              <Battery className="h-8 w-8 text-success/80" />
            </div>
            <Progress value={b.soc} className="mt-3 h-1.5" />
            <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
              <StatusDot tone={b.health > 90 ? "success" : b.health > 80 ? "warning" : "destructive"} />
              Degradation {100 - b.health}%
            </div>
          </PanelCard>
        ))}
      </div>
    </CommandLayout>
  );
}