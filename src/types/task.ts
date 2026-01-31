export interface Task {
  id_task: string;
  title: string;
  description: string;
  status: string;
  id_user: string;
}

export type TaskStatus = "P" | "E" | "C";
