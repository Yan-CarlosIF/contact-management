import { api } from "@/lib/axios";
import { User } from "@/types/shared/user";

type LoginSchema = Omit<User, "id" | "name">;

export async function login({ email, password }: LoginSchema) {
  await api.post<LoginSchema>("/auth/login", { email, password });
  localStorage.setItem("email", email);
}
