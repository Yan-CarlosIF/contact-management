import { api } from "@/lib/axios";
import { Contact } from "@/types/shared/contact";

type UpdateContactSchema = Omit<Contact, "userId" | "description">;

export const updateContact = async ({
  id,
  name,
  email,
  phone,
  avatarUrl,
}: UpdateContactSchema) => {
  await api.patch<UpdateContactSchema>(`/contact/update`, {
    id,
    name,
    email,
    phone,
    avatarUrl,
  });
};
