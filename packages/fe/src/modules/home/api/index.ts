import { api } from "@/lib/axios";
import type { DashboardData } from "@yapp/shared";

export async function sendFile(data: unknown) {
  return await api.post<{ ID: string }>("/api/sendFile", data);
}

export async function getConvById(convId: string): Promise<{ data: DashboardData }> {
  return await api.get<DashboardData>(`/api/${convId}`);
}
