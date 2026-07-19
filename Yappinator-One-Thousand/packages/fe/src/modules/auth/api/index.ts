import { api } from "@/lib/axios";
import type { AuthResponse } from "@yapp/shared";

export async function register(email: string, password: string) {
  return await api.post<AuthResponse>("/api/auth/register", { email, password });
}

export async function login(email: string, password: string) {
  return await api.post<AuthResponse>("/api/auth/login", { email, password });
}
