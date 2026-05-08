import { createFileRoute } from "@tanstack/react-router";
import { CommandLayout } from "@/components/command/Layout";
import { MetricCard, PanelCard, StatusDot } from "@/components/command/widgets";
import { Siren, Megaphone, Truck, ShieldAlert } from "lucide-react";
import { InfraMap } from "@/components/command/InfraMap";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/emergency")({
  head: () => ({ meta: [{ title: "Emergency Ops · NEXUS" }, { name: "description", content: "Crisis coordination & infrastructure failure response." }] }),
  component: EmergencyPage,
});

const incidents = [
  { id: "INC-091", title: "Pipe rupture · Sector B-19", sev: "Critical", eta: "Crew dispatched · 6 min", tone: "destructive" },
  { id: "INC-090", title: "Transformer overload T-9", sev: "High", eta: "Load shed engaged", tone: "warning" },
  { id: "INC-089", title: "Flood pulse · Zone 4 sensors", sev: "Medium", eta: "Monitoring", tone: "warning" },
  { id: "INC-088", title: "Microgrid C-2 frequency drift", sev: "High", eta: "Stabilizing", tone: "destructive" },
];

const dispatch = [
  { team: "Repair Alpha", role: "Pipe crew", to: "B-19", eta: "6 min" },
  { team: "Mobile water unit MW-2", role: "Backup supply", to: "Soweto E.", eta: "22 min" },
  { team: "Backup generator G-3", role: "Energy", to: "Health clinic", eta: "Online" },
  { team: "Sanitation rapid", role: "Spill containment", to: "B-19", eta: "12 min" },
];

function EmergencyPage() {
  return (
    <CommandLayout title="Emergency Infrastructure Response" subtitle="Crisis coordination · dispatch · public alerting">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <MetricCard label="Active Incidents" value="4" hint="2 critical" icon={Siren} tone="destructive" />
        <MetricCard label="Avg Response" value="8.4" unit="min" delta={-14.2} icon={Truck} tone="success" />
        <MetricCard label="Cascading Risk" value="Med" hint="AI: 1 chained event possible" icon={ShieldAlert} tone="warning" />
        <MetricCard label="Public Alerts Sent" value="3" hint="Today · 2 districts" icon={Megaphone} tone="info" />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <PanelCard title="Incident Map · Live" className="lg:col-span-2 min-h-[420px]">
          <div className="h-[380px]"><InfraMap /></div>
        </PanelCard>

        <PanelCard title="Active Incidents">
          <ul className="space-y-2">
            {incidents.map((i) => (
              <li key={i.id} className="rounded-md border border-border/40 bg-secondary/30 p-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2"><StatusDot tone={i.tone as any} />{i.id}</span>
                  <Badge variant="outline" className="text-[10px]">{i.sev}</Badge>
                </div>
                <p className="mt-1 text-xs font-medium">{i.title}</p>
                <p className="text-[10px] text-muted-foreground">{i.eta}</p>
              </li>
            ))}
          </ul>
        </PanelCard>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <PanelCard title="Dispatch Coordination">
          <ul className="space-y-2">
            {dispatch.map((d) => (
              <li key={d.team} className="flex items-center justify-between rounded-md border border-border/40 bg-secondary/30 px-3 py-2 text-xs">
                <div>
                  <p className="font-medium">{d.team}</p>
                  <p className="text-[10px] text-muted-foreground">{d.role} → {d.to}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{d.eta}</Badge>
              </li>
            ))}
          </ul>
        </PanelCard>

        <PanelCard title="Community Alert Composer" description="Push notifications to affected zones">
          <div className="space-y-3 text-xs">
            <div className="rounded-md border border-warning/40 bg-warning/5 p-3">
              <p className="font-medium">Draft · Water outage · B-19</p>
              <p className="mt-1 text-[11px] text-muted-foreground">"Estimated restoration by 18:00. Mobile water unit deployed at Soweto East access point."</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" className="h-7 text-xs">Send to 1,240 residents</Button>
                <Button size="sm" variant="outline" className="h-7 text-xs">Edit</Button>
              </div>
            </div>
            <div className="rounded-md border border-border/60 bg-secondary/30 p-3">
              <p className="font-medium">Sent · Power instability advisory</p>
              <p className="mt-1 text-[11px] text-muted-foreground">Delivered to 2,418 residents · 14m ago</p>
            </div>
          </div>
        </PanelCard>
      </div>
    </CommandLayout>
  );
}