import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { Radio, Cpu, Signal, Battery } from "lucide-react";
import { InfraMap } from "@/components/command/InfraMap";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/sensors")({
  head: () => ({ meta: [{ title: "IoT Operations · NEXUS" }, { name: "description", content: "Sensor uptime, telemetry, edge AI processing." }] }),
  component: SensorsPage,
});

const latency = Array.from({ length: 30 }, (_, i) => ({ t: i, ms: 80 + Math.sin(i / 3) * 30 + Math.random() * 20 }));

const fleet = [
  { id: "ENV-014", type: "Air quality", status: "ok", batt: 92, sig: -64 },
  { id: "WTR-022", type: "Flow meter", status: "ok", batt: 71, sig: -72 },
  { id: "ENG-008", type: "Smart meter", status: "warn", batt: 38, sig: -88 },
  { id: "MOB-031", type: "Mobility", status: "ok", batt: 88, sig: -60 },
  { id: "FLD-003", type: "Flood sensor", status: "crit", batt: 12, sig: -101 },
  { id: "EDG-002", type: "Edge AI Jetson", status: "ok", batt: 100, sig: -55 },
];

function SensorsPage() {
  return (
    <CommandLayout title="IoT & Sensor Operations" subtitle="Telemetry · uptime · edge AI synchronization">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Sensors Online" value="1,284" unit="/1,312" delta={0.4} icon={Radio} tone="success" />
        <MetricCard label="Avg Latency" value="92" unit="ms" delta={-3.1} icon={Signal} tone="primary" />
        <MetricCard label="Edge Nodes" value="18" hint="2 syncing" icon={Cpu} tone="info" />
        <MetricCard label="Low Battery" value="42" hint="< 25% charge" icon={Battery} tone="warning" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Sensor Network Map" className="lg:col-span-2 min-h-[420px]">
          <div className="h-[380px]"><InfraMap /></div>
        </PanelCard>
        <PanelCard title="Telemetry Latency · last 30 min">
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={latency} margin={{ left: -20, right: 8 }}>
                <CartesianGrid stroke="var(--border)" strokeDasharray="2 4" vertical={false} />
                <XAxis dataKey="t" tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ background: "var(--popover)", border: "1px solid var(--border)", borderRadius: 8, fontSize: 11 }} />
                <Line type="monotone" dataKey="ms" stroke="var(--primary)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </PanelCard>
      </div>

      <div className="mt-4">
        <PanelCard title="Device Fleet" description="AI-predicted health signals across the active sensor population">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead className="text-left text-[10px] uppercase tracking-widest text-muted-foreground">
                <tr><th className="px-2 py-2">Device</th><th>Type</th><th>Status</th><th>Battery</th><th>Signal</th><th>AI Health</th></tr>
              </thead>
              <tbody>
                {fleet.map((d) => (
                  <tr key={d.id} className="border-t border-border/40">
                    <td className="px-2 py-2 font-mono">{d.id}</td>
                    <td>{d.type}</td>
                    <td><span className="inline-flex items-center gap-1.5"><StatusDot tone={d.status as any} />{d.status}</span></td>
                    <td className="tabular-nums">{d.batt}%</td>
                    <td className="tabular-nums">{d.sig} dBm</td>
                    <td>
                      <Badge variant="outline" className="text-[10px]">
                        {d.status === "crit" ? "Failure imminent" : d.status === "warn" ? "Maintenance soon" : "Nominal"}
                      </Badge>
                    </td>
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