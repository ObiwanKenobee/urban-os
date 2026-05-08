import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Bell, Search, Wifi } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function CommandLayout({ children, title, subtitle }: { children: ReactNode; title: string; subtitle?: string }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        <AppSidebar />
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur">
            <SidebarTrigger />
            <div className="flex flex-col leading-tight">
              <h1 className="text-sm font-semibold tracking-tight">{title}</h1>
              {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
            </div>
            <div className="ml-auto flex items-center gap-3">
              <div className="relative hidden md:block">
                <Search className="absolute left-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search assets, zones, sensors..." className="h-8 w-64 pl-7 text-xs" />
              </div>
              <Badge variant="outline" className="gap-1.5 border-success/40 text-success">
                <span className="pulse-dot inline-block h-1.5 w-1.5 rounded-full bg-success" />
                LIVE
              </Badge>
              <Wifi className="h-4 w-4 text-muted-foreground" />
              <Bell className="h-4 w-4 text-muted-foreground" />
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-[10px] font-semibold">OP</div>
            </div>
          </header>
          <main className="flex-1 overflow-x-hidden p-4 md:p-6" style={{ backgroundImage: "var(--gradient-glow)" }}>
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}