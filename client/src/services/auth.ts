import { toast } from "sonner";
import type { UserType } from "../appTypes";
import _ from "lodash";

const API_URL = import.meta.env.VITE_API_URL;

export async function register(name: string, email: string, password: string) {
  await fetch(API_URL + "/users/register", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await login(email, password);
  return user;
}

export async function login(email: string, password: string) {
  const res = await fetch(API_URL + "/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const jwtData = await res.json();
  const userData = await getUserData(email, jwtData?.access_token);

  const user: UserType = {
    ...userData,
    jwtToken: jwtData?.access_token,
  };

  return user;
}

export async function forgotPassword(email: string) {
  const res = await fetch(API_URL + "/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({
      email: email,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  // save token in sessionStorage
  if (!_.isEmpty(data) && data?.token) {
    sessionStorage.setItem("token", data?.token);
  }
  return data;
}

export async function resetPassword(token: string, newPassword: string) {
  const res = await fetch(API_URL + "/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({
      token: token,
      newPassword: newPassword,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await res.json();
  return data;
}

export async function getUserData(email: string, jwtToken: string) {
  const res = await fetch(API_URL + `/users/detail?email=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + jwtToken,
    },
  });
  const data = await res.json();
  return data;
}

export function logout() {
  toast.success("Until we meet again 👋");
  localStorage.removeItem("quickTask");
  setTimeout(() => {
    window.location.reload();
  }, 1000);
}
