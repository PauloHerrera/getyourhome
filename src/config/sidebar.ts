import { Building2, Users, Settings, PlusCircle, ListFilter, Home } from "lucide-react";

type IconComponent = React.ComponentType<{ className?: string }>;

export type SidebarItem = {
  role: string;
  title: string;
  href: string;
  icon: IconComponent;
};

const SIDEBAR_ITEMS: SidebarItem[] = [
  { role: "admin", title: "Dashboard", href: "/dashboard", icon: Home },
  {
    role: "admin",
    title: "Tipos de propriedades",
    href: "/dashboard/property-types",
    icon: Building2,
  },
  { role: "admin", title: "Configurações", href: "/dashboard/settings", icon: Settings },
  { role: "admin", title: "Usuários", href: "/dashboard/users", icon: Users },
  { role: "broker", title: "Dashboard", href: "/dashboard", icon: Home },
  { role: "broker", title: "Meus leads", href: "/dashboard/lead-requests", icon: ListFilter },
  { role: "broker", title: "Financeiro", href: "/dashboard/finance", icon: Users },
  { role: "broker", title: "Configurações", href: "/dashboard/settings", icon: Settings },
  { role: "lead", title: "Dashboard", href: "/dashboard", icon: Home },
  { role: "lead", title: "Meus anúncios", href: "/dashboard/my-requests", icon: ListFilter },
  { role: "lead", title: "Novo anúncio", href: "/dashboard/new-request", icon: PlusCircle },
];

export function getNavItems(role: string) {
  const items = SIDEBAR_ITEMS.filter((item) => item.role === role);

  return items;
}
