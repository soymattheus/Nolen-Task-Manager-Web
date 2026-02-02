import { useSpinner } from "@/components/spinner";
import { Task } from "@/types/task";
import React from "react";
import { toast } from "sonner";

export default function useTask() {
  const { setShowSpinner } = useSpinner();
  const [tasks, setTasks] = React.useState<Task[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [isError, setIsError] = React.useState<boolean>(false);
  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);
  const [editingTask, setEditingTask] = React.useState<Task>();
  const [modalOpen, setModalOpen] = React.useState(false);

  const getData = async ({
    page = "",
    limit = "100",
    status = "",
  }: {
    page?: string;
    limit?: string;
    status?: string;
  }) => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetch(
        `/api/task?page=${page}&limit=${limit}&status=${status}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok) {
        setIsLoading(false);
        setIsError(true);
        toast.error(
          res.statusText || "Erro ao carregar suas tarefas. Tente novamente.",
        );
        return;
      }

      const data = await res.json();
      setTasks(data.tasks?.data || []);
      setIsLoading(false);
      setIsSuccess(true);
    } catch {
      toast.error("Error interno do servidor.");
      setIsError(true);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    getData({});
  }, []);

  async function handleSave(data: Omit<Task, "id_task" | "id_user">) {
    try {
      setShowSpinner(true);
      if (editingTask) {
        // UPDATE
        try {
          const { id_task, title, description, status } = editingTask;
          const payload = { title, description, status };

          const res = await fetch(`/api/task/${id_task}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          if (!res.ok) {
            toast.error(
              res.statusText ||
                "Erro ao atualizar sua tarefa. Tente novamente.",
            );
            return;
          }

          setTasks(
            tasks?.map((task) => {
              if (task.id_task === editingTask.id_task) {
                return { ...task, ...data };
              }
              return task;
            }) || null,
          );
          toast.success("Tarefa atualizada com sucesso!");
          setModalOpen(false);
        } catch {
          toast.error("Error interno do servidor.");
        } finally {
          setShowSpinner(false);
          setEditingTask(undefined);
        }
      } else {
        // CREATE
        try {
          const res = await fetch(`/api/task`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!res.ok) {
            toast.error(
              res.statusText || "Erro ao criar sua tarefa. Tente novamente.",
            );
            return;
          }

          const task = await res.json();

          setTasks([...(tasks || []), task?.task]);
          toast.success("Tarefa criada com sucesso!");
          setModalOpen(false);
        } catch {
          toast.error("Error interno do servidor.");
        } finally {
          setShowSpinner(false);
          setEditingTask(undefined);
        }
      }
    } catch {
      toast.error("Internal server error.");
    }
  }

  const deleteTask = async (taskId: string) => {
    setShowSpinner(true);
    try {
      const res = await fetch(`/api/task/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        toast.error(
          res.statusText || "Erro ao deletar sua tarefa. Tente novamente.",
        );
        return;
      }

      const data = tasks?.filter((task) => task.id_task !== taskId) || null;
      setTasks(data);
      toast.success("Tarefa deletada com sucesso!");
    } catch {
      toast.error("Error interno do servidor.");
    } finally {
      setShowSpinner(false);
    }
  };

  return {
    tasks,
    getData,
    isLoading,
    isError,
    isSuccess,
    handleSave,
    editingTask,
    setEditingTask,
    deleteTask,
    modalOpen,
    setModalOpen,
  };
}
