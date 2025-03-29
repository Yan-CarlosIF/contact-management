import { api } from "@/lib/axios";

interface UpdateContactSchema {
  contactId: number;
  name: string;
  email: string;
  phone: string;
}

export const updateContact = async ({
  contactId,
  name,
  email,
  phone,
}: UpdateContactSchema) => {
  await api.put<UpdateContactSchema>(`/updateContact`, {
    contactId,
    name,
    email,
    phone,
  });
};
