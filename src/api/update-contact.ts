import { api } from "@/lib/axios";

interface UpdateContactSchema {
  contactId: number;
  name: string;
  email: string;
  phone: string;
  avatar_url: string | null | undefined;
}

export const updateContact = async ({
  contactId,
  name,
  email,
  phone,
  avatar_url,
}: UpdateContactSchema) => {
  await api.put<UpdateContactSchema>(`/updateContact`, {
    contactId,
    name,
    email,
    phone,
    avatar_url,
  });
};
