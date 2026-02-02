export type TaskStatus = "P" | "E" | "C";
export interface Task {
  id_task: string;
  title: string;
  description: string;
  status: TaskStatus;
  id_user: string;
}
