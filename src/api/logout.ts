import { api } from "@/lib/axios";

interface LogoutResponse {
  message: string;
}

export async function logout() {
  return (await api.post<LogoutResponse>("/auth/logout")).data;
}
