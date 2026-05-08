import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { Wrench, Clock, ShieldAlert, Boxes } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/maintenance")({
  head: () => ({ meta: [{ title: "Maintenance AI · NEXUS" }, { name: "description", content: "Predictive maintenance & risk-prioritized work orders." }] }),
  component: MaintPage,
});

const predictions = [
  { asset: "Pump P-22", risk: 92, eta: "38h", impact: "5,200 households", domain: "Water" },
  { asset: "Transformer T-9", risk: 81, eta: "3d", impact: "Health clinic + 14 streetlights", domain: "Energy" },
  { asset: "Solar string SS-04", risk: 64, eta: "11d", impact: "−12 kW peak output", domain: "Energy" },
  { asset: "Pipe segment B-19", risk: 96, eta: "Active", impact: "Critical · ongoing leak", domain: "Water" },
  { asset: "Compactor unit CU-02", risk: 47, eta: "21d", impact: "Route delay risk", domain: "Waste" },
];

const orders = [
  { id: "WO-1042", title: "Replace gasket · Pump P-22", tech: "M. Otieno", status: "In progress" },
  { id: "WO-1041", title: "Inspect transformer T-9", tech: "A. Wanjiku", status: "Scheduled" },
  { id: "WO-1040", title: "Sensor F-3 battery swap", tech: "K. Mwangi", status: "Done" },
  { id: "WO-1039", title: "Solar string clean SS-04", tech: "Crew C", status: "Scheduled" },
];

function MaintPage() {
  return (
    <CommandLayout title="Infrastructure Maintenance AI" subtitle="Predictive engine · work orders · risk prioritization">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Open Work Orders" value="28" delta={-8} icon={Wrench} tone="primary" />
        <MetricCard label="Avg Time to Repair" value="4.2h" delta={-12.4} icon={Clock} tone="success" />
        <MetricCard label="High-Risk Assets" value="7" hint="Action required" icon={ShieldAlert} tone="destructive" />
        <MetricCard label="Spare Parts" value="92%" hint="Inventory healthy" icon={Boxes} tone="info" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Predictive Failure Engine" description="Risk × population impact × failure probability" className="lg:col-span-2">
          <ul className="space-y-2">
            {predictions.map((p) => (
              <li key={p.asset} className="rounded-md border border-border/40 bg-secondary/30 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2">
                    <StatusDot tone={p.risk > 85 ? "destructive" : p.risk > 60 ? "warning" : "info"} />
                    <strong>{p.asset}</strong>
                    <Badge variant="outline" className="text-[10px]">{p.domain}</Badge>
                  </span>
                  <span className="text-[10px] text-muted-foreground">ETA failure: {p.eta}</span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">Impact: {p.impact}</p>
                <Progress value={p.risk} className="mt-2 h-1.5" />
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Digital Twin" description="Stress-test virtual scenarios">
          <div className="space-y-3">
            <div className="rounded-md border border-primary/30 bg-primary/5 p-3">
              <p className="text-xs font-medium">Scenario: 24h heatwave + 18% demand spike</p>
              <p className="mt-1 text-[10px] text-muted-foreground">Twin predicts 2 transformer overloads, 1 reservoir at 11%</p>
              <Button size="sm" className="mt-2 h-7 text-xs">Run simulation</Button>
            </div>
            <div className="rounded-md border border-border/60 bg-secondary/30 p-3">
              <p className="text-xs font-medium">Scenario: Storm + flood pulse</p>
              <p className="mt-1 text-[10px] text-muted-foreground">14 sensors at risk · 1 microgrid island event</p>
            </div>
            <div className="rounded-md border border-border/60 bg-secondary/30 p-3">
              <p className="text-xs font-medium">Scenario: Population +12%</p>
              <p className="mt-1 text-[10px] text-muted-foreground">Capacity OK · waste routes saturate by week 3</p>
            </div>
          </div>
        </PanelCard>
      </div>

      <div className="mt-4">
        <PanelCard title="Work Orders Queue" action={<Button size="sm" className="h-7 text-xs">+ New order</Button>}>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr><th className="px-2 py-2">ID</th><th>Title</th><th>Technician</th><th>Status</th><th></th></tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id} className="border-t border-border/40">
                    <td className="px-2 py-2 font-mono">{o.id}</td>
                    <td>{o.title}</td>
                    <td className="text-muted-foreground">{o.tech}</td>
                    <td><Badge variant="outline" className="text-[10px]">{o.status}</Badge></td>
                    <td><Button variant="ghost" size="sm" className="h-7 text-xs">Open</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </PanelCard>
      </div>
    </CommandLayout>
  );
}