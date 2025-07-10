import { api } from "@/lib/axios";
import { Contact } from "@/types/shared/contact";

type UpdateContactSchema = Omit<
  Contact,
  "userId" | "description" | "avatarUrl"
>;

export const updateContact = async ({
  id,
  name,
  email,
  phone,
}: UpdateContactSchema) => {
  await api.patch<UpdateContactSchema>(`/contacts`, {
    id,
    name,
    email,
    phone,
  });
};
