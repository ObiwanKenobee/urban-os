import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard } from "@/components/command/widgets";
import { TrendingUp, Leaf, Coins, Users } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics · NEXUS" }, { name: "description", content: "Resource flows, sustainability KPIs and operational trends." }] }),
  component: AnalyticsPage,
});

const trend = Array.from({ length: 30 }, (_, i) => ({
  d: `D${i + 1}`,
  water: 380 + Math.sin(i / 4) * 40 + Math.random() * 12,
  energy: 240 + Math.cos(i / 5) * 60,
  waste: 150 + Math.sin(i / 6) * 30,
}));

const sustain = [
  { name: "CO₂ avoided", v: 124 },
  { name: "Water saved", v: 89 },
  { name: "Recycled", v: 38 },
  { name: "Renewables", v: 71 },
];

function AnalyticsPage() {
  return (
    <CommandLayout title="Analytics & Sustainability KPIs" subtitle="30-day trends · regenerative impact metrics">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Efficiency Index" value="84.2" delta={3.4} icon={TrendingUp} tone="primary" />
        <MetricCard label="CO₂ Avoided" value="124" unit="t" delta={6.1} icon={Leaf} tone="success" />
        <MetricCard label="Operational Cost" value="−18%" hint="vs baseline" icon={Coins} tone="info" />
        <MetricCard label="People Served" value="42,180" delta={1.4} icon={Users} tone="accent" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Resource Flow Trends · 30d" className="lg:col-span-2">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ left: -20, right: 8 }}>
                <defs>
                  <linearGradient id="ta" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--info)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--info)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="tb" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--warning)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--warning)" stopOpacity={0} /></linearGradient>
                  <linearGradient id="tc" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity={0.5} /><stop offset="100%" stopColor="var(--accent)" stopOpacity={0} /></linearGradient>
                </defs>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="d" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Area type="monotone" dataKey="water" stroke="var(--info)" fill="url(#ta)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="energy" stroke="var(--warning)" fill="url(#tb)" strokeWidth={1.5} />
                <Area type="monotone" dataKey="waste" stroke="var(--accent)" fill="url(#tc)" strokeWidth={1.5} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>

        <PanelCard title="Regenerative Impact">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sustain} layout="vertical" margin={{ left: 10, right: 10 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" horizontal={false} />
                <XAxis type="number" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} width={80} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="v" fill="var(--success)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>
    </CommandLayout>
  );
}