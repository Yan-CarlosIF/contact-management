import { api } from "@/lib/axios";

interface LogoutResponse {
  message: string;
}

export async function logout() {
  return (await api.get<LogoutResponse>("/logout")).data;
}
