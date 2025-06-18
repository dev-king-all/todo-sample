"use client";
import { useTodoStore } from "../store/todoStore";
import { useEffect } from "react";
import AddToDoForm from "@/components/AddToDoForm";
import TasksList from "@/components/TasksList";

export default function Home() {
  const { todos, loading, getTodos } = useTodoStore();

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  if (loading && todos.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Todo Kanban</h1>

        {/* Add Todo Form */}
        <AddToDoForm />

        {/* Kanban Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Pending Column */}
          <TasksList todos={todos.filter((t) => !t.completed)} />

          {/* Completed Column */}
          <TasksList todos={todos.filter((t) => t.completed)} completed />
        </div>
      </div>
    </div>
  );
}
