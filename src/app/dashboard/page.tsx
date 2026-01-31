"use client";

import { StatusCard } from "@/components/status-card";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import DashboardSkeleton from "./loading";
import UserDataRadarChart from "./radarChart";
import useDashboard from "@/hooks/dashboard";

export default function Dashboard() {
  const { user, isLoading, isError, isSuccess } = useDashboard();

  if (isLoading) return <DashboardSkeleton />;

  if (isError)
    return (
      <SidebarProvider>
        <AppSidebar />
        <section className="flex flex-col w-full">
          <header className="flex flex-row w-full p-4 justify-between border-b border-gray-300">
            <SidebarTrigger className="md:hidden" />
            <p className="font-semibold text-[16px]">
              Visualize your data in an organized way
            </p>
          </header>
          <main className="flex flex-col w-fit justify-center items-center my-auto mx-auto bg-red-500 p-4 rounded">
            <h1 className="mx-auto font-extrabold text-4xl">
              An error has occurred
            </h1>
          </main>
        </section>
      </SidebarProvider>
    );

  if (isSuccess)
    return (
      <SidebarProvider>
        <AppSidebar />
        <section className="flex flex-col w-full">
          <header className="flex flex-row w-full p-4 justify-between border-b border-gray-300">
            <SidebarTrigger className="md:hidden" />
            <p className="font-semibold text-[16px]">Alguns dos seus dados</p>
          </header>
          <main className="flex flex-col p-4 gap-3">
            <h1 className="text-[16px]">
              Hello,{" "}
              <span className="font-bold">
                {user?.name} {user?.last_name}
              </span>
            </h1>
            <p>
              Aqui estão alguns dos seus números no{" "}
              <span className="font-bold">Task Manager</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
              <div className="grid grid-cols-3 md:grid-cols-1 md:col-span-1 gap-3 w-full">
                {user?.tasks?.map((task) => (
                  <StatusCard
                    key={task.label}
                    label={task.label}
                    value={task.value}
                  />
                ))}
              </div>

              <div className="grid md:col-span-2 w-full overflow-x-scroll scrollbar-hide">
                <div className="flex flex-col rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition w-full justify-center items-center">
                  <h3 className="mb-3 text-sm font-medium text-gray-600 w-full justify-start items-start">
                    Performance do usuário
                  </h3>
                  <UserDataRadarChart data={user?.tasks || []} />
                </div>
              </div>
            </div>
          </main>
        </section>
      </SidebarProvider>
    );
}
