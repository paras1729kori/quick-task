import type { TodoFilters, TodoType } from "../appTypes";

const API_URL = import.meta.env.VITE_API_URL;

export async function getTodos(jwtToken: string, filters?: TodoFilters) {
  const res = await fetch(
    API_URL +
      `/todos?search=${filters?.search || ""}&status=${
        filters?.status || ""
      }&priority=${filters?.priority || ""}`,
    {
      method: "GET",
      headers: {
        Authorization: "Bearer " + jwtToken,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  return data;
}

export async function addTodo(todo: any, jwtToken: string) {
  const res = await fetch(API_URL + "/todos", {
    method: "POST",
    body: JSON.stringify({
      ...todo,
    }),
    headers: {
      Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function updateTodo(todo: TodoType, jwtToken: string) {
  const res = await fetch(API_URL + `/todos/${todo?.id}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}

export async function deleteTodo(todoId: number, jwtToken: string) {
  const res = await fetch(API_URL + `/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + jwtToken,
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return data;
}
