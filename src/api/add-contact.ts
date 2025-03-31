import { api } from "@/lib/axios";

import { Contact } from "./get-contacts";

interface AddContactSchema {
  name: string;
  description: string | null;
  phone: string;
  email: string;
  avatar_url: string | null;
}

export const addContact = async ({
  name,
  description,
  phone,
  email,
  avatar_url,
}: AddContactSchema) => {
  await api.post<Contact>("/add-contact", {
    avatar_url,
    description,
    name,
    phone,
    email,
  });
};
