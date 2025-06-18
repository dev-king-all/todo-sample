"use client";
import { Todo } from "@/types/todo";
import { TodoCard } from "./ToDoCard";
import { useState } from "react";
import { useTodoStore } from "@/store/todoStore";
export default function TasksList({
  todos,
  completed,
}: {
  todos: Todo[];
  completed?: boolean;
}) {
  const color = completed ? "green" : "blue";
  const [fileInputs, setFileInputs] = useState<Record<number, File | null>>({});
  const { updateTodo, deleteTodo, uploadFile } = useTodoStore();
  const handleToggleComplete = async (id: number, completed: boolean) => {
    await updateTodo(id, { completed: !completed });
  };

  const handleFileChange = (
    id: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFileInputs({ ...fileInputs, [id]: e.target.files[0] });
    }
  };

  const handleFileUpload = async (id: number) => {
    const file = fileInputs[id];
    if (!file) return;

    await uploadFile(id, file);
    setFileInputs({ ...fileInputs, [id]: null });
  };
  return (
    <div className={`bg-${color}-50 rounded-lg p-6`}>
      <h2
        className={`text-xl font-semibold text-${color}-800 mb-4 flex items-center`}
      >
        <span className={`w-3 h-3 bg-${color}-500 rounded-full mr-2`} />
        {completed ? "Completed" : "Pending"} Tasks
        <span className="ml-2 bg-${color}-100 text-${color}-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {todos.length}
        </span>
      </h2>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            onToggle={() => handleToggleComplete(todo.id, todo.completed)}
            onDelete={() => deleteTodo(todo.id)}
            onFileChange={(e) => handleFileChange(todo.id, e)}
            onFileUpload={() => handleFileUpload(todo.id)}
            fileInput={fileInputs[todo.id]}
            completed = {completed}
          />
        ))}

        {todos.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No {completed ? "completed" : "pending"} tasks
          </div>
        )}
      </div>
    </div>
  );
}
