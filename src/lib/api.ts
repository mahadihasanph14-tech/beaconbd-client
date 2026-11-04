import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string
): Promise<T> {
  const headers = new Headers(options.headers);
  headers.set("Content-Type", "application/json");

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers,
    cache: "no-store"
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function apiFetchAuth<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const { data, error } = await authClient.token();

  if (error || !data?.token) {
    throw new Error(error?.message || "Please log in first.");
  }

  return apiFetch<T>(path, options, data.token);
}

export { API_URL };