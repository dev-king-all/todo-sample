export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  file_path?: string;
}
