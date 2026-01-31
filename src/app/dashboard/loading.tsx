import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <section className="flex w-full flex-col">
        {/* Header */}
        <header className="flex flex-row w-full p-4 justify-between border-b border-gray-300">
          <SidebarTrigger className="md:hidden" />
          <p className="font-semibold text-[16px]">Alguns dos seus dados</p>
        </header>

        {/* Main */}
        <main className="flex flex-col p-4 gap-3">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-64" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 justify-center items-start gap-3 mx-auto w-full">
            {/* Status cards */}
            <div className="grid grid-cols-3 md:grid-cols-1 md:col-span-1 gap-3 w-full">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <Skeleton className="h-3 w-6 mb-2" />
                  <Skeleton className="h-6 w-12" />
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="grid md:col-span-2 w-full">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <Skeleton className="h-4 w-40 mb-4" />
                <Skeleton className="h-[220px] w-full rounded-md" />
              </div>
            </div>
          </div>
        </main>
      </section>
    </SidebarProvider>
  );
}
