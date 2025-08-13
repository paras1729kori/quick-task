export type UserType = {
  id: number;
  email: string;
  password?: string;
  jwtToken: string;
  name?: string;
  todos?: [];
  createdAt?: string;
};

export type TodoType = {
  id: number;
  userId: string;
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  isDeleted?: boolean;
  createdAt?: string;
};

export type TodoFilters = {
  status: string;
  priority: string;
  search: string;
};

export type AuthType =
  | "sign-in"
  | "sign-up"
  | "forgot-password"
  | "reset-password";
