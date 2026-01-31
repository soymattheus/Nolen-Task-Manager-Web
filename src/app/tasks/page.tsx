"use client";

import React from "react";
import { toast } from "sonner";

import { TaskCard } from "./cardTask";
import { TaskModal } from "./taskModal";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/types/task";
import { AppSidebar } from "@/components/app-sidebar";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

import { STATUS_STYLES } from "@/config/status-config";

import TasksSkeleton from "./loading";
import useTask from "@/hooks/task";
import { mapStatus } from "../../../utils/mapStatus";
import { ConfirmModal } from "@/components/modal-confirm";

const statuses: TaskStatus[] = ["P", "E", "C"];

export default function Tasks() {
  const {
    tasks,
    isLoading,
    isError,
    isSuccess,
    handleSave,
    editingTask,
    setEditingTask,
    deleteTask,
  } = useTask();
  const [modalOpen, setModalOpen] = React.useState(false);

  if (isLoading) return <TasksSkeleton />;

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
            <p className="font-semibold text-[16px]">Sua lista de tarefas</p>
          </header>
          <main className="flex flex-col p-4">
            <div className="mb-6 flex items-center justify-between">
              <h1 className="text-xl font-semibold">Tarefas</h1>

              <Button onClick={() => setModalOpen(true)}>+ Nova Tarefa</Button>
            </div>

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              {statuses.map((status) => (
                <Card
                  key={status}
                  className={`border ${STATUS_STYLES[status].column}`}
                >
                  <CardHeader>
                    <CardTitle className="text-sm">
                      {mapStatus(status)}
                    </CardTitle>
                  </CardHeader>

                  <div className="space-y-3 p-3">
                    {tasks &&
                      tasks
                        .filter((task: Task) => task?.status === status)
                        .map((task: Task) => (
                          <TaskCard
                            key={task.id_task}
                            task={task}
                            onEdit={(task) => {
                              setEditingTask(task);
                              setModalOpen(true);
                            }}
                            onDelete={() => deleteTask(task.id_task)}
                          />
                        ))}
                  </div>
                </Card>
              ))}
            </div>

            <TaskModal
              open={modalOpen}
              onOpenChange={(open) => {
                setModalOpen(open);
                if (!open) setEditingTask(undefined);
              }}
              initialData={editingTask}
              onSave={handleSave}
            />
          </main>
        </section>
      </SidebarProvider>
    );
}
