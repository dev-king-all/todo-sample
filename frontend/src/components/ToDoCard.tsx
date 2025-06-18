"use client";
import { getFileUrl } from "@/services/todoService";
import { Todo } from "@/types/todo";

export function TodoCard({
  todo,
  onToggle,
  onDelete,
  onFileChange,
  onFileUpload,
  fileInput,
  completed = false,
}: {
  todo: Todo;
  onToggle: () => void;
  onDelete: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileUpload: () => void;
  fileInput?: File | null;
  completed?: boolean;
}) {
  return (
    <div
      className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${
        completed ? "border-green-500" : "border-blue-500"
      }`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3
            className={`font-medium ${
              completed ? "line-through text-gray-500" : "text-gray-800"
            }`}
          >
            {todo.title}
          </h3>
          {todo.description && (
            <p
              className={`text-sm mt-1 ${
                completed ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {todo.description}
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <button
            onClick={onToggle}
            className={`inline-flex items-center rounded-md border px-3 py-1 text-sm font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              completed
                ? "border-transparent bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500"
                : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-indigo-500"
            }`}
          >
            {completed ? "Completed ✓" : "Mark Complete"}
          </button>
          <button
            onClick={onDelete}
            className="inline-flex items-center rounded-md border border-transparent bg-red-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Delete
          </button>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments</h4>
        {todo.file_path && (
          <div className="mb-2">
            <a
              href={getFileUrl(todo.file_path)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-800 text-sm"
            >
              View attached file
            </a>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <input
            type="file"
            id={`file-${todo.id}`}
            onChange={onFileChange}
            accept=".pdf"
            className="hidden"
          />
          <label
            htmlFor={`file-${todo.id}`}
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-1 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 cursor-pointer"
          >
            Choose File
          </label>
          {fileInput && (
            <>
              <span className="text-sm text-gray-500">{fileInput.name}</span>
              <button
                onClick={onFileUpload}
                className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-3 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Upload
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
