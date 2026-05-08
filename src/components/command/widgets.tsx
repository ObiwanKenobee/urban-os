import { ReactNode } from "react";
import { Card } from "@/components/ui/card";
import { ArrowDown, ArrowUp, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function MetricCard({
  label,
  value,
  unit,
  delta,
  icon: Icon,
  tone = "primary",
  hint,
}: {
  label: string;
  value: string | number;
  unit?: string;
  delta?: number;
  icon?: LucideIcon;
  tone?: "primary" | "success" | "warning" | "destructive" | "info" | "accent";
  hint?: string;
}) {
  const toneClass: Record<string, string> = {
    primary: "text-primary",
    success: "text-success",
    warning: "text-warning",
    destructive: "text-destructive",
    info: "text-info",
    accent: "text-accent",
  };
  const positive = (delta ?? 0) >= 0;
  return (
    <Card className="relative overflow-hidden border-border/60 bg-card/60 p-4 backdrop-blur transition hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">{label}</p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className={cn("text-2xl font-semibold tabular-nums", toneClass[tone])}>{value}</span>
            {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
          </div>
          {hint && <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>}
        </div>
        {Icon && (
          <div className={cn("rounded-md border border-border/60 bg-secondary/40 p-2", toneClass[tone])}>
            <Icon className="h-4 w-4" />
          </div>
        )}
      </div>
      {delta !== undefined && (
        <div className={cn("mt-3 flex items-center gap-1 text-[11px] font-medium", positive ? "text-success" : "text-destructive")}>
          {positive ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
          {Math.abs(delta)}% vs last 24h
        </div>
      )}
    </Card>
  );
}

export function PanelCard({
  title,
  action,
  children,
  className,
  description,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  description?: string;
}) {
  return (
    <Card className={cn("flex flex-col overflow-hidden border-border/60 bg-card/60 backdrop-blur", className)}>
      <div className="flex items-start justify-between gap-3 border-b border-border/60 px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
          {description && <p className="mt-0.5 text-[11px] text-muted-foreground">{description}</p>}
        </div>
        {action}
      </div>
      <div className="flex-1 p-4">{children}</div>
    </Card>
  );
}

export function StatusDot({ tone = "success" }: { tone?: "success" | "warning" | "destructive" | "info" | "muted" }) {
  const map: Record<string, string> = {
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
    info: "bg-info",
    muted: "bg-muted-foreground",
  };
  return <span className={cn("inline-block h-2 w-2 rounded-full", map[tone], tone !== "muted" && "pulse-dot")} />;
}

export function SectionTitle({ children, kicker }: { children: ReactNode; kicker?: string }) {
  return (
    <div className="mb-4">
      {kicker && <p className="text-[11px] font-medium uppercase tracking-widest text-primary/80">{kicker}</p>}
      <h2 className="text-xl font-semibold tracking-tight">{children}</h2>
    </div>
  );
}