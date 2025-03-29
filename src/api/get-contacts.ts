import { api } from "@/lib/axios";

export interface Contact {
  id: number;
  name: string;
  description: string | null;
  phone: string;
  email: string;
  isLocked: boolean;
  avatar_url: string | null;
}

export async function getContacts() {
  return (await api.get<Contact[]>("/contacts")).data;
}
