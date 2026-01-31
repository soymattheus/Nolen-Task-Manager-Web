export interface UserTasks {
  label: string;
  value: number;
}

export interface User {
  name: string;
  created_at: Date;
  status: string;
  email: string;
  password: string;
  tasks?: UserTasks[];
}
