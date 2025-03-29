import { api } from "@/lib/axios";

interface User {
  email: string;
}

export const getUser = async () => (await api.get<User>("/getUser")).data;
