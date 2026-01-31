export interface TaskCounter {
  label: string;
  value: number;
}

export interface User {
  name: string;
  last_name: string;
  created_at: Date;
  status: string;
  email: string;
  password: string;
  tasks?: TaskCounter[];
}
