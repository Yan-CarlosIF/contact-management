import { api } from "@/lib/axios";

interface AddUserSchema {
  name: string;
  email: string;
  password: string;
}

export async function addUser({ name, email, password }: AddUserSchema) {
  await api.post<AddUserSchema>("/addUser", { name, email, password });
}
