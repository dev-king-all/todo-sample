import axios from "axios";
import { Todo } from "../types/todo";
import { API_BASE_URL, API_URL } from "@/utils/constants";

export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createTodo = async (todo: {
  title: string;
  description?: string;
}): Promise<Todo> => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (
  id: number,
  todo: Partial<Todo>
): Promise<Todo> => {
  const response = await axios.put(`${API_URL}/${id}`, todo);
  return response.data;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};

export const uploadFile = async (id: number, file: File): Promise<Todo> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post(`${API_URL}/${id}/upload`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getFileUrl = (filePath: string): string => {
  return `${API_BASE_URL}storage/${filePath.replace("public/", "")}`;
};
