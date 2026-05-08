import { useMemo } from "react";
import { cn } from "@/lib/utils";

type Node = {
  x: number;
  y: number;
  type: "water" | "solar" | "waste" | "sensor" | "alert";
  label: string;
  status?: "ok" | "warn" | "crit";
};

const nodes: Node[] = [
  { x: 14, y: 22, type: "solar", label: "Soweto East Microgrid", status: "ok" },
  { x: 28, y: 38, type: "water", label: "Reservoir K-12", status: "ok" },
  { x: 41, y: 30, type: "sensor", label: "Sensor cluster A", status: "ok" },
  { x: 36, y: 58, type: "waste", label: "Collection hub Laini", status: "warn" },
  { x: 56, y: 44, type: "alert", label: "Pipe rupture B-19", status: "crit" },
  { x: 64, y: 26, type: "solar", label: "Kibera Hill Array", status: "ok" },
  { x: 72, y: 60, type: "water", label: "Purification node 7", status: "warn" },
  { x: 82, y: 36, type: "sensor", label: "Flood sensor F-3", status: "ok" },
  { x: 50, y: 70, type: "waste", label: "Recycling station 4", status: "ok" },
  { x: 22, y: 70, type: "sensor", label: "Air quality node", status: "ok" },
  { x: 88, y: 72, type: "alert", label: "Transformer overload T-9", status: "crit" },
  { x: 60, y: 80, type: "solar", label: "Community array C-2", status: "ok" },
];

const colorFor = (n: Node) => {
  if (n.status === "crit") return "var(--destructive)";
  if (n.status === "warn") return "var(--warning)";
  switch (n.type) {
    case "water": return "var(--info)";
    case "solar": return "var(--warning)";
    case "waste": return "var(--accent)";
    case "sensor": return "var(--primary)";
    default: return "var(--primary)";
  }
};

export function InfraMap({ className }: { className?: string }) {
  const grid = useMemo(() => Array.from({ length: 12 }), []);
  return (
    <div className={cn("relative h-full w-full overflow-hidden rounded-md border border-border/60 bg-[oklch(0.13_0.02_240)]", className)}>
      {/* grid */}
      <svg className="absolute inset-0 h-full w-full opacity-40" preserveAspectRatio="none" viewBox="0 0 100 100">
        <defs>
          <pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse">
            <path d="M 8 0 L 0 0 0 8" fill="none" stroke="oklch(0.30 0.03 240)" strokeWidth="0.15" />
          </pattern>
          <radialGradient id="glow" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="oklch(0.78 0.18 180 / 0.18)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect width="100" height="100" fill="url(#glow)" />
        <rect width="100" height="100" fill="url(#grid)" />
        {/* "rivers"/pipelines */}
        <path d="M0,40 C20,30 40,55 60,45 S90,55 100,40" stroke="oklch(0.70 0.15 230 / 0.5)" strokeWidth="0.4" fill="none" strokeDasharray="1.2 1.2" />
        <path d="M10,80 C30,70 50,75 70,65 S95,55 100,60" stroke="oklch(0.78 0.18 180 / 0.4)" strokeWidth="0.3" fill="none" />
        <path d="M5,15 L25,30 L45,20 L70,40 L95,25" stroke="oklch(0.65 0.20 280 / 0.35)" strokeWidth="0.3" fill="none" strokeDasharray="0.8 0.8" />
      </svg>
      {nodes.map((n, i) => (
        <div
          key={i}
          className="group absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div
            className={cn("h-2.5 w-2.5 rounded-full ring-2 ring-background", n.status === "crit" && "pulse-dot")}
            style={{ backgroundColor: colorFor(n), boxShadow: `0 0 12px ${colorFor(n)}` }}
          />
          <div className="pointer-events-none absolute left-3 top-3 z-10 hidden whitespace-nowrap rounded border border-border/60 bg-popover px-2 py-1 text-[10px] text-popover-foreground shadow-elevated group-hover:block">
            {n.label}
          </div>
        </div>
      ))}
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 rounded-md border border-border/60 bg-card/80 px-2 py-1 text-[10px] text-muted-foreground backdrop-blur">
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-info" />Water</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-warning" />Solar</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-accent" />Waste</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-primary" />Sensor</span>
        <span className="flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-destructive" />Alert</span>
      </div>
      <div className="absolute right-2 top-2 rounded-md border border-border/60 bg-card/80 px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground backdrop-blur">
        Kibera Pilot · Live GIS
      </div>
    </div>
  );
}