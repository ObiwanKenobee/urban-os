import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Droplets,
  Sun,
  Trash2,
  Radio,
  Wrench,
  Siren,
  BarChart3,
  Settings,
  Activity,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";

const modules = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Water", url: "/water", icon: Droplets },
  { title: "Energy", url: "/energy", icon: Sun },
  { title: "Waste", url: "/waste", icon: Trash2 },
  { title: "Sensors", url: "/sensors", icon: Radio },
  { title: "Maintenance", url: "/maintenance", icon: Wrench },
  { title: "Emergency Ops", url: "/emergency", icon: Siren },
  { title: "Analytics", url: "/analytics", icon: BarChart3 },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "var(--gradient-primary)" }}>
            <Activity className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="flex flex-col leading-tight group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight text-sidebar-foreground">NEXUS · Infra</span>
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground">Command Center</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Modules</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {modules.map((m) => {
                const active = m.url === "/" ? path === "/" : path.startsWith(m.url);
                return (
                  <SidebarMenuItem key={m.url}>
                    <SidebarMenuButton asChild isActive={active}>
                      <Link to={m.url} className="flex items-center gap-2">
                        <m.icon className="h-4 w-4" />
                        <span>{m.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}