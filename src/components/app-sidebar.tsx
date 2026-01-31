"use client";

import { LayoutDashboard, ListTodo, ListCheck, LogOut } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

import useAuth from "@/hooks/auth";
import { ConfirmModal } from "./modal-confirm";

const items = [
  {
    title: "Dashboard",
    url: "dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Tarefas",
    url: "tasks",
    icon: ListTodo,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
  }
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup className="gap-4">
          <SidebarGroupLabel>
            <div className="flex flex-row gap-2 py-1.5 w-full items-center font-bold text-black">
              <ListCheck />
              Task Manager
            </div>
          </SidebarGroupLabel>

          <hr className="border border-gray-300" />

          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className="data-[active=false]:text-black/90 data-[active=true]:font-bold"
                      data-active={pathname === `/${item.url}`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              {/* 🔴 Logout */}
              <SidebarMenuItem>
                <ConfirmModal
                  displayButton={
                    <SidebarMenuButton className="text-red-600 hover:bg-red-50 hover:text-red-700">
                      <LogOut />
                      <span>Sair</span>
                    </SidebarMenuButton>
                  }
                  title="Are you sure you want to logout?"
                  description="You will need to login again to access your account."
                  onConfirm={handleLogout}
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
