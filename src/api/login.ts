import { api } from "@/lib/axios";

interface LoginSchema {
  email: string;
  password: string;
}

export async function login({ email, password }: LoginSchema) {
  await api.post<LoginSchema>("/login", { email, password });
}
