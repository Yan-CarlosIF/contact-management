import { api } from "@/lib/axios";
import { User } from "@/types/shared/user";

export const getUser = async () =>
  (await api.get<Pick<User, "email" | "id" | "name">>("/user")).data;
