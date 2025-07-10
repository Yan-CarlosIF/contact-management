import { api } from "@/lib/axios";
import { Contact } from "@/types/shared/contact";

export async function getContacts() {
  return (await api.get<Contact[]>("/contacts")).data;
}
