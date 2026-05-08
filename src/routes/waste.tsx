import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { Trash2, Truck, Recycle, MapPin } from "lucide-react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/waste")({
  head: () => ({ meta: [{ title: "Waste Routing · NEXUS" }, { name: "description", content: "Smart sanitation routing & recycling intelligence." }] }),
  component: WastePage,
});

const trucks = [
  { id: "TRK-01", route: "Route A · Soweto", progress: 82, eta: "12 min", status: "ok" },
  { id: "TRK-02", route: "Route B · Laini", progress: 41, eta: "38 min", status: "warn" },
  { id: "TRK-03", route: "Route C · Olympic", progress: 96, eta: "3 min", status: "ok" },
  { id: "TRK-04", route: "Route D · Hillside", progress: 12, eta: "1h 4m", status: "warn" },
  { id: "TRK-05", route: "Emergency · B-19 spill", progress: 0, eta: "Dispatch", status: "crit" },
];

const categories = [
  { name: "Organic", value: 42, fill: "var(--success)" },
  { name: "Plastic", value: 24, fill: "var(--info)" },
  { name: "Paper", value: 14, fill: "var(--warning)" },
  { name: "Metal", value: 8, fill: "var(--accent)" },
  { name: "E-waste", value: 4, fill: "var(--destructive)" },
  { name: "Other", value: 8, fill: "var(--muted-foreground)" },
];

const zones = Array.from({ length: 10 }, (_, i) => ({ z: `Z-${i + 1}`, density: Math.floor(20 + Math.random() * 80) }));

function WastePage() {
  return (
    <CommandLayout title="Waste Routing Optimization" subtitle="AI logistics · heatmaps · recycling intelligence">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Trucks Active" value="5" hint="1 emergency dispatch" icon={Truck} tone="primary" />
        <MetricCard label="Routes Done" value="92%" delta={4.1} icon={MapPin} tone="success" />
        <MetricCard label="Tonnage Today" value="184t" delta={-2.4} icon={Trash2} tone="accent" />
        <MetricCard label="Recovery Rate" value="38%" delta={3.1} icon={Recycle} tone="info" hint="Circular economy KPI" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Live Fleet Status" className="lg:col-span-2">
          <ul className="space-y-2">
            {trucks.map((t) => (
              <li key={t.id} className="rounded-md border border-border/40 bg-secondary/30 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><StatusDot tone={t.status as any} /><strong>{t.id}</strong> · {t.route}</span>
                  <Badge variant="outline" className="text-[10px]">ETA {t.eta}</Badge>
                </div>
                <Progress value={t.progress} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Waste Composition">
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categories} dataKey="value" innerRadius={50} outerRadius={80} stroke="var(--background)" strokeWidth={2}>
                  {categories.map((c, i) => <Cell key={i} fill={c.fill} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1 text-[11px]">
            {categories.map((c) => (
              <div key={c.name} className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: c.fill }} />
                <span className="text-muted-foreground">{c.name}</span>
                <span className="ml-auto tabular-nums">{c.value}%</span>
              </div>
            ))}
          </div>
        </PanelCard>
      </div>

      <div className="mt-4">
        <PanelCard title="Zone Density Heatmap" description="Real-time waste accumulation by zone (kg/m²)">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={zones} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="z" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Bar dataKey="density" radius={[4, 4, 0, 0]}>
                  {zones.map((z, i) => (
                    <Cell key={i} fill={z.density > 70 ? "var(--destructive)" : z.density > 40 ? "var(--warning)" : "var(--success)"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>
    </CommandLayout>
  );
}