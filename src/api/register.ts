import { api } from "@/lib/axios";
import { User } from "@/types/shared/user";

type RegisterSchema = Omit<User, "id">;

export async function register({ name, email, password }: RegisterSchema) {
  await api.post<RegisterSchema>("/auth/register", { name, email, password });
}
