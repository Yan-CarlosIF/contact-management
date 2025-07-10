import { api } from "@/lib/axios";
import { Contact } from "@/types/shared/contact";

type AddContactSchema = Omit<Contact, "id" | "userId">;

export const addContact = async ({
  name,
  description,
  phone,
  email,
  avatarUrl,
}: AddContactSchema) => {
  await api.post<Contact>("/contacts", {
    avatarUrl,
    description,
    name,
    phone,
    email,
  });
};
